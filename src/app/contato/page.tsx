import { ContactForm } from "@/components/ContactForm";
import { Icon, SocialIcon, type IconName } from "@/components/Icon";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { site } from "@/data/content";

export const metadata = { title: "Contato" };

const channels: Array<{ icon: IconName; label: string; value: string; href?: string }> = [
  { icon: "phone", label: "Telefone", value: site.phone, href: "tel:+554832243868" },
  { icon: "mail", label: "E-mail", value: site.email, href: `mailto:${site.email}` },
  { icon: "pin", label: "Endereço", value: `${site.address}, CEP ${site.cep}, ${site.city}` },
  { icon: "clock", label: "Horário", value: `Seg. a sex., ${site.hours}` },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Fale conosco"
        title="Contato"
        description="Dúvidas, denúncias, filiação ou plantão jurídico: escreva para a secretaria do sindicato."
        crumbs={[{ label: "Contato" }]}
      />

      <div className="container-site -mt-6 grid gap-8 md:-mt-10 lg:grid-cols-[minmax(0,1fr)_380px]">
        <Reveal className="relative z-10">
          <ContactForm />
        </Reveal>

        <aside className="grid gap-4 lg:h-fit">
          {channels.map((channel, index) => {
            const content = (
              <>
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-brand-sand text-brand-blue transition duration-300 group-hover:bg-brand-blue group-hover:text-white">
                  <Icon name={channel.icon} />
                </span>
                <span className="min-w-0">
                  <span className="block text-xs font-bold uppercase tracking-wider text-slate-400">
                    {channel.label}
                  </span>
                  <span className="block break-words font-semibold text-brand-navy">{channel.value}</span>
                </span>
              </>
            );
            return (
              <Reveal key={channel.label} variant="right" delay={index * 80}>
                {channel.href ? (
                  <a href={channel.href} className="card card-hover group flex items-center gap-4 p-5">
                    {content}
                  </a>
                ) : (
                  <div className="card group flex items-center gap-4 p-5">{content}</div>
                )}
              </Reveal>
            );
          })}

          <Reveal variant="right" delay={360}>
            <div className="overflow-hidden rounded-2xl shadow-card ring-1 ring-brand-navy/5">
              <iframe
                title="Mapa da sede do SINTAEMA"
                src={`https://www.google.com/maps?q=${encodeURIComponent(`${site.address}, ${site.city}`)}&output=embed`}
                className="h-56 w-full border-0 grayscale transition duration-500 hover:grayscale-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>

          <Reveal variant="right" delay={440}>
            <div className="flex items-center justify-between gap-3 rounded-2xl bg-brand-navy p-5 text-white">
              <span className="font-display text-lg uppercase">Siga o sindicato</span>
              <span className="flex gap-2">
                {(["facebook", "instagram", "youtube"] as const).map((network) => (
                  <a
                    key={network}
                    href={site.social[network]}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={network}
                    className="grid h-10 w-10 place-items-center rounded-full bg-white/10 transition hover:-translate-y-1 hover:bg-brand-green"
                  >
                    <SocialIcon network={network} />
                  </a>
                ))}
              </span>
            </div>
          </Reveal>
        </aside>
      </div>
    </>
  );
}
