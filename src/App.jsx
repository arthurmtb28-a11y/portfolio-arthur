import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import './App.css'

/* =========================================================
   CONFIGURAÇÕES — edite estes dados com suas informações
   ========================================================= */

const CONTACT = {
  email: 'arthurkrz15@gmail.com',
  // Somente números: DDI + DDD + número (ex: 5511987654321)
  whatsappNumber: '5587992102475',
  whatsappLabel: '(87) 99210-2475',
  whatsappMessage:
    'Olá, Arthur! Conheci seu portfólio e gostaria de conversar sobre um projeto de edição de vídeo.',
  instagramUrl: 'https://www.instagram.com/arthurjp7/',
  instagramLabel: '@arthurjp7',
  location: 'Petrolina – PE, Brasil',
  availability: 'Disponível para projetos freelance e remotos',
}

// Coloque sua foto em public/images e informe o caminho (ex: '/images/arthur.jpg')
const ABOUT_PHOTO = '/images/arthur-trabalho.webp'

// Foto de fundo do Hero, atrás do nome (em preto e branco e baixa opacidade)
const HERO_PHOTO = '/images/arthur-rosto.webp'

// Ordem: experiência mais recente primeiro (confirmar as datas)
const EXPERIENCE = [
  { company: 'Vutte Digital', role: 'Edição de vídeo', period: '2 anos' },
  { company: 'Core Educação', role: 'Setor de edição de vídeos', period: '1 ano' },
]

const ABOUT_TOOLS = [
  { name: 'Premiere Pro', text: 'Edição, montagem e finalização' },
  { name: 'After Effects', text: 'Motion graphics e animações' },
  { name: 'Inteligência Artificial', text: 'Ferramentas aplicadas à produção de conteúdo' },
]

const ABOUT_FIELDS = [
  'Redes sociais',
  'Comerciais',
  'Institucionais',
  'Projetos criativos',
]

const NAV_LINKS = [
  { id: 'work', label: 'Trabalhos' },
  { id: 'services', label: 'Serviços' },
  { id: 'about', label: 'Sobre' },
  { id: 'software', label: 'Ferramentas' },
  { id: 'contact', label: 'Contato' },
]

const NAV_IDS = NAV_LINKS.map((link) => link.id)

const CATEGORIES = [
  'Todos',
  'Vídeos Institucionais',
  'Educativos',
  'Motion Graphics',
  'Comerciais',
  'Narrativos',
]

