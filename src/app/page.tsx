import Image from "next/image";
import Link from "next/link";
import { CountUp } from "@/components/CountUp";
import { Icon, type IconName } from "@/components/Icon";
import { NewsCard } from "@/components/NewsCard";
import { Reveal } from "@/components/Reveal";
import { Sidebar } from "@/components/Sidebar";
import { Waves } from "@/components/Waves";
import { bulletins, posts, site } from "@/data/content";
import { categoryStyles, formatDate } from "@/lib/format";

const stats = [
  { value: 1977, label: "Ano de fundação", suffix: "" },
  { value: new Date().getFullYear() - 1977, label: "Anos de luta", suffix: "" },
  { value: 20, label: "Pontos no plano de lutas", suffix: "" },
  { value: 1, label: "Contribuição sobre o salário fixo", suffix: "%" },
];

const services: Array<{ icon: IconName; title: string; text: string; href: string }> = [
  {
    icon: "scale",
    title: "Assessoria jurídica",
    text: "Plantão com advogados para questões trabalhistas e previdenciárias.",
    href: "/juridico",
  },
  {
    icon: "users",
    title: "Filiação",
    text: "Organização, informação e defesa coletiva da categoria.",
    href: "/filie-se",
  },
  {
    icon: "megaphone",
    title: "Campanhas",
    text: "Mobilização em defesa da CASAN e do saneamento 100% público.",
    href: "/noticias?categoria=Lutas",
  },
  {
    icon: "calendar",
    title: "Agenda",
    text: "Assembleias, atos e atividades nas regionais de todo o estado.",
    href: "/agenda",
  },
];

