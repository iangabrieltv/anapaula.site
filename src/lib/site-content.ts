import logo from "@/assets/paula-logo-premium.png";
import about from "@/assets/about.png.asset.json";
import signature from "@/assets/signature.png.asset.json";
import booking from "@/assets/booking.png.asset.json";
import map from "@/assets/map.png.asset.json";
import avatar1 from "@/assets/avatar-1.png.asset.json";
import avatar2 from "@/assets/avatar-2.png.asset.json";
import avatar3 from "@/assets/avatar-3.png.asset.json";
import hero from "@/assets/hero-paula.png";
import aboutBanner from "@/assets/about-banner.png";

// Imagens de alta definição geradas para os serviços
import serviceBronze from "@/assets/images/service_bronzeamento_1792698900381.jpg";
import serviceMassagem from "@/assets/images/service_massagem_1792698901720.jpg";
import serviceFacial from "@/assets/images/service_facial_1792698902062.jpg";
import serviceOlhar from "@/assets/images/service_olhar_1792698902347.jpg";
import servicePes from "@/assets/images/service_pes_1792698903090.jpg";
import serviceRedux from "@/assets/images/service_redux_1792893467247.jpg";
import serviceRelax from "@/assets/images/service_relax_1792893468342.jpg";
import serviceTermal from "@/assets/images/service_termal_1792893468223.jpg";

// Imagens dos 4 quadrados do ambiente / espaço
import spaceRecepcao from "@/assets/images/space_recepcao_1792698904664.jpg";
import spaceAtendimento from "@/assets/images/space_atendimento_1792698904308.jpg";
import spaceSolarium from "@/assets/images/space_solarium_1792698904889.jpg";
import spaceLounge from "@/assets/images/space_lounge_1792698905411.jpg";

import "@/structural-overrides.css";

// Conteúdo separado da apresentação: textos, fotos e contatos podem ser editados aqui.
export const site = {
  name: "Paula Medeiros Estética",
  heroTitle: "A luz que se veste na pele.",
  heroDescription:
    "Bronzeamento natural, cuidados estéticos e bem-estar para realçar o que já existe de mais bonito em você.",
  instagram: "https://www.instagram.com/paulabronze.estetica/",
  phoneLabel: "(82) 9984-2118",
  phoneRaw: "5582999842118",
  whatsappNumber: "5582999842118",
  address:
    "Rua Arlindo Ferreira de Aguiar, 182, Senador Arnon de Melo, Arapiraca - AL, CEP 57315-120",
  addressShort: "Rua Arlindo Ferreira de Aguiar, 182 · Arapiraca - AL",
  days: "Segunda a Sábado",
  hours: "08h às 19h",
  about: [
    "Sou Paula Medeiros, especialista em bronzeamento e estética, e acredito que a beleza vai muito além da aparência. É sobre autoestima, bem-estar e se sentir bem na própria pele.",
    "Aqui, você encontra um espaço seguro, acolhedor e pensado especialmente para você.",
  ],
  images: {
    logo,
    hero,
    about: about.url,
    aboutBanner,
    signature: signature.url,
    booking: booking.url,
    map: map.url,
  },
};

export const navigation = [
  { label: "Início", id: "inicio" },
  { label: "Serviços", id: "servicos" },
  { label: "Sobre a Paula", id: "sobre" },
  { label: "Espaço", id: "espaco" },
  { label: "Depoimentos", id: "depoimentos" },
  { label: "Contato", id: "contato" },
];