/*
  PROJETOS

  title:       nome do projeto
  category:    uma das categorias acima (exceto 'Todos')
  description: texto curto exibido no card e no player
  format:      'landscape' (16:9) ou 'vertical' (9:16)
  duration: duração exibida no card (mm:ss)
  type:     'youtube' | 'vimeo' | 'file'
  src:      - youtube: apenas o ID do vídeo (ex: 'aBcD123xYz')
            - vimeo:   apenas o ID do vídeo (ex: '123456789')
            - file:    caminho dentro da pasta public (ex: '/videos/projeto.mp4')
  poster:   imagem de capa (ex: '/posters/projeto.webp')
            Para YouTube, a capa é gerada automaticamente se ficar vazia.
  featured: true para o projeto em destaque no topo da seção

  O vídeo só é carregado quando o visitante clica no card.
*/
const PROJECTS = [
  {
    id: 'p01',
    title: 'Estratégia de Marketing',
    category: 'Vídeos Institucionais',
    description:
      'Vídeo horizontal de fala para a câmera sobre estratégia de marketing, com ritmo natural, enquadramento limpo e legendas palavra por palavra.',
    format: 'landscape',
    duration: '1:18',
    type: 'file',
    src: '/videos/VUTTE_1_1080p.mp4',
    poster: '/posters/VUTTE_1.webp',
    featured: true,
  },
  {
    id: 'p02',
    title: 'Uma Parada na Estrada',
    category: 'Narrativos',
    description:
      'Curta vertical roteirizado, com vários personagens e locações, editado no tempo dos diálogos e finalizado com uma cor quente e cinematográfica.',
    format: 'vertical',
    duration: '2:04',
    type: 'file',
    src: '/videos/4.mp4',
    poster: '/posters/4.webp',
  },
  {
    id: 'p03',
    title: 'Seguro ou Associação?',
    category: 'Educativos',
    description:
      'Vídeo explicativo que combina fala para a câmera e cartelas de texto animadas para mostrar as diferenças entre associações de proteção e seguros.',
    format: 'vertical',
    duration: '0:56',
    type: 'file',
    src: '/videos/7.mp4',
    poster: '/posters/7.webp',
  },
  {
    id: 'p04',
    title: 'A Visão de um Empreendedor',
    category: 'Vídeos Institucionais',
    description:
      'Edição vertical em formato de entrevista com um empreendedor, com cortes dinâmicos, legendas em palavras-chave e abertura em preto e branco.',
    format: 'vertical',
    duration: '3:10',
    type: 'file',
    src: '/videos/2.mp4',
    poster: '/posters/2.webp',
  },
  {
    id: 'p05',
    title: 'Apresentação de Localização',
    category: 'Comerciais',
    description:
      'Vídeo para hotelaria que une a apresentadora em cena a sequências animadas de mapa por satélite, destacando os arredores do local.',
    format: 'vertical',
    duration: '0:48',
    type: 'file',
    src: '/videos/9.mp4',
    poster: '/posters/9.webp',
  },
  {
    id: 'p06',
    title: 'Conheça seu Público',
    category: 'Educativos',
    description:
      'Episódio de uma série passo a passo, com tipografia cinética marcante, cenário em tons de laranja e legendas dinâmicas.',
    format: 'vertical',
    duration: '1:40',
    type: 'file',
    src: '/videos/1.mp4',
    poster: '/posters/1.webp',
  },
  {
    id: 'p07',
    title: 'Construindo Negócios Fortes',
    category: 'Motion Graphics',
    description:
      'Vídeo motivacional conduzido por tipografia animada, inserções gráficas e legendas estilizadas que reforçam cada ideia.',
    format: 'vertical',
    duration: '0:51',
    type: 'file',
    src: '/videos/3.mp4',
    poster: '/posters/3.webp',
  },
  {
    id: 'p08',
    title: 'Como Lidar com Clientes Insatisfeitos',
    category: 'Educativos',
    description:
      'Vídeo sobre atendimento que abre com um gancho sobre o caso de uma companhia aérea e segue com a apresentadora, apoiada por imagens de cobertura.',
    format: 'vertical',
    duration: '2:25',
    type: 'file',
    src: '/videos/12.mp4',
    poster: '/posters/12.webp',
  },
]

const SERVICES = [
  {
    title: 'Vídeos para Redes Sociais',
    text: 'Edição de vídeos para Reels, TikTok e YouTube Shorts, com cortes dinâmicos, legendas, ritmo envolvente e foco em prender a atenção do público.',
  },
  {
    title: 'Vídeos Institucionais',
    text: 'Edição de vídeos para apresentar empresas, equipes, produtos e serviços, transmitindo profissionalismo e fortalecendo a imagem da marca.',
  },
  {
    title: 'Vídeos Comerciais e Publicitários',
    text: 'Produção e edição de vídeos para campanhas, anúncios e divulgação de produtos e serviços, com uma narrativa visual que valoriza a marca.',
  },
  {
    title: 'Motion Graphics',
    text: 'Animações, textos em movimento e elementos gráficos que tornam a comunicação visual mais dinâmica e interessante.',
  },
]

const SOFTWARE = [
  {
    mark: 'Pr',
    name: 'Adobe Premiere Pro',
    text: 'Edição, estrutura narrativa, correção de cor e finalização de áudio.',
  },
  {
    mark: 'Ae',
    name: 'Adobe After Effects',
    text: 'Motion graphics, composição e títulos animados.',
  },
  {
    mark: 'IA',
    name: 'Ferramentas de IA',
    text: 'Fluxos de trabalho mais ágeis para transcrição, limpeza, aumento de resolução e geração de ideias.',
  },
]

/* =========================================================
   HELPERS
   ========================================================= */

function getPoster(project) {
  if (project.poster) return project.poster
  if (project.type === 'youtube' && project.src) {
    return `https://img.youtube.com/vi/${project.src}/hqdefault.jpg`
  }
  return ''
}

function getEmbedUrl(project) {
  if (project.type === 'youtube') {
    return `https://www.youtube.com/embed/${project.src}?autoplay=1&rel=0&modestbranding=1`
  }
  if (project.type === 'vimeo') {
    return `https://player.vimeo.com/video/${project.src}?autoplay=1&title=0&byline=0&portrait=0`
  }
  return project.src
}

