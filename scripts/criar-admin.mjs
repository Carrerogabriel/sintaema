/**
 * Gera as variáveis da conta de administrador.
 *
 *   npm run criar-admin
 *
 * Pergunta nome, e-mail e senha, grava em .env.local (para rodar no computador)
 * e mostra as três linhas para colar na Vercel (Settings > Environment Variables).
 * A senha nunca é gravada: só o hash scrypt, no mesmo formato do sistema.
 */
import crypto from "node:crypto";
import fs from "node:fs";
import readline from "node:readline";

const rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: true });
let muted = false;
const write = rl._writeToOutput.bind(rl);
rl._writeToOutput = (text) => (muted && !text.includes("\n") ? write("*") : write(text));

const ask = (question, hidden = false) =>
  new Promise((resolve) => {
    rl.question(question, (answer) => {
      muted = false;
      resolve(answer.trim());
    });
    muted = hidden;
  });

const name = (await ask("Nome do administrador: ")) || "Administrador";
const email = await ask("E-mail: ");
const password = await ask("Senha: ", true);
const confirm = await ask("\nConfirme a senha: ", true);
rl.close();
console.log();

if (!/^\S+@\S+\.\S+$/.test(email)) throw new Error("E-mail inválido.");
if (password.length < 8 || !/[a-zA-Z]/.test(password) || !/\d/.test(password))
  throw new Error("A senha precisa ter pelo menos 8 caracteres, com letras e números.");
if (password !== confirm) throw new Error("As senhas não conferem.");

const salt = crypto.randomBytes(16);
const hash = crypto.scryptSync(password, salt, 64, { N: 16384, r: 8, p: 1 });
const vars = {
  SINTAEMA_ADMIN_NAME: name,
  SINTAEMA_ADMIN_EMAIL: email,
  SINTAEMA_ADMIN_PASSWORD_HASH: `scrypt$${salt.toString("hex")}$${hash.toString("hex")}`,
};

const envFile = ".env.local";
const kept = fs.existsSync(envFile)
  ? fs.readFileSync(envFile, "utf8").split(/\r?\n/).filter((l) => l && !l.startsWith("SINTAEMA_ADMIN_"))
  : [];
const lines = Object.entries(vars).map(([k, v]) => `${k}=${v}`);
fs.writeFileSync(envFile, [...kept, ...lines].join("\n") + "\n");

console.log(`Gravado em ${envFile}. Na Vercel, crie estas três variáveis (Production):\n`);
console.log(lines.join("\n"));
console.log("\nDepois faça um novo deploy (Deployments > Redeploy) para valer.");
