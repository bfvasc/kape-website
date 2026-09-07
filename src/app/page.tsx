import { basePath } from "@/lib/basePath";
import SearchDock from "@/components/ui/SearchDock";
import AudienceCarousel from "@/components/ui/AudienceCarousel";
import ServicosAmbientais from "@/components/ui/ServicosAmbientais";

const audienceCards = [
  {
    title: "Cientistas",
    description:
      "Acesse dados brutos confiáveis e séries históricas para apoiar hipóteses e aproximar-se do campo.",
  },
  {
    title: "Gestores Públicos",
    description:
      "Encontre dados locais já processados para embasar políticas públicas e tomadas de decisão ambiental.",
  },
  {
    title: "Jornalistas",
    description:
      "Consulte dados interpretados e contextualizados para construir reportagens com profundidade e precisão.",
  },
  {
    title: "Educadores",
    description:
      "Utilize informações didáticas e visuais, prontas para levar pra sala de aula ou compartilhar via WhatsApp.",
  },
];

export default function Home() {
  return (
    <main className="flex w-full flex-col items-center">
      {/* Hero */}
      <section className="mt-[80px] mb-[84px] flex w-full max-w-[922px] flex-col items-center gap-[40px] px-6 text-center">
        <p className="text-[16px] font-normal text-kape-brown">
          Confiado por mais de 2k+ profissionais
        </p>
        <h1 className="font-serif text-[80px] font-medium leading-none tracking-[-1.6px] text-kape-brown">
          Dados ambientais
          <br />
          para quem pesquisa, decide e age
        </h1>
        <SearchDock />
      </section>

      {/* Hero video placeholder */}
      <section className="w-full max-w-[1156px] px-6">
        <div className="relative flex h-[720px] w-full items-center justify-center rounded-2xl bg-kape-green">
          <div className="flex h-[160px] w-[160px] items-center justify-center rounded-full bg-white">
            <img src={`${basePath}/assets/icons/Vector.svg`} alt="" className="h-[37px] w-[31px]" />
          </div>
        </div>
      </section>

      {/* Sobre a Kapé */}
      <section className="mt-[160px] flex w-full max-w-[1156px] flex-col gap-[60px] px-6 lg:flex-row lg:justify-between">
        <div className="flex w-full max-w-[470px] flex-col gap-[80px]">
          <h2 className="font-serif text-[56px] font-medium leading-none tracking-[-1.28px] text-kape-brown">
            Kapé significa &quot;semente&quot;
            <br />
            em Tukano-Bará
          </h2>
          <div className="flex h-[48px] w-fit items-center gap-[8px] rounded-full border border-kape-text/20 px-[16px]">
            <span className="text-[16px] text-kape-brown">Conheça o projeto</span>
            <img src={`${basePath}/assets/icons/arrow-right-up-line.svg`} alt="" className="h-6 w-6" />
          </div>
        </div>
        <p className="w-full max-w-[568px] text-[16px] leading-[1.4] text-kape-text">
          A plataforma nasce da necessidade de tornar dados ambientais complexos
          acessíveis a quem precisa deles no dia a dia: pesquisadores, gestores
          públicos, jornalistas e educadores. Mais do que disponibilizar números, a
          Kapé interpreta, contextualiza e organiza informações sobre os biomas
          brasileiros para que possam gerar conhecimento, decisões e ação.
        </p>
      </section>

      {/* Bento grid */}
      <section className="mt-[160px] w-full max-w-[1159px] px-6">
        <div className="relative mx-auto h-[616px] w-full max-w-[1159px]">
          <div className="absolute left-0 top-0 flex h-[380px] w-[453px] items-center justify-center rounded-2xl bg-kape-sand p-10">
            <div className="h-[280px] w-[280px] rounded-2xl bg-kape-green/30" />
          </div>
          <div className="absolute left-[473px] top-0 h-[216px] w-[333px] rounded-2xl bg-kape-cream" />
          <div className="absolute left-[826px] top-0 h-[216px] w-[333px] rounded-2xl bg-kape-green" />
          <div className="absolute left-[473px] top-[236px] h-[144px] w-[216px] rounded-2xl bg-kape-brown" />
          <div className="absolute left-[706px] top-[236px] flex h-[380px] w-[453px] items-center justify-center rounded-2xl bg-kape-sand p-10">
            <div className="h-[280px] w-[280px] rounded-2xl bg-kape-green/30" />
          </div>
          <div className="absolute left-[356px] top-[400px] h-[216px] w-[333px] rounded-2xl bg-kape-green" />
          <div className="absolute left-[3px] top-[400px] h-[216px] w-[333px] rounded-2xl bg-kape-cream" />
        </div>
      </section>

      {/* Serviços ambientais */}
      <ServicosAmbientais />

      {/* Quem usa Kapé */}
      <section className="mt-[160px] flex w-full max-w-[1156px] px-6">
        <h2 className="font-serif text-[56px] font-medium leading-[1.2] tracking-[-1.28px] text-kape-brown">
          Quem usa
          <br />
          Kapé?
        </h2>
      </section>

      <div className="mt-[80px] w-full">
        <AudienceCarousel cards={audienceCards} />
      </div>

      {/* Endorsements */}
      <section className="mt-[160px] w-full max-w-[1156px] px-6 text-center">
        <p className="mx-auto text-[20px] leading-[1.4] text-kape-text/60">
          A Kapé é desenvolvida com o apoio de instituições comprometidas com
          ciência aberta e conservação ambiental.
        </p>
      </section>

      <section className="mb-[160px] mt-[60px] flex w-full max-w-[1156px] flex-wrap justify-center gap-[40px] px-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-[114px] min-w-[220px] flex-1 rounded-2xl bg-kape-sand" />
        ))}
      </section>
    </main>
  );
}