function getMeta(project) {
  const ratio = project.format === 'vertical' ? '9:16' : '16:9'
  return project.duration ? `${ratio} · ${project.duration}` : ratio
}

function getWhatsAppLink() {
  const text = encodeURIComponent(CONTACT.whatsappMessage)
  return `https://wa.me/${CONTACT.whatsappNumber}?text=${text}`
}

/* =========================================================
   HOOKS
   ========================================================= */

// Timecode em tempo real (HH:MM:SS:FF), como na timeline de edição
function useTimecode(fps = 24) {
  const [timecode, setTimecode] = useState('00:00:00:00')

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) return

    let frameId
    const start = performance.now()

    const tick = (now) => {
      const totalFrames = Math.floor(((now - start) / 1000) * fps)
      const frames = totalFrames % fps
      const seconds = Math.floor(totalFrames / fps) % 60
      const minutes = Math.floor(totalFrames / (fps * 60)) % 60
      const hours = Math.floor(totalFrames / (fps * 3600))

      setTimecode(
        [hours, minutes, seconds, frames]
          .map((n) => String(n).padStart(2, '0'))
          .join(':')
      )
      frameId = requestAnimationFrame(tick)
    }

    frameId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frameId)
  }, [fps])

  return timecode
}

// Destaca no menu a seção visível na tela
function useActiveSection(ids) {
  const [active, setActive] = useState('')

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' }
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [ids])

  return active
}

const REVEAL_SELECTOR = '[data-reveal], [data-stagger]'

// Revela suavemente elementos com data-reveal (e listas com data-stagger)
function useReveal() {
  useEffect(() => {
    if (!('IntersectionObserver' in window)) {
      document
        .querySelectorAll(REVEAL_SELECTOR)
        .forEach((el) => el.classList.add('is-visible'))
      return
    }

    // Elemento observado -> elementos que ele revela
    const targets = new Map()

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          targets.get(entry.target)?.forEach((el) => el.classList.add('is-visible'))
          targets.delete(entry.target)
          observer.unobserve(entry.target)
        })
      },
      { threshold: 0.12 }
    )

    const watch = (el) => {
      if (el.classList.contains('is-visible')) return
      // Com a máscara fechada (clip-path) o elemento tem área visível zero
      // para o navegador, então quem dispara a revelação é o elemento pai
      const masked = ['title', 'mask'].includes(el.dataset.reveal)
      const target = masked ? el.parentElement : el
      if (!targets.has(target)) targets.set(target, new Set())
      targets.get(target).add(el)
      observer.observe(target)
    }

    const watchTree = (root) => {
      if (root.matches?.(REVEAL_SELECTOR)) watch(root)
      root.querySelectorAll?.(REVEAL_SELECTOR).forEach(watch)
    }

    watchTree(document.body)

    // Cards recriados pelos filtros também precisam ser observados
    const mutations = new MutationObserver((records) => {
      records.forEach((record) => record.addedNodes.forEach(watchTree))
    })
    mutations.observe(document.body, { childList: true, subtree: true })

    return () => {
      observer.disconnect()
      mutations.disconnect()
    }
  }, [])
}

// Profundidade sutil: parallax na rolagem e retrato do Hero seguindo o mouse
function useDepth() {
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) return

    const hero = document.querySelector('.hero')
    let frame = 0

    const update = () => {
      frame = 0
      const vh = window.innerHeight

      if (hero && window.scrollY <= hero.offsetHeight) {
        const progress = Math.min(window.scrollY / hero.offsetHeight, 1)
        hero.style.setProperty('--hero-progress', progress.toFixed(4))
      }

      // -1 (acima do centro da tela) a 1 (abaixo)
      document.querySelectorAll('[data-parallax]').forEach((el) => {
        const rect = el.getBoundingClientRect()
        if (rect.bottom < 0 || rect.top > vh) return
        const offset = (rect.top + rect.height / 2 - vh / 2) / vh
        el.style.setProperty('--parallax', offset.toFixed(4))
      })
    }

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    const onPointerMove = (event) => {
      const x = (event.clientX / window.innerWidth - 0.5) * 2
      const y = (event.clientY / window.innerHeight - 0.5) * 2
      hero.style.setProperty('--mx', x.toFixed(3))
      hero.style.setProperty('--my', y.toFixed(3))
    }

    const onPointerLeave = () => {
      hero.style.setProperty('--mx', '0')
      hero.style.setProperty('--my', '0')
    }

    // Só em telas com mouse; no toque, o retrato fica parado
    const finePointer = hero && window.matchMedia('(pointer: fine)').matches

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    if (finePointer) {
      hero.addEventListener('pointermove', onPointerMove)
      hero.addEventListener('pointerleave', onPointerLeave)
    }

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (finePointer) {
        hero.removeEventListener('pointermove', onPointerMove)
        hero.removeEventListener('pointerleave', onPointerLeave)
      }
    }
  }, [])
}

