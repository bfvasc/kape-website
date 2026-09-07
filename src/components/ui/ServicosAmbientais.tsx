"use client";

import { useState } from "react";
import { basePath } from "@/lib/basePath";

const services = [
  {
    name: "Água",
    color: "#c5dce0",
    description:
      "Recursos hídricos, bacias, qualidade e disponibilidade de água por região. Lorem ipsum dolor sit amet consectetur. Odio adipiscing sed sed aliquet dui diam egestas vitae. Sit vel fermentum sed in non justo integer. Feugiat amet nunc faucibus purus egestas.",
  },
  {
    name: "Carbono",
    color: "#c8d9b0",
    description:
      "Estoques, emissões e sequestro de carbono em diferentes coberturas do solo. Lorem ipsum dolor sit amet consectetur. Odio adipiscing sed sed aliquet dui diam egestas vitae. Sit vel fermentum sed in non justo integer. Feugiat amet nunc faucibus purus egestas.",
  },
  {
    name: "Biodiversidade",
    color: "#d4c5b0",
    description:
      "Espécies, estado de conservação e indicadores de diversidade biológica por território. Lorem ipsum dolor sit amet consectetur. Odio adipiscing sed sed aliquet dui diam egestas vitae. Sit vel fermentum sed in non justo integer. Feugiat amet nunc faucibus purus egestas.",
  },
  {
    name: "Clima do Futuro",
    color: "#c0bdd4",
    description:
      "Cobertura vegetal, áreas protegidas, pastagem, agricultura e transições ao longo do tempo. Lorem ipsum dolor sit amet consectetur. Odio adipiscing sed sed aliquet dui diam egestas vitae. Sit vel fermentum sed in non justo integer. Feugiat amet nunc faucibus purus egestas.",
  },
];

export default function ServicosAmbientais() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = services[activeIndex];

  return (
    <section className="mt-[160px] w-full bg-kape-sand py-[120px]">
      <div className="mx-auto flex w-full max-w-[1156px] flex-col gap-[60px] px-6 lg:flex-row lg:justify-between">
        <div className="flex w-full max-w-[571px] flex-col gap-[40px]">
          {services.map((service, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                key={service.name}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`flex h-[86px] cursor-pointer items-center border-l-2 px-[40px] text-left ${
                  isActive ? "border-[#1c1b17]" : "border-transparent"
                }`}
              >
                <span
                  className={`font-serif text-[56px] font-medium leading-[1.2] transition-colors duration-150 ${
                    isActive ? "text-[#1c1b17]" : "text-[#8a8675] hover:text-[#1c1b17]"
                  }`}
                >
                  {service.name}
                </span>
              </button>
            );
          })}
        </div>
        <div className="flex w-full max-w-[451px] flex-col gap-[80px]">
          <div
            className="h-[338px] w-full rounded-2xl transition-colors duration-300"
            style={{ backgroundColor: active.color }}
          />
          <p className="text-[16px] leading-[1.4] text-kape-text">{active.description}</p>
          <div className="flex h-[48px] w-fit items-center gap-[8px] rounded-full bg-kape-green px-[16px]">
            <span className="text-[16px] text-kape-brown">Explore os dados</span>
            <img src={`${basePath}/assets/icons/arrow-right-up-line.svg`} alt="" className="h-6 w-6" />
          </div>
        </div>
      </div>
    </section>
  );
}
