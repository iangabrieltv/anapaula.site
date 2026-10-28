import { useState, useRef, useEffect, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock3,
  CheckCircle2,
  Copy,
  ExternalLink,
  Eye,
  Flame,
  Flower2,
  Footprints,
  Heart,
  Instagram,
  Leaf,
  MapPin,
  Maximize2,
  Menu,
  MessageCircle,
  Navigation,
  Phone,
  Sparkle,
  Sprout,
  Star,
  Sun,
  SunMedium,
  X,
} from "lucide-react";

function ServiceCardIcon({ type }: { type: string }) {
  const iconProps = { className: "w-4 h-4 text-[#C99A6B]", strokeWidth: 1.5 };
  switch (type) {
    case "sun":
      return <Sun {...iconProps} />;
    case "leaf":
      return <Leaf {...iconProps} />;
    case "silhouette":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-4 h-4 text-[#C99A6B]"
          aria-hidden="true"
        >
          <path d="M12 3a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
          <path d="M8.5 9c1.5 1.5 1.8 3 1.5 5.5-.3 2.5.5 4.5 1.5 6.5M15.5 9c-1.5 1.5-1.8 3-1.5 5.5.3 2.5-.5 4.5-1.5 6.5" />
          <path d="M9.5 13.5c1.5.5 3.5.5 5 0" />
        </svg>
      );
    case "flower":
      return <Flower2 {...iconProps} />;
    case "heat":
      return <Flame {...iconProps} />;
    case "feet":
      return <Footprints {...iconProps} />;
    case "face":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-4 h-4 text-[#C99A6B]"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="9" />
          <path d="M9 10h.01M15 10h.01" />
          <path d="M9.5 15a3.5 3.5 0 0 0 5 0" />
        </svg>
      );
    case "eye":
      return <Eye {...iconProps} />;
    default:
      return <Sparkle {...iconProps} />;
  }
}
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import {
  navigation,
  services,
  site,
  spaceImages,
  testimonials,
  type Service,
} from "@/lib/site-content";
import bookingBackground from "@/assets/booking-clean.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Paula Medeiros Estética | A luz que se veste na pele" },
      { name: "description", content: site.heroDescription },
      { property: "og:title", content: "Paula Medeiros Estética | Bronzeamento e bem-estar" },
      { property: "og:description", content: site.heroDescription },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [category, setCategory] = useState("");
  const [procedure, setProcedure] = useState("");
  const [notice, setNotice] = useState("");
  const [gallery, setGallery] = useState<number | null>(null);
  const [storyOpen, setStoryOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("inicio");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.pageYOffset || document.documentElement.scrollTop;
      setIsScrolled(scrollPos > 24);

      // Section order from bottom to top
      const sectionIds = ["contato", "depoimentos", "espaco", "sobre", "servicos", "inicio"];
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 160) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    // IntersectionObserver para animações elegantes ao rolar a página
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -30px 0px",
      },
    );

    const elements = document.querySelectorAll(
      ".reveal, .reveal-scale, .reveal-fade, .reveal-left, .reveal-right",
    );
    elements.forEach((el) => observer.observe(el));

    return () => {
      window.removeEventListener("scroll", handleScroll);
      elements.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 78;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: Math.max(0, offsetPosition),
        behavior: "smooth",
      });
    }
  };
  const openBooking = (service?: Service, item?: string) => {
    setSelectedService(null);
    setNotice("");
    setCategory(service?.title ?? "");
    setProcedure(item ?? "");
    setBookingOpen(true);
  };
  const submitBooking = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!site.whatsappNumber) {
      setNotice(
        "O número completo do WhatsApp precisa ser confirmado pela Paula para enviar seu agendamento.",
      );
      return;
    }
    const data = new FormData(event.currentTarget);
    const name = (data.get("name") as string)?.trim() || "";
    const rawDate = (data.get("date") as string)?.trim() || "";
    const time = (data.get("time") as string)?.trim() || "";
    const formattedDate =
      rawDate.includes("-") && rawDate.split("-")[0].length === 4
        ? rawDate.split("-").reverse().join("/")
        : rawDate;

    const procedureText = procedure ? `, ${procedure}` : "";
    const serviceText = category || "um procedimento";
    const message = `Olá, Ana Paula! tudo bem?\nMe chamo ${name}, gostaria de realizar ${serviceText}${procedureText}. teria disponibilidade as ${time} do dia ${formattedDate}?`;

    window.open(
      `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer",
    );
  };
  const bookingButton = (className = "") => (
    <Button className={`pill ${className}`} onClick={() => openBooking()}>
      <MessageCircle />
      Agendar pelo WhatsApp
    </Button>
  );
  const currentCategory = services.find((service) => service.title === category);
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.address)}`;

  return (
    <main className="paula-site">
      {/* Cabeçalho fixo acompanhando o usuário até o final da página */}
      <header className={`site-header-fixed ${isScrolled ? "is-scrolled" : ""}`}>
        <div className="site-header page-width">
          <Button
            variant="ghost"
            className="logo-button"
            onClick={() => scrollTo("inicio")}
            aria-label="Paula Medeiros — início"
          >
            <img src={site.images.logo} alt="Paula Medeiros Estética" />
          </Button>
          <nav aria-label="Navegação principal" className="desktop-nav">
            {navigation.map((item) => (
              <Button
                key={item.id}
                variant="ghost"
                className={`nav-link ${activeSection === item.id ? "active" : ""}`}
                onClick={() => scrollTo(item.id)}
              >
                {item.label}
              </Button>
            ))}
          </nav>
          {bookingButton("header-booking")}
          <Button
            variant="ghost"
            size="icon"
            className="mobile-menu-toggle"
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X /> : <Menu />}
          </Button>
          {menuOpen && (
            <nav className="mobile-nav" aria-label="Navegação no celular">
              {navigation.map((item) => (
                <Button
                  key={item.id}
                  variant="ghost"
                  className={activeSection === item.id ? "active" : ""}
                  onClick={() => scrollTo(item.id)}
                >
                  {item.label}
                </Button>
              ))}
              <div className="mobile-nav-cta">
                <Button
                  className="pill w-full bg-accent text-primary-foreground"
                  onClick={() => {
                    setMenuOpen(false);
                    openBooking();
                  }}
                >
                  <MessageCircle className="w-3.5 h-3.5 mr-1.5" />
                  Agendar pelo WhatsApp
                </Button>
              </div>
            </nav>
          )}
        </div>
      </header>

      <section id="inicio" className="hero-section">
        {/* Imagem de fundo no desktop (panorâmica original) */}
        <img
          src={site.images.hero}
          className="hero-image hero-image-desktop"
          alt="Paula Medeiros com blazer branco e camisa preta"
        />
        {/* Imagem de fundo única no mobile (vertical, preenchendo toda a hero section com a Paula embaixo e textos sobrepostos na parte superior) */}
        <img
          src="/assets/aistudio/Retrato_editorial_em_tons_quentes_0b1d81e1.png"
          className="hero-image hero-image-mobile"
          alt="Paula Medeiros - Bronzeamento e Estética"
          loading="eager"
        />
        {/* Espaçador invisível para o cabeçalho fixo */}
        <div className="hero-header-spacer" aria-hidden="true" />
        <div className="hero-body page-width">
          <div className="hero-copy">
            <p className="eyebrow text-white">Bronzeamento e estética</p>
            <h1>{site.heroTitle}</h1>
            <p className="hero-description">{site.heroDescription}</p>
            <div className="hero-actions">
              {bookingButton()}
              <Button
                variant="ghost"
                className="text-action text-white"
                onClick={() => scrollTo("servicos")}
              >
                Conheça nossos serviços <ArrowRight className="text-white" />
              </Button>
            </div>
          </div>
        </div>
      </section>
      <section className="benefits-band" aria-label="Diferenciais">
        <div className="page-width benefits-grid">
          {[
            {
              Icon: SunMedium,
              text: (
                <>
                  Bronzeamento natural
                  <br />
                  com segurança
                </>
              ),
            },
            {
              Icon: Sprout,
              text: (
                <>
                  Procedimentos estéticos
                  <br />
                  personalizados
                </>
              ),
            },
            {
              Icon: Heart,
              text: (
                <>
                  Atendimento humanizado
                  <br />e exclusivo
                </>
              ),
            },
            {
              Icon: Sparkle,
              text: (
                <>
                  Ambiente acolhedor
                  <br />e sofisticado
                </>
              ),
            },
          ].map(({ Icon, text }, i) => (
            <div className={`benefit reveal delay-${(i + 1) * 100}`} key={i}>
              <Icon />
              <p>{text}</p>
            </div>
          ))}
        </div>
      </section>
      <section id="servicos" className="services-editorial-section" aria-label="Nossos Serviços">
        <div className="page-width">
          {/* Cabeçalho em duas colunas */}
          <div className="services-editorial-header reveal">
            <div className="services-header-left">
              <span className="services-kicker">NOSSOS SERVIÇOS</span>
              <h2 className="services-title text-white">
                Beleza, bem-estar e
                <br />
                cuidado em cada detalhe.
              </h2>
            </div>
            <div className="services-header-right">
              <p className="services-header-desc text-white">
                Mais do que procedimentos, oferecemos experiências que valorizam o seu tempo, sua
                beleza e o seu bem-estar.
              </p>
            </div>
          </div>

          {/* Grid de oito cards: Quatro colunas no desktop, duas no tablet, proporcionais no celular */}
          <div className="services-grid-editorial">
            {services.map((service, index) => (
              <article
                key={service.id}
                className={`service-card-editorial group reveal delay-${((index % 4) + 1) * 100}`}
              >
                <div className="service-card-media">
                  <img src={service.image} alt={service.title} loading="lazy" />
                </div>
                <div className="service-card-content">
                  <div className="service-card-icon-wrap">
                    <ServiceCardIcon type={service.iconType} />
                  </div>
                  <h3 className="service-card-name">{service.title}</h3>
                  <p className="service-card-desc">{service.description}</p>
                  <div className="service-card-action">
                    <button
                      type="button"
                      onClick={() => setSelectedService(service)}
                      className="service-card-link"
                      aria-label={`Saiba mais sobre ${service.title}`}
                    >
                      <span>Saiba mais</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section id="sobre" className="about-responsive-section" aria-label="Sobre a Paula Medeiros">
        {/* VERSÃO DESKTOP (>= 769px) — Banner Panorâmico Oficial da Paula */}
        <div className="about-desktop-block">
          <img
            src="/assets/aistudio/about-banner-desktop.png"
            className="about-desktop-image"
            alt="Paula Medeiros - Realço a beleza que já existe em você"
            loading="lazy"
          />
          <div className="about-desktop-overlay">
            <div className="about-desktop-copy reveal">
              <p
                className="about-kicker"
                style={{
                  marginTop: "5px",
                  marginBottom: "0px",
                }}
              >
                QUEM SOU EU
              </p>
              <h2
                className="about-name"
                style={{
                  fontSize: "40px",
                }}
              >
                Paula Medeiros
              </h2>
              <p className="about-subheading">BELEZA, CUIDADO E PROPÓSITO</p>
              <div className="about-description">
                <p
                  style={{
                    width: "460px",
                    maxWidth: "100%",
                    marginTop: "30px",
                  }}
                >
                  Sou Paula Medeiros, especialista em bronzeamento e estética, e acredito que a
                  beleza vai muito além da aparência. É sobre autoestima, bem-estar e se sentir bem
                  na própria pele.
                </p>
                <p>
                  Aqui, você encontra um espaço seguro, acolhedor e pensado especialmente para você.
                </p>
              </div>
              <div className="about-cta-wrap">
                <button
                  type="button"
                  className="about-btn-pill"
                  onClick={() => setStoryOpen(true)}
                  aria-label="Conheça minha história"
                  style={{
                    paddingLeft: "40px",
                    paddingRight: "40px",
                    marginLeft: "0px",
                    marginRight: "0px",
                    marginTop: "10px",
                    marginBottom: "10px",
                  }}
                >
                  <span>Conheça minha história</span>
                  <ArrowRight className="about-btn-icon" />
                </button>
              </div>
              <div className="about-logo-stage">
                <img
                  className="about-logo-img"
                  src={site.images.logo}
                  alt="Paula Medeiros Estética"
                  style={{
                    borderWidth: "0px",
                    borderStyle: "solid",
                    marginTop: "20px",
                    marginLeft: "0px",
                    paddingTop: "0px",
                    paddingBottom: "0px",
                    paddingRight: "0px",
                    paddingLeft: "0px",
                    width: "800px",
                    maxWidth: "100%",
                    height: "50px",
                    objectFit: "contain",
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* VERSÃO MOBILE (<= 768px) — Retrato Vertical Oficial */}
        <div className="about-mobile-block">
          <div className="about-stage">
            <img
              src="/assets/aistudio/Retrato_profissional_com_fundo_dourado_06bd2fc3.png"
              className="about-stage-photo"
              alt="Paula Medeiros - Especialista em bronzeamento e estética"
              loading="lazy"
            />
            <div className="about-stage-overlay">
              <div className="about-stage-content reveal">
                <p className="about-kicker">QUEM SOU EU</p>
                <h2 className="about-name">Paula Medeiros</h2>
                <p className="about-subheading">BELEZA, CUIDADO E PROPÓSITO</p>
                <div className="about-description">
                  <p>
                    Sou Paula Medeiros, especialista em bronzeamento e estética, e acredito que a
                    beleza vai muito além da aparência. É sobre autoestima, bem-estar e se sentir
                    bem na própria pele.
                  </p>
                  <p>
                    Aqui, você encontra um espaço seguro, acolhedor e pensado especialmente para
                    você.
                  </p>
                </div>
                <div className="about-cta-wrap">
                  <button
                    type="button"
                    className="about-btn-pill"
                    onClick={() => setStoryOpen(true)}
                    aria-label="Conheça minha história"
                  >
                    <span>Conheça minha história</span>
                    <ArrowRight className="about-btn-icon" />
                  </button>
                </div>
                <div className="about-logo-stage">
                  <img
                    className="about-logo-img"
                    src={site.images.logo}
                    alt="Paula Medeiros Estética"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="espaco" className="space-enhanced" aria-label="Nosso espaço">
        <div className="space-bg-decor" aria-hidden="true">
          <div className="space-glow-1" />
          <div className="space-glow-2" />
          <div className="space-botanical-pattern" />
        </div>
        <div className="page-width">
          <div className="space-header-center reveal">
            <p className="eyebrow">Nosso espaço</p>
            <h2>Um refúgio pensado para o seu bem-estar</h2>
            <p>
              Cada detalhe do nosso espaço foi cuidadosamente planejado para proporcionar conforto,
              privacidade e uma atmosfera sofisticada do início ao fim do seu atendimento.
            </p>
          </div>
          <div className="space-four-grid">
            {spaceImages.map((item, index) => (
              <button
                type="button"
                key={item.title}
                className={`space-square-card group reveal delay-${(index + 1) * 150}`}
                onClick={() => setGallery(index)}
                aria-label={`Ver ambiente: ${item.title}`}
              >
                <img src={item.image} alt={item.alt} loading="lazy" />
                <div className="expand-indicator" aria-hidden="true">
                  <Maximize2 className="w-3.5 h-3.5" />
                </div>
                <div className="space-square-overlay">
                  <span className="square-badge">Ambiente 0{index + 1}</span>
                  <h4>{item.title}</h4>
                  <p>{item.description}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>
      <section id="depoimentos" className="testimonials-enhanced" aria-label="Depoimentos">
        <div className="page-width">
          <div className="testimonials-header-center reveal">
            <p className="eyebrow">Depoimentos reais</p>
            <h2>Quem já viveu, recomenda.</h2>
            <p>
              A satisfação, o brilho no olhar e a autoestima renovada das nossas clientes são a
              maior certeza da nossa dedicação e carinho em cada detalhe.
            </p>
          </div>
        </div>
        <div className="testimonials-marquee-container reveal-scale">
          <div className="testimonials-marquee-track">
            {[...testimonials, ...testimonials].map((review, i) => (
              <article className="testimonial-card-v2" key={`${review.name}-${i}`}>
                <div className="client-row">
                  <div className="client-meta">
                    <span className="client-name">{review.name}</span>
                    <span className="client-role">{review.role}</span>
                  </div>
                </div>
                <div className="stars-row" aria-label="Avaliação 5 estrelas">
                  {Array.from({ length: 5 }, (_, starIdx) => (
                    <Star key={starIdx} />
                  ))}
                </div>
                <blockquote>“{review.text}”</blockquote>
                <div className="service-used-tag">
                  <Sparkle className="w-3 h-3" />
                  <span>{review.service}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="booking-band">
        <img src={bookingBackground} alt="" />
        <div className="page-width booking-band-content reveal">
          <div>
            <p className="eyebrow">Pronta para se sentir ainda mais linda?</p>
            <h2>Agende seu horário</h2>
            <p>Escolha o serviço, o melhor horário e fale comigo pelo WhatsApp.</p>
          </div>
          {bookingButton()}
        </div>
      </section>
      <footer id="contato" className="footer-enhanced" aria-label="Contatos e localização">
        <div className="page-width">
          <div className="footer-top-cards">
            <div className="footer-contact-card reveal delay-100">
              <div className="card-icon">
                <MessageCircle />
              </div>
              <h4>WhatsApp Oficial</h4>
              <p>{site.phoneLabel}</p>
              <p className="text-[10px] text-amber-500/80 mt-1">Atendimento personalizado</p>
            </div>
            <div className="footer-contact-card reveal delay-200">
              <div className="card-icon">
                <MapPin />
              </div>
              <h4>Localização</h4>
              <p>Rua Arlindo Ferreira de Aguiar, 182</p>
              <p className="text-[10px] text-amber-500/80 mt-1">
                Senador Arnon de Melo, Arapiraca - AL
              </p>
            </div>
            <div className="footer-contact-card reveal delay-300">
              <div className="card-icon">
                <Clock3 />
              </div>
              <h4>Horário de Atendimento</h4>
              <p>{site.days}</p>
              <p className="text-[10px] text-amber-500/80 mt-1">{site.hours}</p>
            </div>
            <div className="footer-contact-card reveal delay-400">
              <div className="card-icon">
                <Instagram />
              </div>
              <h4>Instagram</h4>
              <p>@paulamedeirosestetica</p>
              <p className="text-[10px] text-amber-500/80 mt-1">Siga nosso dia a dia</p>
            </div>
          </div>

          {/* Seção de Mapa Limpa: sem bordas, sem ícones, clicável diretamente */}
          <div className="footer-map-section reveal">
            <a
              href={mapUrl}
              target="_blank"
              rel="noreferrer"
              className="clean-map-link"
              title="Abrir localização no Google Maps"
              aria-label="Localização no Google Maps"
            >
              <iframe
                title="Localização Paula Medeiros Estética no Google Maps"
                src="https://maps.google.com/maps?q=Rua%20Arlindo%20Ferreira%20de%20Aguiar,%20182,%20Senador%20Arnon%20de%20Melo,%20Arapiraca%20-%20AL,%2057315-120&t=&z=16&ie=UTF8&iwloc=&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="clean-map-iframe"
              />
            </a>

            <div className="footer-brand-wrap">
              <div className="brand-logo-glow-wrap">
                <img className="footer-logo-img" src={site.images.logo} alt={site.name} />
              </div>
              <p className="footer-tagline">
                Realçando a beleza que já existe em você com procedimentos estéticos exclusivos,
                bronzeamento personalizado, biossegurança rigorosa e cuidado acolhedor em Arapiraca.
              </p>
              <div className="footer-actions-row">
                <Button className="pill" onClick={() => openBooking()}>
                  <MessageCircle className="w-3.5 h-3.5" />
                  Agendar pelo WhatsApp
                </Button>
                <Button variant="outline" className="pill outline-pill" asChild>
                  <a href={site.instagram} target="_blank" rel="noreferrer">
                    <Instagram className="w-3.5 h-3.5" />
                    Seguir @paulabronze.estetica
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="page-width">
            <p>© 2026 Paula Medeiros Estética. Todos os direitos reservados.</p>
            <div>
              <span>Siga nossas redes</span>
              <a href={site.instagram} target="_blank" rel="noreferrer" aria-label="Instagram">
                <Instagram />
              </a>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => openBooking()}
                aria-label="WhatsApp"
              >
                <MessageCircle />
              </Button>
            </div>
          </div>
        </div>
      </footer>
      <Dialog
        open={selectedService !== null}
        onOpenChange={(open) => {
          if (!open) setSelectedService(null);
        }}
      >
        <DialogContent className="site-dialog">
          <DialogTitle>{selectedService?.title}</DialogTitle>
          <DialogDescription>{selectedService?.description}</DialogDescription>
          <div className="procedure-list">
            {selectedService?.items.map((item) => (
              <Button
                key={item}
                variant="outline"
                onClick={() => {
                  if (selectedService) openBooking(selectedService, item);
                }}
              >
                {item}
                <ArrowRight />
              </Button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
      <Dialog open={bookingOpen} onOpenChange={setBookingOpen}>
        <DialogContent className="site-dialog booking-dialog">
          <DialogTitle>Agende seu horário</DialogTitle>
          <DialogDescription>O horário será confirmado pela Paula.</DialogDescription>
          <form onSubmit={submitBooking} className="booking-form">
            <label className="full-field">
              Nome completo
              <input name="name" placeholder="Seu nome" required />
            </label>
            <label>
              Serviço
              <select
                required
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  setProcedure("");
                }}
              >
                <option value="">Selecione</option>
                {services.map((s) => (
                  <option key={s.id}>{s.title}</option>
                ))}
              </select>
            </label>
            <label>
              Procedimento
              <select
                required
                value={procedure}
                onChange={(e) => setProcedure(e.target.value)}
                disabled={!currentCategory}
              >
                <option value="">Selecione</option>
                {currentCategory?.items.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </label>
            <label>
              Data pretendida
              <input type="date" name="date" required />
            </label>
            <label>
              Horário pretendido
              <input type="time" name="time" required />
            </label>
            {notice && (
              <p className="booking-notice full-field" role="alert">
                {notice}
              </p>
            )}
            <Button className="pill full-field" type="submit">
              <MessageCircle />
              Continuar pelo WhatsApp
            </Button>
          </form>
        </DialogContent>
      </Dialog>
      <Dialog
        open={gallery !== null}
        onOpenChange={(open) => {
          if (!open) setGallery(null);
        }}
      >
        <DialogContent className="site-dialog gallery-dialog">
          <DialogTitle>Nosso espaço</DialogTitle>
          <DialogDescription>{gallery !== null ? spaceImages[gallery]?.alt : ""}</DialogDescription>
          {gallery !== null && (
            <img src={spaceImages[gallery]?.image} alt={spaceImages[gallery]?.alt} />
          )}
          <Button
            variant="outline"
            onClick={() => setGallery((v) => ((v ?? 0) + 1) % spaceImages.length)}
          >
            Próxima foto <ArrowRight />
          </Button>
        </DialogContent>
      </Dialog>
      <Dialog open={storyOpen} onOpenChange={setStoryOpen}>
        <DialogContent className="site-dialog">
          <DialogTitle>Paula Medeiros</DialogTitle>
          <DialogDescription>Beleza, cuidado e propósito</DialogDescription>
          {site.about.map((text) => (
            <p key={text}>{text}</p>
          ))}
          {bookingButton()}
        </DialogContent>
      </Dialog>
      {/* Botão Flutuante de WhatsApp com animação de pulso contínua */}
      <button
        type="button"
        className="floating-whatsapp-btn"
        onClick={() => openBooking()}
        aria-label="Falar com a Paula no WhatsApp"
        title="Agendar pelo WhatsApp"
      >
        <MessageCircle />
        <span className="floating-label">Agendar Horário</span>
      </button>
    </main>
  );
}