// Estado de rolagem: fundo do menu e barra de progresso (playhead)
function useScrollState(progressRef) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    let ticking = false

    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      const progress = max > 0 ? Math.min(window.scrollY / max, 1) : 0
      progressRef.current?.style.setProperty('--progress', progress.toFixed(4))
      setScrolled(window.scrollY > 24)
      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(update)
      }
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [progressRef])

  return scrolled
}

/* =========================================================
   COMPONENTES
   ========================================================= */

function Nav({ active, scrolled, progressRef }) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 820) setOpen(false)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const close = () => setOpen(false)

  return (
    <header
      className={`nav ${scrolled ? 'nav--scrolled' : ''} ${open ? 'nav--open' : ''}`}
    >
      <div className="nav__inner">
        <a href="#top" className="nav__logo" onClick={close}>
          Arthur Oliveira
        </a>

        <nav id="main-menu" className="nav__menu" aria-label="Principal">
          <ul className="nav__list">
            {NAV_LINKS.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  className={`nav__link ${active === link.id ? 'is-active' : ''}`}
                  aria-current={active === link.id ? 'true' : undefined}
                  onClick={close}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          className="nav__toggle"
          aria-expanded={open}
          aria-controls="main-menu"
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          onClick={() => setOpen((value) => !value)}
        >
          <span />
          <span />
        </button>
      </div>

      <div className="nav__progress" ref={progressRef} aria-hidden="true">
        <span />
      </div>
    </header>
  )
}

function Hero() {
  const timecode = useTimecode(24)

  return (
    <section className="hero" id="top" aria-label="Apresentação">
      {HERO_PHOTO && (
        <div className="hero__photo" aria-hidden="true">
          <img src={HERO_PHOTO} alt="" width="1000" height="1500" fetchPriority="high" />
        </div>
      )}

      <div className="hero__bar hero__bar--top" aria-hidden="true" />

      <div className="hero__frame">
        <span className="hero__corner hero__corner--tl" aria-hidden="true" />
        <span className="hero__corner hero__corner--tr" aria-hidden="true" />
        <span className="hero__corner hero__corner--bl" aria-hidden="true" />
        <span className="hero__corner hero__corner--br" aria-hidden="true" />

        <div className="hero__content">
          <h1 className="hero__name">
            <span className="hero__line">
              <span>Arthur</span>
            </span>
            <span className="hero__line">
              <span>Oliveira</span>
            </span>
          </h1>
          <p className="hero__role">Editor de Vídeo</p>
          <p className="hero__tagline">
            Cada corte tem um motivo. Cada quadro conquista o seu lugar.
          </p>
          <a href="#work" className="button button--primary hero__cta">
            Ver meus trabalhos
          </a>
        </div>
      </div>

      <div className="hero__bar hero__bar--bottom">
        <span className="hero__timecode" aria-hidden="true">
          {timecode}
        </span>
        <span className="hero__ratio" aria-hidden="true">
          2,39 : 1
        </span>
      </div>
    </section>
  )
}

