import { useState, useRef, useEffect, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Clock3,
  CheckCircle2,
  ExternalLink,
  Heart,
  Instagram,
  MapPin,
  Maximize2,
  Menu,
  MessageCircle,
  Navigation,
  Pause,
  Phone,
  Play,
  Sparkle,
  Sprout,
  Star,
  SunMedium,
  X,
} from "lucide-react";
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
  const [reviewsOpen, setReviewsOpen] = useState(false);
  const servicesTrackRef = useRef<HTMLDivElement>(null);
  const [servicesAutoPlay, setServicesAutoPlay] = useState(true);
  const [testimonialsPaused, setTestimonialsPaused] = useState(false);

  const scrollServices = (direction: "left" | "right") => {
    if (!servicesTrackRef.current) return;
    const cardWidth = 350;
    servicesTrackRef.current.scrollBy({
      left: direction === "left" ? -cardWidth : cardWidth,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    if (!servicesAutoPlay) return;
    const interval = setInterval(() => {
      if (!servicesTrackRef.current) return;
      const { scrollLeft, scrollWidth, clientWidth } = servicesTrackRef.current;
      if (scrollLeft + clientWidth >= scrollWidth - 10) {
        servicesTrackRef.current.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        servicesTrackRef.current.scrollBy({ left: 350, behavior: "smooth" });
      }
    }, 4200);
    return () => clearInterval(interval);
  }, [servicesAutoPlay]);
  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
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
    const message = `Olá, Paula! Gostaria de agendar.\nNome: ${data.get("name")}\nServiço: ${category}\nProcedimento: ${procedure}\nData: ${data.get("date")}\nHorário: ${data.get("time")}\nPode confirmar a disponibilidade?`;
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
      <section id="inicio" className="hero-section">
        <img
          src={site.images.hero}
          className="hero-image"
          alt="Paula Medeiros com blazer branco e camisa preta"
        />
        <header className="site-header page-width">
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
                className={`nav-link ${item.id === "inicio" ? "active" : ""}`}
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
                <Button key={item.id} variant="ghost" onClick={() => scrollTo(item.id)}>
                  {item.label}
                </Button>
              ))}
            </nav>
          )}
        </header>
        <div className="hero-body page-width">
          <div className="hero-copy">
            <p className="eyebrow">Bronzeamento e estética</p>
            <h1>{site.heroTitle}</h1>
            <p className="hero-description">{site.heroDescription}</p>
            <div className="hero-actions">
              {bookingButton()}
              <Button variant="ghost" className="text-action" onClick={() => scrollTo("servicos")}>
                Conheça nossos serviços <ArrowRight />
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
            <div className="benefit" key={i}>
              <Icon />
              <p>{text}</p>
            </div>
          ))}
        </div>
      </section>
      <section id="servicos" className="services-enhanced" aria-label="Nossos Serviços">
        <div className="page-width">
          <div className="services-header-center">
            <p className="eyebrow">Experiências & Cuidados</p>
            <h2>Nossos Serviços</h2>
            <p>
              Procedimentos exclusivos de bronzeamento, massoterapia e estética facial pensados para
              realçar a sua beleza natural com máxima segurança, conforto e bem-estar.
            </p>
            <div className="flex items-center gap-3 mt-2">{bookingButton()}</div>
          </div>

          <div
            className="services-carousel-wrapper"
            onMouseEnter={() => setServicesAutoPlay(false)}
            onMouseLeave={() => setServicesAutoPlay(true)}
          >
            <div className="flex items-center justify-between mb-4 px-1">
              <span className="text-xs text-muted-foreground flex items-center gap-2">
                <Sparkle className="w-3.5 h-3.5 text-primary shrink-0" />
                Arraste ou use as setas para explorar nossos tratamentos
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => scrollServices("left")}
                  className="carousel-nav-btn"
                  aria-label="Serviço anterior"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={() => scrollServices("right")}
                  className="carousel-nav-btn"
                  aria-label="Próximo serviço"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div ref={servicesTrackRef} className="services-track">
              {services.map((service) => (
                <article key={service.id} className="service-card-v2">
                  <div className="service-image-box">
                    <img src={service.image} alt={service.title} loading="lazy" />
                    <span className="service-tag-badge">{service.tag}</span>
                  </div>
                  <div className="service-body">
                    <h3>{service.title}</h3>
                    <p className="service-sub">{service.subtitle}</p>
                    <p className="service-desc">{service.description}</p>
                    <div className="service-items-pill-list">
                      {service.items.slice(0, 3).map((item) => (
                        <span key={item} className="service-item-chip">
                          {item}
                        </span>
                      ))}
                      {service.items.length > 3 && (
                        <span className="service-item-chip font-medium">
                          +{service.items.length - 3} mais
                        </span>
                      )}
                    </div>
                    <div className="service-actions">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedService(service)}
                        className="text-xs p-0 h-auto font-medium text-foreground hover:text-primary hover:bg-transparent"
                      >
                        Ver procedimentos <ArrowRight className="w-3.5 h-3.5 ml-1" />
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => openBooking(service)}
                        className="pill text-[10px] h-7 px-3 bg-accent text-primary-foreground hover:bg-accent/90"
                      >
                        Agendar
                      </Button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section id="sobre" className="about-section" aria-label="Sobre a Paula Medeiros">
        <img
          src={site.images.aboutBanner}
          className="about-bg-image"
          alt="Paula Medeiros - Realço a beleza que já existe em você"
        />
        <div className="about-overlay" />
        <div className="page-width about-container">
          <div className="about-copy">
            <p className="eyebrow">Quem sou eu</p>
            <h2>Paula Medeiros</h2>
            <p className="eyebrow about-subtitle">Beleza, cuidado e propósito</p>
            {site.about.map((text) => (
              <p key={text}>{text}</p>
            ))}
            <Button className="pill" onClick={() => setStoryOpen(true)}>
              Conheça minha história <ArrowRight />
            </Button>
            <img className="about-logo" src={site.images.logo} alt="Paula Medeiros Estética" />
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
          <div className="space-header-center">
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
                className="space-square-card group"
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
          <div className="testimonials-header-center">
            <p className="eyebrow">Depoimentos reais</p>
            <h2>Quem já viveu, recomenda.</h2>
            <p>
              A satisfação, o brilho no olhar e a autoestima renovada das nossas clientes são a
              maior certeza da nossa dedicação e carinho em cada detalhe.
            </p>
          </div>
        </div>
        <div
          className="testimonials-marquee-container"
          onMouseEnter={() => setTestimonialsPaused(true)}
          onMouseLeave={() => setTestimonialsPaused(false)}
        >
          <div className={`testimonials-marquee-track ${testimonialsPaused ? "paused" : ""}`}>
            {[...testimonials, ...testimonials].map((review, i) => (
              <article className="testimonial-card-v2" key={`${review.name}-${i}`}>
                <div className="client-row">
                  <img
                    className="client-avatar"
                    src={review.image}
                    alt={review.name}
                    loading="lazy"
                  />
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
        <div className="testimonials-controls">
          <Button
            variant="outline"
            size="sm"
            className="rounded-full text-xs gap-1.5"
            onClick={() => setTestimonialsPaused((prev) => !prev)}
            aria-label={testimonialsPaused ? "Retomar movimento" : "Pausar movimento"}
          >
            {testimonialsPaused ? (
              <>
                <Play className="w-3 h-3" /> Retomar animação
              </>
            ) : (
              <>
                <Pause className="w-3 h-3" /> Pausar
              </>
            )}
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="rounded-full text-xs gap-1.5"
            onClick={() => setReviewsOpen(true)}
          >
            Ver todos os depoimentos <ArrowRight className="w-3 h-3" />
          </Button>
        </div>
      </section>
      <section className="booking-band">
        <img src={bookingBackground} alt="" />
        <div className="page-width booking-band-content">
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
            <div className="footer-contact-card">
              <div className="card-icon">
                <MessageCircle />
              </div>
              <h4>WhatsApp Oficial</h4>
              <p>{site.phoneLabel}</p>
              <p className="text-[10px] text-amber-500/80 mt-1">Atendimento personalizado</p>
            </div>
            <div className="footer-contact-card">
              <div className="card-icon">
                <MapPin />
              </div>
              <h4>Localização</h4>
              <p>Rua Arlindo Ferreira de Aguiar, 182</p>
              <p className="text-[10px] text-amber-500/80 mt-1">
                Senador Arnon de Melo, Arapiraca - AL
              </p>
            </div>
            <div className="footer-contact-card">
              <div className="card-icon">
                <Clock3 />
              </div>
              <h4>Horário de Atendimento</h4>
              <p>{site.days}</p>
              <p className="text-[10px] text-amber-500/80 mt-1">{site.hours}</p>
            </div>
            <div className="footer-contact-card">
              <div className="card-icon">
                <Instagram />
              </div>
              <h4>Instagram</h4>
              <p>@paulamedeirosestetica</p>
              <p className="text-[10px] text-amber-500/80 mt-1">Siga nosso dia a dia</p>
            </div>
          </div>

          <div className="footer-map-section">
            <div className="footer-map-card">
              <iframe
                title="Localização Paula Medeiros Estética no Google Maps"
                src="https://maps.google.com/maps?q=Rua%20Arlindo%20Ferreira%20de%20Aguiar,%20182,%20Senador%20Arnon%20de%20Melo,%20Arapiraca%20-%20AL,%2057315-120&t=&z=16&ie=UTF8&iwloc=&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="footer-map-bar">
                <span>
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  Rua Arlindo Ferreira de Aguiar, 182 — Arapiraca - AL
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  asChild
                  className="text-[11px] h-7 gap-1 text-amber-400 hover:text-amber-300"
                >
                  <a href={mapUrl} target="_blank" rel="noreferrer">
                    <Navigation className="w-3 h-3" />
                    Traçar Rota <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                </Button>
              </div>
            </div>

            <div className="footer-brand-wrap">
              <img className="footer-logo-img" src={site.images.logo} alt={site.name} />
              <p className="footer-tagline">
                Realçando a beleza que já existe em você com procedimentos estéticos exclusivos,
                bronzeamento personalizado, biossegurança e cuidado acolhedor em Arapiraca.
              </p>
              <div className="footer-actions-row">
                <Button className="pill" onClick={() => openBooking()}>
                  <MessageCircle className="w-3.5 h-3.5" />
                  Agendar horário
                </Button>
                <Button variant="outline" className="pill outline-pill" asChild>
                  <a href={site.instagram} target="_blank" rel="noreferrer">
                    <Instagram className="w-3.5 h-3.5" />
                    Seguir Instagram
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
      <Dialog open={reviewsOpen} onOpenChange={setReviewsOpen}>
        <DialogContent className="site-dialog">
          <DialogTitle>Quem já viveu, recomenda.</DialogTitle>
          <DialogDescription>Depoimentos</DialogDescription>
          {testimonials.map((review) => (
            <blockquote className="expanded-review" key={review.name}>
              “{review.text}”<cite>– {review.name}</cite>
            </blockquote>
          ))}
        </DialogContent>
      </Dialog>
    </main>
  );
}
