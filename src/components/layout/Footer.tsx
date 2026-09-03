const footerColumns = [
  {
    title: "Kapé",
    links: ["Sobre o projeto", "Metodologia", "Contato"],
  },
  {
    title: "Plataforma",
    links: ["Mapa", "Cadastro", "Login"],
  },
  {
    title: "Recursos",
    links: ["Glossário", "Documentação técnica"],
  },
  {
    title: "Redes",
    links: ["Twitter", "LinkedIn", "Instagram"],
  },
];

export default function Footer() {
  return (
    <footer className="relative w-full overflow-hidden bg-kape-brown">
      {/* Aerial forest photo placeholder */}
      <div className="absolute inset-0 bg-kape-green/25" />
      <div className="absolute inset-0 bg-gradient-to-b from-kape-brown/10 via-kape-brown/40 to-kape-brown" />

      <div className="relative mx-auto max-w-[1440px] px-6 pb-10 pt-10">
        <div className="rounded-xl bg-kape-cream/80 p-10 backdrop-blur-sm">
          <div className="flex items-start justify-between gap-10">
            <div className="flex items-center gap-2">
              <img src="/assets/kape-icon.svg" alt="" className="h-8 w-8" />
              <span className="text-2xl font-bold lowercase text-kape-brown">kapé</span>
            </div>

            <div className="flex flex-wrap gap-x-14 gap-y-8">
              {footerColumns.map((column) => (
                <div key={column.title} className="flex w-[150px] flex-col gap-3">
                  <p className="text-sm font-semibold text-kape-brown">{column.title}</p>
                  {column.links.map((link) => (
                    <p key={link} className="text-sm text-kape-brown">
                      {link}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-kape-brown/30 pt-10 text-sm text-kape-brown">
            <p>© Instituto Kapé. Todos os direitos reservados.</p>
            <div className="flex items-center gap-10">
              <p>Termos e Condições</p>
              <p>Política de Privacidade</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