// O card mostra só a thumbnail; o vídeo é carregado no modal, ao clicar
function ProjectCard({ project, index = 0, onOpen }) {
  const poster = getPoster(project)
  const ready = Boolean(project.src)
  const featured = Boolean(project.featured)

  return (
    <article
      className={`card card--${project.format} ${featured ? 'card--featured' : ''}`}
      data-reveal
      style={{ '--reveal-delay': `${(index % 4) * 80}ms` }}
    >
      <button
        type="button"
        className="card__media"
        onClick={() => ready && onOpen(project)}
        disabled={!ready}
        aria-label={ready ? `Assistir ${project.title}` : `${project.title}, em breve`}
      >
        {poster && (
          <img
            className="card__thumb"
            src={poster}
            alt=""
            width={featured ? 1920 : 720}
            height={featured ? 1080 : 1280}
            loading={featured ? 'eager' : 'lazy'}
            decoding="async"
          />
        )}

        {!ready && (
          <span className="card__placeholder">
            <span className="card__ratio">
              {project.format === 'vertical' ? '9:16' : '16:9'}
            </span>
            <span className="card__soon">Em breve</span>
          </span>
        )}

        {ready && (
          <span className="card__play" aria-hidden="true">
            <svg viewBox="0 0 24 24" focusable="false">
              <path d="M8 5.5v13l10.5-6.5z" />
            </svg>
          </span>
        )}

        <span className="card__scrub" aria-hidden="true" />
      </button>

      <div className="card__info">
        {featured && <p className="card__label">Destaque</p>}
        <h3 className="card__title">{project.title}</h3>
        <p className="card__meta">
          {project.category} · {getMeta(project)}
        </p>
        {project.description && (
          <p className="card__desc">{project.description}</p>
        )}
      </div>
    </article>
  )
}

function VideoModal({ project, index, total, closing, onClose, onClosed }) {
  const closeRef = useRef(null)

  useEffect(() => {
    const previousFocus = document.activeElement
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()

    const onKey = (event) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
      previousFocus?.focus?.()
    }
  }, [onClose])

  return (
    <div
      className={`modal ${closing ? 'modal--closing' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
      onClick={onClose}
      onAnimationEnd={(event) => {
        // Desmonta só depois que a animação de saída termina
        if (closing && event.target === event.currentTarget) onClosed()
      }}
    >
      <button
        ref={closeRef}
        type="button"
        className="modal__close"
        onClick={onClose}
        aria-label="Fechar vídeo"
      >
        Fechar
      </button>

      <figure
        className={`modal__figure modal__figure--${project.format}`}
        onClick={(event) => event.stopPropagation()}
      >
        <div className={`modal__player modal__player--${project.format}`}>
          {project.type === 'file' ? (
            <video
              src={project.src}
              poster={getPoster(project) || undefined}
              controls
              autoPlay
              playsInline
              preload="auto"
            />
          ) : (
            <iframe
              src={getEmbedUrl(project)}
              title={project.title}
              allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
              allowFullScreen
            />
          )}
        </div>

        <figcaption className="modal__caption">
          <span className="modal__title">{project.title}</span>
          <span className="modal__meta">
            {project.category} · {getMeta(project)}
            <span className="modal__count">
              {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </span>
          </span>
          {project.description && (
            <span className="modal__desc">{project.description}</span>
          )}
        </figcaption>
      </figure>
    </div>
  )
}

function Work() {
  const [filter, setFilter] = useState('Todos')
  const [current, setCurrent] = useState(null)
  const [closing, setClosing] = useState(false)
  const filtersRef = useRef(null)
  const indicatorRef = useRef(null)

  const filtered =
    filter === 'Todos'
      ? PROJECTS
      : PROJECTS.filter((project) => project.category === filter)
  const featured = filtered.filter((project) => project.featured)
  const grid = filtered.filter((project) => !project.featured)

  const openModal = useCallback((project) => {
    setClosing(false)
    setCurrent(project)
  }, [])
  const closeModal = useCallback(() => setClosing(true), [])
  const finishClose = useCallback(() => {
    setCurrent(null)
    setClosing(false)
  }, [])

  // Pílula que desliza até o filtro ativo
  useLayoutEffect(() => {
    const place = () => {
      const active = filtersRef.current?.querySelector('.is-active')
      const indicator = indicatorRef.current
      if (!active || !indicator) return
      indicator.style.width = `${active.offsetWidth}px`
      indicator.style.height = `${active.offsetHeight}px`
      indicator.style.transform = `translate(${active.offsetLeft}px, ${active.offsetTop}px)`
    }

    place()
    document.fonts?.ready.then(place)
    window.addEventListener('resize', place)
    return () => window.removeEventListener('resize', place)
  }, [filter])

  return (
    <section id="work" className="section work">
      <div className="container">
        <header className="section__head">
          <h2 className="section__title" data-reveal="title">
            Trabalhos selecionados
          </h2>
          <p
            className="section__lead"
            data-reveal
            style={{ '--reveal-delay': '150ms' }}
          >
            Edições horizontais e verticais. Selecione um projeto para assistir.
          </p>
        </header>

        <div
          ref={filtersRef}
          className="filters"
          role="group"
          aria-label="Filtrar projetos por categoria"
          data-reveal
        >
          <span ref={indicatorRef} className="filters__indicator" aria-hidden="true" />
          {CATEGORIES.map((category) => (
            <button
              key={category}
              type="button"
              className={`filters__btn ${filter === category ? 'is-active' : ''}`}
              aria-pressed={filter === category}
              onClick={() => setFilter(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {featured.length > 0 && (
          <div key={`featured-${filter}`} className="gallery gallery--featured">
            {featured.map((project) => (
              <ProjectCard key={project.id} project={project} onOpen={openModal} />
            ))}
          </div>
        )}

        {grid.length > 0 && (
          <>
            <h3 className="gallery__label">Formatos verticais</h3>
            <div key={`grid-${filter}`} className="gallery gallery--vertical">
              {grid.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                  onOpen={openModal}
                />
              ))}

              {filter === 'Todos' && (
                <a
                  href="#contact"
                  className="card card--vertical card--cta"
                  data-reveal
                  style={{ '--reveal-delay': `${(grid.length % 4) * 80}ms` }}
                >
                  <span className="card__cta">
                    <span className="card__cta-title">O seu pode ser o próximo.</span>
                    <span className="card__cta-link">Fale comigo</span>
                  </span>
                </a>
              )}
            </div>
          </>
        )}

        {filtered.length === 0 && (
          <p className="gallery__empty">Nenhum projeto nesta categoria ainda.</p>
        )}
      </div>

      {current && (
        <VideoModal
          project={current}
          index={PROJECTS.indexOf(current)}
          total={PROJECTS.length}
          closing={closing}
          onClose={closeModal}
          onClosed={finishClose}
        />
      )}
    </section>
  )
}

function Services() {
  return (
    <section id="services" className="section services">
      <div className="container">
        <header className="section__head">
          <h2 className="section__title" data-reveal="title">
            Serviços
          </h2>
          <p
            className="section__lead"
            data-reveal
            style={{ '--reveal-delay': '150ms' }}
          >
            Do material bruto à exportação final, pronto para publicar.
          </p>
        </header>

        <ul className="services__list">
          {SERVICES.map((service, index) => (
            <li
              key={service.title}
              className="services__item"
              data-reveal
              style={{ '--reveal-delay': `${index * 60}ms` }}
            >
              <span className="services__index" aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="services__title">{service.title}</h3>
              <p className="services__text">{service.text}</p>
            </li>
          ))}
        </ul>

        <div className="services__cta" data-reveal>
          <p className="services__cta-title">
            Vamos conversar sobre seu próximo projeto?
          </p>
          <a
            className="button button--primary"
            href={`https://wa.me/${CONTACT.whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Solicitar orçamento
          </a>
        </div>
      </div>
    </section>
  )
}