export default function HomePage() {
  const featured = posts.find((post) => post.featured) ?? posts[0];
  const others = posts.filter((post) => post.slug !== featured.slug);
  const headlines = others.slice(0, 3);
  const latest = others.slice(0, 6);

  return (
    <>
      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-brand-navy-dark text-white">
        <div className="absolute inset-0 -z-10">
          <Image
            src={featured.image}
            alt=""
            fill
            priority
            className="animate-ken-burns object-cover opacity-50"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-navy-dark via-brand-navy-dark/85 to-brand-navy/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-navy-dark via-transparent to-transparent" />
        </div>

        <div className="container-site grid gap-10 pb-28 pt-12 sm:pt-16 md:pb-36 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:items-end lg:gap-12 lg:pt-24">
          <div>
            <p className="flex animate-fade-up flex-wrap items-center gap-3 text-xs font-bold uppercase tracking-[0.18em]">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-green opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-brand-green" />
              </span>
              <span className="text-brand-green">Destaque</span>
              <span className="text-sky-200/80">{formatDate(featured.date)}</span>
            </p>
            <h1 className="mt-5 animate-fade-up font-display text-[1.85rem] font-semibold uppercase leading-[1.1] tracking-tight [animation-delay:100ms] sm:text-[2.6rem] xl:text-[3.1rem]">
              {featured.title}
            </h1>
            <p className="mt-5 max-w-2xl animate-fade-up text-base leading-relaxed text-sky-100/90 [animation-delay:200ms] md:text-lg">
              {featured.excerpt}
            </p>
            <div className="mt-8 flex animate-fade-up flex-wrap gap-3 [animation-delay:300ms]">
              <Link href={`/noticias/${featured.slug}`} className="btn-primary">
                Ler matéria completa
                <Icon name="arrowRight" className="h-4 w-4" />
              </Link>
              <Link href="/noticias" className="btn-ghost">
                Todas as notícias
              </Link>
            </div>
          </div>

          <div className="hidden gap-3 md:grid">
            <p className="animate-fade-in text-xs font-bold uppercase tracking-[0.18em] text-sky-200/80 [animation-delay:300ms]">
              Também em destaque
            </p>
            {headlines.map((post, index) => (
              <Link
                key={post.slug}
                href={`/noticias/${post.slug}`}
                className="group flex animate-fade-up items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md transition duration-300 hover:border-white/25 hover:bg-white/10"
                style={{ animationDelay: `${380 + index * 90}ms` }}
              >
                <span className="font-display text-3xl font-semibold leading-none text-brand-green/80">
                  0{index + 1}
                </span>
                <span className="min-w-0">
                  <span
                    className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${categoryStyles[post.category]}`}
                  >
                    {post.category}
                  </span>
                  <span className="mt-1.5 line-clamp-2 block font-semibold leading-snug transition group-hover:text-brand-cyan">
                    {post.title}
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </div>
        <Waves />
      </section>

      {/* STATS */}
      <section className="container-site relative z-10 -mt-14 md:-mt-20">
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Reveal key={stat.label} delay={index * 90}>
              <div className="card card-hover h-full p-5 text-center sm:p-6">
                <p className="font-display text-4xl font-semibold text-brand-navy sm:text-5xl">
                  <CountUp value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-slate-500 sm:text-sm">
                  {stat.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* NEWS + SIDEBAR */}
      <section className="container-site mt-16 grid gap-10 md:mt-20 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div>
          <Reveal className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow text-brand-green">Comunicação</p>
              <h2 className="mt-2 font-display text-3xl font-semibold uppercase text-brand-navy md:text-4xl">
                Últimas notícias
              </h2>
            </div>
            <Link href="/noticias" className="link-arrow">
              Ver todas
              <Icon name="arrowRight" className="h-4 w-4" />
            </Link>
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-2">
            {latest.map((post, index) => (
              <Reveal key={post.slug} delay={(index % 2) * 100}>
                <NewsCard post={post} />
              </Reveal>
            ))}
          </div>
        </div>
        <Sidebar />
      </section>

      {/* SERVICES */}
      <section className="relative mt-20 overflow-hidden bg-white py-16 md:mt-28 md:py-24">
        <div className="container-site">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="eyebrow justify-center text-brand-green">Como atuamos</p>
            <h2 className="mt-2 font-display text-3xl font-semibold uppercase text-brand-navy md:text-4xl">
              O sindicato ao seu lado
            </h2>
            <p className="mt-3 text-slate-600">
              Do plantão jurídico às mobilizações, o SINTAEMA organiza a categoria em defesa dos
              direitos de quem faz o saneamento funcionar em Santa Catarina.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service, index) => (
              <Reveal key={service.title} delay={index * 90}>
                <Link
                  href={service.href}
                  className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-100 bg-brand-sand/60 p-6 transition duration-500 hover:-translate-y-1 hover:border-transparent hover:bg-brand-navy hover:shadow-card-hover"
                >
                  <span className="grid h-14 w-14 place-items-center rounded-2xl bg-white text-brand-blue shadow-card transition duration-500 group-hover:rotate-[-6deg] group-hover:scale-110 group-hover:bg-brand-green group-hover:text-white">
                    <Icon name={service.icon} className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 font-display text-xl font-semibold uppercase text-brand-navy transition group-hover:text-white">
                    {service.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600 transition group-hover:text-sky-100">
                    {service.text}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-brand-blue transition group-hover:text-brand-cyan">
                    Acessar
                    <Icon name="arrowRight" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* BULLETINS */}
      <section className="container-site mt-16 md:mt-24">
        <Reveal className="mb-8">
          <p className="eyebrow text-brand-green">Publicações</p>
          <h2 className="mt-2 font-display text-3xl font-semibold uppercase text-brand-navy md:text-4xl">
            Informativos
          </h2>
        </Reveal>
        <div className="grid gap-5 md:grid-cols-3">
          {bulletins.map((item, index) => (
            <Reveal key={item.name} delay={index * 100}>
              <article className="card card-hover group relative h-full overflow-hidden p-6">
                <div className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-brand-green to-brand-cyan transition-transform duration-500 group-hover:scale-x-100" />
                <div className="flex items-start justify-between gap-4">
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand-green-light text-brand-green-dark">
                    <Icon name="file" />
                  </span>
                  <span className="rounded-full bg-brand-sand px-3 py-1 text-xs font-semibold text-brand-blue">
                    {item.issue}
                  </span>
                </div>
                <h3 className="mt-5 font-display text-2xl font-semibold text-brand-navy">{item.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.summary}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* SLOGAN BANNER */}
      <section className="container-site mt-16 md:mt-24">
        <Reveal variant="scale">
          <div className="relative isolate overflow-hidden rounded-3xl bg-brand-navy px-6 py-14 text-center text-white sm:px-12 md:py-20">
            <Image
              src="/images/agua.jpg"
              alt=""
              fill
              className="-z-10 object-cover opacity-30"
              sizes="(min-width: 1280px) 1216px, 100vw"
            />
            <div className="absolute inset-0 -z-10 bg-gradient-to-t from-brand-navy-dark via-brand-navy/70 to-brand-blue/40" />
            <Icon name="drop" className="mx-auto h-10 w-10 animate-float text-brand-cyan" />
            <p className="mt-4 text-xs font-bold uppercase tracking-[0.25em] text-brand-green">
              Lema da entidade
            </p>
            <p className="mx-auto mt-3 max-w-3xl font-display text-3xl font-semibold uppercase leading-tight sm:text-4xl md:text-5xl">
              {site.slogan}
            </p>
            <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-sky-100 md:text-base">
              Desde 9 de novembro de 1977, o SINTAEMA organiza a categoria em defesa da água
              pública, da CASAN e dos direitos de quem faz o saneamento funcionar em Santa
              Catarina.
            </p>
            <Link href="/sobre" className="btn-ghost mt-8">
              Conheça nossa história
              <Icon name="arrowRight" className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