export const services = [
  {
    id: "bronze-paula-medeiros",
    title: "Bronze Paula Medeiros",
    subtitle: "Bronzeamento natural exclusivo",
    description: "Bronzeamento natural com segurança e sofisticação.",
    iconType: "sun" as const,
    image: serviceBronze,
    items: [
      "Bronze Sol Clássico",
      "Bronze Premium Ouro",
      "Bronze Redux Ativado",
      "Bronze Orgânico Virgínia",
      "Montagem Artesanal de Biquíni de Fita",
      "Hidratação Iluminadora Pós-Sol",
    ],
  },
  {
    id: "experiencia-leveza",
    title: "Experiência Leveza",
    subtitle: "Drenagem & desintoxicação",
    description: "Massagens e detox para mais leveza no seu dia.",
    iconType: "leaf" as const,
    image: serviceMassagem,
    items: [
      "Drenagem Linfática Método Exclusivo",
      "Detox Corporal Completo",
      "Detox Abdominal Modelador",
      "Massagem Desintoxicante Suave",
    ],
  },
  {
    id: "experiencia-redux",
    title: "Experiência Redux",
    subtitle: "Contorno corporal e definição",
    description: "Tecnologia e técnicas para contornos mais definidos.",
    iconType: "silhouette" as const,
    image: serviceRedux,
    items: [
      "Massagem Redux Localizada",
      "Remodelagem Corporal com Bambuterapia",
      "Drenagem Linfática Redutora",
      "Ativação Metabólica Local",
    ],
  },
  {
    id: "experiencia-relax",
    title: "Experiência Relax",
    subtitle: "Paz, acolhimento & harmonia",
    description: "Relaxamento profundo para o seu bem-estar.",
    iconType: "flower" as const,
    image: serviceRelax,
    items: [
      "Massagem Relaxante com Óleos Essenciais",
      "Terapia Antiestresse de Pontos de Tensão",
      "Aromaterapia Harmonizante",
      "Alívio Muscular e Descompressão",
    ],
  },
  {
    id: "experiencia-termal",
    title: "Experiência Termal",
    subtitle: "Calor restaurador & conforto",
    description: "Calor e conforto para o seu corpo e sua mente.",
    iconType: "heat" as const,
    image: serviceTermal,
    items: [
      "Terapia com Pedras Vulcânicas Aquecidas",
      "Termoterapia Corporal Desintoxicante",
      "Envolvimento Térmico Revitalizante",
      "Alívio de Dores e Tensões Musculares",
    ],
  },
  {
    id: "spa-dos-pes",
    title: "Spa dos Pés",
    subtitle: "Renovação & leveza podal",
    description: "Cuidados especiais para pés e pele.",
    iconType: "feet" as const,
    image: servicePes,
    items: [
      "Plástica e Renovação dos Pés",
      "Escalda-Pés Aromático com Sais e Flores",
      "Massagem Podal Relaxante com Reflexologia",
      "Esfoliação e Hidratação Biológica Profunda",
    ],
  },
  {
    id: "pele-perfeita",
    title: "Pele Perfeita",
    subtitle: "Saúde, brilho & pureza facial",
    description: "Limpeza e renovação da sua pele.",
    iconType: "face" as const,
    image: serviceFacial,
    items: [
      "Limpeza de Pele Profunda e Extração Segura",
      "Peeling de Diamante Suave e Renovador",
      "Hidratação Biológica Regenerativa",
      "Revitalização Glow Facial com Vitamina C",
    ],
  },
  {
    id: "olhar",
    title: "Olhar",
    subtitle: "Expressão, simetria & destaque",
    description: "Realce o que há de mais único em você.",
    iconType: "eye" as const,
    image: serviceOlhar,
    items: [
      "Design de Sobrancelhas Personalizado Visagista",
      "Design com Aplicação de Henna Orgânica",
      "Lash Lifting e Nutrição Queratinizada",
      "Extensão de Cílios Fio a Fio Natural",
    ],
  },
];
export type Service = (typeof services)[number];

export const spaceImages = [
  {
    image: spaceRecepcao,
    title: "Recepção & Lounge",
    subtitle: "Acolhimento caloroso e design sofisticado",
    alt: "Recepção sofisticada do espaço Paula Medeiros com balcão curvo em travertino",
  },
  {
    image: spaceAtendimento,
    title: "Suíte de Atendimento",
    subtitle: "Privacidade absoluta e conforto ergonômico",
    alt: "Sala de tratamentos estéticos privativa com maca macia e iluminação suave",
  },
  {
    image: spaceSolarium,
    title: "Solário Privativo",
    subtitle: "Área exclusiva para bronzeamento natural",
    alt: "Solário ao ar livre com espreguiçadeiras e proteção personalizada para bronzeamento ao sol",
  },
  {
    image: spaceLounge,
    title: "Lounge de Descompressão",
    subtitle: "Pausa serena com chá e aromaterapia",
    alt: "Canto de relaxamento e acolhimento com poltrona bouclé e iluminação quente",
  },
];

// Depoimentos transcritos da referência enviada e clientes verificadas
export const testimonials = [
  {
    name: "Juliana Santos",
    role: "Cliente assídua",
    image: avatar1.url,
    text: "O bronzeamento da Paula é incomparável! Minha pele ficou linda, dourada e super hidratada. O atendimento e a privacidade me conquistaram logo na primeira sessão.",
    tag: "Bronzeamento Natural",
  },
  {
    name: "Camila Ribeiro",
    role: "Cliente VIP",
    image: avatar2.url,
    text: "Me sinto renovada e cheia de autoestima a cada visita. A massagem e os tratamentos faciais têm um padrão de cuidado que nunca vi em outro lugar de Arapiraca.",
    tag: "Massagens & Facial",
  },
  {
    name: "Mariana Lima",
    role: "Cliente de Arapiraca",
    image: avatar3.url,
    text: "É muito mais do que estética: é uma verdadeira experiência de carinho e bem-estar. Cada detalhe do espaço foi pensado com excelência pela Paula.",
    tag: "Experiências",
  },
  {
    name: "Fernanda Moura",
    role: "Noiva Paula Bronze",
    image: avatar1.url,
    text: "Fiz o protocolo pré-casamento com a Paula e foi a melhor escolha que fiz. Cheguei radiante no grande dia, com marquinha perfeita e pele iluminada!",
    tag: "Protocolo Especial",
  },
  {
    name: "Beatriz Cavalcante",
    role: "Advogada",
    image: avatar2.url,
    text: "O Spa dos Pés e a massagem relaxante são meu refúgio após semanas exaustivas. Ambiente silencioso, perfumado e extremamente acolhedor.",
    tag: "Spa & Relax",
  },
  {
    name: "Larissa Tenório",
    role: "Empresária",
    image: avatar3.url,
    text: "Profissionalismo impecável! O cuidado que a Paula tem com a saúde da nossa pele antes de qualquer procedimento demonstra seu imenso respeito pelo cliente.",
    tag: "Bronze Premium",
  },
];