function About() {
  return (
    <section id="about" className="section about">
      <div className="container about__grid">
        <div className="about__photo" data-reveal="mask" data-parallax>
          {ABOUT_PHOTO ? (
            <img
              src={ABOUT_PHOTO}
              alt="Arthur Oliveira em seu espaço de trabalho"
              width="1000"
              height="1500"
              loading="lazy"
              decoding="async"
            />
          ) : (
            <span className="about__photo-empty">Retrato</span>
          )}
        </div>

        <div className="about__text">
          <h2 className="section__title" data-reveal="title">
            Sobre mim
          </h2>
          <p
            className="about__intro"
            data-reveal
            style={{ '--reveal-delay': '150ms' }}
          >
            Sou Arthur Oliveira, editor de vídeo profissional. Transformo
            material bruto em vídeos com ritmo, clareza e intenção.
          </p>

          <div className="about__body" data-reveal>
            <p>
              Construí minha trajetória em agências de marketing digital,
              editando conteúdos pensados para prender a atenção e comunicar
              com clareza desde o primeiro segundo.
            </p>
            <p>
              Edito vídeos para redes sociais, conteúdos comerciais,
              institucionais e projetos criativos. Trabalho com Adobe Premiere
              Pro e After Effects e uso ferramentas de inteligência artificial
              para agilizar etapas da produção, sem abrir mão do cuidado com
              cada detalhe.
            </p>
          </div>

          <p className="about__available" data-reveal>
            Disponível para projetos freelance e remotos
          </p>

          <div className="about__block">
            <h3 className="about__label" data-reveal>Experiência</h3>
            <ul className="about__experience" data-stagger>
              {EXPERIENCE.map((job, index) => (
                <li key={job.company} className="about__job" style={{ '--i': index }}>
                  <span className="about__company">{job.company}</span>
                  <span className="about__role">{job.role}</span>
                  <span className="about__period">{job.period}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="about__block">
            <h3 className="about__label" data-reveal>Ferramentas</h3>
            <ul className="about__tools" data-stagger>
              {ABOUT_TOOLS.map((tool, index) => (
                <li key={tool.name} className="about__tool" style={{ '--i': index }}>
                  <span className="about__tool-name">{tool.name}</span>
                  <span className="about__tool-text">{tool.text}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="about__block">
            <h3 className="about__label" data-reveal>Atuação</h3>
            <ul className="about__fields" data-stagger>
              {ABOUT_FIELDS.map((field, index) => (
                <li key={field} style={{ '--i': index }}>
                  {field}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

function Software() {
  return (
    <section id="software" className="section software">
      <div className="container">
        <header className="section__head">
          <h2 className="section__title" data-reveal="title">
            Ferramentas
          </h2>
          <p
            className="section__lead"
            data-reveal
            style={{ '--reveal-delay': '150ms' }}
          >
            As ferramentas por trás de cada edição.
          </p>
        </header>

        <ul className="software__list">
          {SOFTWARE.map((tool, index) => (
            <li
              key={tool.name}
              className="software__item"
              data-reveal
              style={{ '--reveal-delay': `${index * 100}ms` }}
            >
              <span className="software__mark" aria-hidden="true">
                {tool.mark}
              </span>
              <h3 className="software__name">{tool.name}</h3>
              <p className="software__text">{tool.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function Contact() {
  const whatsappLink = getWhatsAppLink()

  return (
    <section id="contact" className="section contact">
      <div className="container contact__inner">
        <p className="contact__status" data-reveal>
          {CONTACT.availability}
        </p>
        <h2
          className="contact__title"
          data-reveal="title"
          style={{ '--reveal-delay': '100ms' }}
        >
          Vamos conversar sobre o seu próximo projeto.
        </h2>
        <p
          className="contact__lead"
          data-reveal
          style={{ '--reveal-delay': '200ms' }}
        >
          Me conte sobre o seu material, o prazo e onde o vídeo será publicado.
          Eu respondo com os próximos passos.
        </p>

        <div
          className="contact__actions"
          data-reveal
          style={{ '--reveal-delay': '280ms' }}
        >
          <a
            className="button button--primary"
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            Falar pelo WhatsApp
          </a>
          <a className="button button--ghost" href={`mailto:${CONTACT.email}`}>
            Enviar e-mail
          </a>
        </div>

        <dl className="contact__details" data-stagger>
          <div style={{ '--i': 0 }}>
            <dt>E-mail</dt>
            <dd>
              <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
            </dd>
          </div>
          <div style={{ '--i': 1 }}>
            <dt>WhatsApp</dt>
            <dd>
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                {CONTACT.whatsappLabel}
              </a>
            </dd>
          </div>
          <div style={{ '--i': 2 }}>
            <dt>Instagram</dt>
            <dd>
              <a href={CONTACT.instagramUrl} target="_blank" rel="noopener noreferrer">
                {CONTACT.instagramLabel}
              </a>
            </dd>
          </div>
          <div style={{ '--i': 3 }}>
            <dt>Localização</dt>
            <dd>{CONTACT.location}</dd>
          </div>
        </dl>
      </div>
    </section>
  )
}

function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <p>© {year} Arthur Oliveira</p>
        <a href="#top" className="footer__top">
          Voltar ao topo
        </a>
      </div>
    </footer>
  )
}

/* =========================================================
   APP
   ========================================================= */

export default function App() {
  const progressRef = useRef(null)
  const scrolled = useScrollState(progressRef)
  const active = useActiveSection(NAV_IDS)
  useReveal()
  useDepth()

  return (
    <>
      <Nav active={active} scrolled={scrolled} progressRef={progressRef} />
      <main>
        <Hero />
        <Work />
        <Services />
        <About />
        <Software />
        <Contact />
      </main>
      <Footer />
    </>
  )
}