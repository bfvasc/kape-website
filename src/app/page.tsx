import { basePath } from "@/lib/basePath";

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

const services = [
  { name: "Água", active: true },
  { name: "Carbono", active: false },
  { name: "Biodiversidade", active: false },
  { name: "Uso da terra", active: false },
];

export default function Home() {
  return (
    <main className="flex w-full flex-col items-center">
      {/* Hero */}
      <section className="mt-[80px] flex w-full max-w-[922px] flex-col items-center gap-[40px] px-6 text-center">
        <h1 className="text-[80px] font-medium leading-none tracking-[-1.6px] text-kape-brown">
          Dados ambientais
          <br />
          para quem pesquisa, decide e age
        </h1>
        <div className="flex h-[48px] items-center gap-[8px] rounded-full bg-kape-brown px-[16px] text-white">
          <img src={`${basePath}/assets/search-line.svg`} alt="" className="h-6 w-6" />
          <span className="text-[16px]">Buscar</span>
        </div>
      </section>

      {/* Hero video placeholder */}
      <section className="mt-[80px] w-full max-w-[1156px] px-6">
        <div className="relative flex h-[720px] w-full items-center justify-center rounded-2xl bg-kape-green">
          <img src={`${basePath}/assets/play-large-fill.svg`} alt="" className="h-[160px] w-[160px]" />
        </div>
      </section>

      {/* Sobre a Kapé */}
      <section className="mt-[160px] flex w-full max-w-[1156px] flex-col gap-[60px] px-6 lg:flex-row lg:justify-between">
        <div className="flex w-full max-w-[470px] flex-col gap-[80px]">
          <h2 className="text-[64px] font-medium leading-none tracking-[-1.28px] text-kape-brown">
            Kapé significa &quot;semente&quot;
            <br />
            em Tukano-Bará
          </h2>
          <div className="flex h-[48px] w-fit items-center gap-[8px] rounded-full border border-kape-text/20 px-[16px]">
            <span className="text-[16px] text-kape-brown">Conheça o projeto</span>
            <img src={`${basePath}/assets/arrow-right-up-line.svg`} alt="" className="h-6 w-6" />
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
      <section className="mt-[160px] w-full bg-kape-sand py-[120px]">
        <div className="mx-auto flex w-full max-w-[1156px] flex-col gap-[60px] px-6 lg:flex-row lg:justify-between">
          <div className="flex w-full max-w-[571px] flex-col gap-[40px]">
            {services.map((service) => (
              <div
                key={service.name}
                className={`flex h-[86px] items-center px-[40px] ${
                  service.active ? "border-l-2 border-kape-brown" : ""
                }`}
              >
                <span
                  className={`text-[72px] font-medium leading-[1.2] ${
                    service.active ? "text-kape-brown" : "text-kape-text"
                  }`}
                >
                  {service.name}
                </span>
              </div>
            ))}
          </div>
          <div className="flex w-full max-w-[451px] flex-col gap-[80px]">
            <div className="h-[338px] w-full rounded-2xl bg-kape-cream" />
            <p className="text-[16px] leading-[1.4] text-kape-text">
              Recursos hídricos, bacias, qualidade e disponibilidade de água por
              região. Lorem ipsum dolor sit amet consectetur. Odio adipiscing sed
              sed aliquet dui diam egestas vitae. Sit vel fermentum sed in non
              justo integer. Feugiat amet nunc faucibus purus egestas.
            </p>
            <div className="flex h-[48px] w-fit items-center gap-[8px] rounded-full bg-kape-green px-[16px]">
              <span className="text-[16px] text-kape-brown">Explore os dados</span>
              <img src={`${basePath}/assets/arrow-right-up-line.svg`} alt="" className="h-6 w-6" />
            </div>
          </div>
        </div>
      </section>

      {/* Quem usa Kapé */}
      <section className="mt-[160px] flex w-full max-w-[1156px] flex-col gap-[24px] px-6">
        <h2 className="text-[64px] font-medium leading-none tracking-[-1.28px] text-kape-brown">
          Quem usa
          <br />
          Kapé?
        </h2>
        <p className="max-w-[332px] text-[16px] leading-[1.4] text-kape-text">
          Lorem ipsum dolor sit amet consectetur. Integer vel ipsum vitae pretium
          mattis ullamcorper.
        </p>
      </section>

      <section className="mt-[80px] grid w-full max-w-[1156px] grid-cols-1 gap-[20px] px-6 sm:grid-cols-2 lg:grid-cols-4">
        {audienceCards.map((card) => (
          <div
            key={card.title}
            className="flex h-[480px] flex-col justify-between rounded-2xl border border-kape-text/20 p-[40px]"
          >
            <div className="h-[64px] w-[64px] rounded-2xl bg-kape-green" />
            <div className="flex flex-col gap-[16px]">
              <p className="text-[20px] font-medium leading-[1.2] text-kape-brown">
                {card.title}
              </p>
              <p className="text-[16px] leading-[1.4] text-kape-text">
                {card.description}
              </p>
            </div>
          </div>
        ))}
      </section>

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
