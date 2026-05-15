import React, { useState, useEffect, useCallback, useRef } from 'react'
import { Menu, X, ChevronDown, ChevronLeft, ChevronRight, Leaf, Search, MapPin, Phone, Mail, Facebook, Instagram, Twitter, ExternalLink, Calendar, BookOpen, Microscope, GraduationCap, Users, Sprout, Bird, Fish, Bug, Globe, Music, Tent, Anchor, FileText, CirclePlay, MousePointer2, Radio, Code, Download, FileJson, FileImage, Copy, Check, Terminal, FolderOpen, Monitor, Layers } from "lucide-react"
import logoUnicor from "@/assets/logo_unicor.png"
import logoImuc from "@/assets/imuc_logo.png"
import logoImucFooter from "@/assets/imuc_logo_full.png"
import bannerSombrero from "@/assets/banner-sombrero.jpg"
import bannerSombreroElaboracion from "@/assets/banner-sombrero-elaboracion.jpg"
import iconosHerbario from "@/assets/iconos_herbario.png"

// --- Constants & Data ---

const PRIMARY_GREEN = '#508C46'
const LIGHT_GREEN = '#A3D17C'

// Navigation Structure (Updated to link directly to the new Contactos page)
const NAV_ITEMS = [
  { name: 'Inicio', href: '#', action: 'home' },
  { name: 'Quienes somos', href: '#about', action: 'scroll' },
  {
    name: 'Colecciones',
    href: '#collections',
    submenu: [
      { name: 'Herbario', action: 'herbario' },
      { name: 'Zoológica', action: 'zoologica' },
      { name: 'Música', action: 'musica' },
      { name: 'Etnográfica', action: 'etnografica' }
    ]
  },
  {
    name: 'Museo',
    href: '#museum',
    submenu: [
      { name: 'Exposiciones permanentes', action: 'default' },
      { name: 'Exposiciones temporales', action: 'default' },
      { name: 'Actividades pedagógicas', action: 'default' }
    ]
  },
  { name: 'Proyección social', href: '#social', action: 'scroll' },
  { name: 'Contactos', href: '#', action: 'contactos' }
]

// Slider Images Data
const SLIDER_IMAGES = [
  {
    url: 'https://roboneo-public.meitudata.com/public/html_imgs/0dm3o3e9lf22jazm/69ecf1955b371m3l1qkx074084.jpeg',
    title: 'Ciencia, patrimonio y educación al servicio de la comunidad',
    action: 'riosinutimeline',
    buttonText: 'Descubre el Río Sinú'
  },
  {
    url: 'https://roboneo-public.meitudata.com/public/html_imgs/0amfm3531albxced/69a1b44ac0a8ay0wl7luz21040.jpg',
    title: 'Bienvenidos al Museo IMUC',
    subtitle: 'Un recorrido por la riqueza biológica y cultural del Caribe colombiano.'
  },
  {
    url: 'https://roboneo-public.meitudata.com/public/html_imgs/01mfnbyel1hcdc9k/69de31d018fe9ydxprl8h46512.jpeg',
    title: 'Bienvenidos al Museo IMUC.',
    subtitle: 'Ciencia, patrimonio y educación al servicio de la comunidad.'
  },
  {
    url: bannerSombreroElaboracion,
    title: 'Conoce la elaboración del sombrero vueltiao',
    action: 'desbaratado',
    buttonText: 'Ver elaboración'
  },
  {
    url: 'https://roboneo-public.meitudata.com/public/html_imgs/02m3n0xfb5uee3s6/69dd04bce3ff66lm89mksc2324.png'
  },
  {
    url: 'https://roboneo-public.meitudata.com/public/html_imgs/02m3n0xfb5uee3s6/69dd04bce40017mf1778yu2681.png'
  },
  {
    url: 'https://roboneo-public.meitudata.com/public/html_imgs/02m3n0xfb5uee3s6/69dd04bce3fecudwfrdifk9199.png'
  }
]

// Asset Registry
const SITE_ASSETS = [
  { name: 'Logo IMUCOR', type: 'image/png', url: 'https://roboneo-public.meitudata.com/public/html_imgs/05manar5x7n9t5c2/69d80c5c964ebjsimxdm8f5548.png' },
  { name: 'Logo UniCórdoba', type: 'image/png', url: 'https://roboneo-public.meitudata.com/public/html_imgs/0amfm3531albxced/69a1b5d49d64ca17yk9jz33721.png' },
  { name: 'Mascota Guía', type: 'image/png', url: 'https://roboneo-public.meitudata.com/public/html_imgs/05manar5x7n9t5c2/69d80c430694cwu0j7bm4v2314.png' },
  { name: 'Banner Herbario', type: 'image/jpg', url: 'https://roboneo-public.meitudata.com/public/html_imgs/0dm3o3e9lf22jazm/69ecf1955b371m3l1qkx074084.jpeg' },
  { name: 'Instalaciones Herbario', type: 'image/jpg', url: 'https://roboneo-public.meitudata.com/public/html_imgs/01mfnbyel1hcdc9k/69de31d018fe9ydxprl8h46512.jpeg' },
  { name: 'Banner Zoológica', type: 'image/jpg', url: 'https://roboneo-public.meitudata.com/public/html_imgs/0dm1net8eahcl8br/69d966cc5b05dyac7jkjv58665.jpeg' },
  { name: 'Colección Zoológica 1', type: 'image/jpg', url: 'https://roboneo-public.meitudata.com/public/html_imgs/0embn4u0feebw3lk/69da5976f3509s5kvofvrg8639.jpeg' },
  { name: 'Colección Zoológica 2', type: 'image/jpg', url: 'https://roboneo-public.meitudata.com/public/html_imgs/03m5n5tcdby3tf2u/69d96329ce329f942t8ya04665.png' },
  { name: 'Banner Etnográfica', type: 'image/jpg', url: 'https://roboneo-public.meitudata.com/public/html_imgs/0bmbn3xa98n68cug/69dcf7c03ac88hxaaa7hna7915.jpg' },
  { name: 'Artefacto Etnográfico', type: 'image/jpg', url: 'https://roboneo-public.meitudata.com/public/html_imgs/09m1mc5b24q5b7zv/69a1be2ce10eboepusn2v69292.JPG' },
  { name: 'Vida Río Sinú', type: 'image/jpg', url: 'https://roboneo-public.meitudata.com/public/html_imgs/0dm3o3e9lf22jazm/69ecf1955b371m3l1qkx074084.jpeg' },
  { name: 'Banner Música', type: 'image/jpg', url: 'https://roboneo-public.meitudata.com/public/html_imgs/0dm7n6u0h6v7j4tw/69da695a58a08c22ylu4f97552.png' },
  { name: 'Guía Musical', type: 'image/jpg', url: 'https://roboneo-public.meitudata.com/public/html_imgs/0dmdn2u4gdzfy8km/69da63bcdfa4aukqdg3g1e1402.png' },
  { name: 'Niño Música', type: 'image/jpg', url: 'https://roboneo-public.meitudata.com/public/html_imgs/08mdm65e41a4v3v0/69a1c6a50babeh8t3sa5tb6265.JPG' },
  { name: 'Rio Sinú Panorámica', type: 'image/jpg', url: 'https://roboneo-public.meitudata.com/public/html_imgs/0emamdjeofg380zy/69af372897c60hsd07z2r09823.png' },
  { name: 'Rio Sinú Vida Comunitaria', type: 'image/jpg', url: 'https://roboneo-public.meitudata.com/public/html_imgs/0emamdjeofg380zy/69af37425bfc59jv0mi3g92174.png' },
  { name: 'Rio Sinú Cultura', type: 'image/jpg', url: 'https://roboneo-public.meitudata.com/public/html_imgs/0emamdjeofg380zy/69af374d58de0jgs2idisq1104.png' },
  { name: 'Personaje Rio 1', type: 'image/jpg', url: 'https://roboneo-public.meitudata.com/public/html_imgs/05manar5x7n9t5c2/69d80c430694cwu0j7bm4v2314.png' },
  { name: 'Personaje Rio 2', type: 'image/jpg', url: 'https://roboneo-public.meitudata.com/public/html_imgs/05manar5x7n9t5c2/69d80c430694cwu0j7bm4v2314.png' },
  { name: 'Personaje Rio 3', type: 'image/jpg', url: 'https://roboneo-public.meitudata.com/public/html_imgs/05manar5x7n9t5c2/69d80c430694cwu0j7bm4v2314.png' }
]

// --- Components ---

// 1. Navigation Item Component
interface NavItemProps {
  item: typeof NAV_ITEMS[0]
  isMobile?: boolean
  onNavigate: (action: string, target?: string) => void
}

const NavItem = ({ item, isMobile = false, onNavigate }: NavItemProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleClick = (e: React.MouseEvent) => {
    if (item.submenu) {
      if (isMobile) {
        e.preventDefault()
        setIsOpen(!isOpen)
      }
    } else {
      e.preventDefault()
      onNavigate(item.action || 'default', item.href)
      if (isMobile) setIsOpen(false)
    }
  }

  if (item.submenu) {
    return (
      <div className={`relative group ${isMobile ? 'w-full' : ''}`}>
        <button
          className={`flex items-center justify-between w-full px-4 py-2 font-medium text-gray-700 hover:text-[#508C46] transition-colors ${isMobile ? 'border-b border-gray-100' : ''}`}
          onClick={handleClick}
        >
          {item.name}
          <ChevronDown className={`w-4 h-4 ml-1 transition-transform ${isOpen ? 'rotate-180' : ''} ${!isMobile && 'group-hover:rotate-180'}`} />
        </button>

        <div className={`
          ${isMobile
            ? (isOpen ? 'block bg-gray-50 pl-4' : 'hidden')
            : 'absolute top-full left-0 w-64 bg-white shadow-lg rounded-b-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50'
          }
        `}>
          {item.submenu.map((sub, idx) => (
            <button
              key={idx}
              onClick={() => onNavigate(sub.action)}
              className="block w-full text-left px-4 py-3 text-sm text-gray-600 hover:bg-[#A3D17C] hover:text-white transition-colors border-b border-gray-50 last:border-0"
            >
              {sub.name}
            </button>
          ))}
        </div>
      </div>
    )
  }

  return (
    <a
      href={item.href}
      onClick={handleClick}
      className={`block px-4 py-2 font-medium text-gray-700 hover:text-[#508C46] transition-colors ${isMobile ? 'border-b border-gray-100 w-full' : ''}`}
    >
      {item.name}
    </a>
  )
}

// 2. Guide Mascot Component (Updated with scroll behavior)
const GuideMascot = () => {
  const [isHovered, setIsHovered] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const lastScrollY = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      // Ocultar si hacemos scroll hacia abajo, mostrar si hacemos scroll hacia arriba
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setIsVisible(false)
      } else if (currentScrollY < lastScrollY.current) {
        setIsVisible(true)
      }
      lastScrollY.current = currentScrollY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      className={`fixed bottom-4 right-4 z-40 hidden md:flex flex-col items-end pointer-events-none transition-all duration-500 ease-in-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-32 opacity-0'}`}
      style={{ maxWidth: '300px' }}
    >
      <div
        className={`bg-white border-2 border-[#508C46] p-4 rounded-2xl rounded-br-none shadow-lg mb-2 mr-4 transition-all duration-300 transform origin-bottom-right pointer-events-auto
        ${isHovered ? 'scale-110 translate-y-[-5px]' : 'scale-100'}
        `}
      >
        <p className="text-[#508C46] font-bold text-sm">
          {isHovered ? '¡Explora nuestras colecciones!' : '¡Hola! Soy tu guía del museo.'}
        </p>
      </div>

      <div
        className="relative cursor-pointer pointer-events-auto transition-transform duration-300 hover:scale-105"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img
          src="https://roboneo-public.meitudata.com/public/html_imgs/05manar5x7n9t5c2/69d80c430694cwu0j7bm4v2314.png"
          alt="Guía del Museo"
          className="h-48 md:h-56 object-contain drop-shadow-xl"
        />
      </div>
    </div>
  )
}

// 3. Hero Carousel Component
interface HeroSliderProps {
  onNavigate: (action: string) => void
}

const HeroSlider = ({ onNavigate }: HeroSliderProps) => {
  const [current, setCurrent] = useState(0)
  const length = SLIDER_IMAGES.length
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const nextSlide = useCallback(() => {
    setCurrent(current === length - 1 ? 0 : current + 1)
  }, [current, length])

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1)
  }

  useEffect(() => {
    timeoutRef.current = setTimeout(nextSlide, 5000)
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [nextSlide])

  return (
    <section className="relative w-full h-[500px] md:h-[600px] overflow-hidden group">
      <div
        className="flex h-full transition-transform duration-700 ease-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {SLIDER_IMAGES.map((slide, index) => (
          <div key={index} className="w-full h-full flex-shrink-0 relative">
            <img
              src={slide.url}
              alt={slide.title || `Banner ${index + 1}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#508C46]/80 via-transparent to-transparent opacity-90"></div>

            <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 text-white transform transition-all duration-700 translate-y-0">
              <div className="container mx-auto">
                {slide.title && <h2 className="text-3xl md:text-5xl font-bold mb-4 drop-shadow-lg">{slide.title}</h2>}
                {slide.subtitle && <p className="text-xl md:text-2xl font-light max-w-2xl drop-shadow-md">{slide.subtitle}</p>}
                <button
                  onClick={() => slide.action ? onNavigate(slide.action) : onNavigate('default')}
                  className={`${(slide.title || slide.subtitle) ? 'mt-6 ' : ''}px-6 py-3 bg-[#A3D17C] text-[#508C46] font-bold rounded-full hover:bg-white transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1`}
                >
                  {slide.buttonText || 'Explorar Colección'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button onClick={prevSlide} className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/30 hover:bg-[#508C46] text-white p-3 rounded-full backdrop-blur-sm transition-all shadow-lg opacity-0 group-hover:opacity-100">
        <ChevronLeft size={24} />
      </button>
      <button onClick={nextSlide} className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/30 hover:bg-[#508C46] text-white p-3 rounded-full backdrop-blur-sm transition-all shadow-lg opacity-0 group-hover:opacity-100">
        <ChevronRight size={24} />
      </button>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-3">
        {SLIDER_IMAGES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              idx === current ? 'bg-[#A3D17C] w-8' : 'bg-white/50 hover:bg-white'
            }`}
          />
        ))}
      </div>
    </section>
  )
}

// 4. Source Code Modal Component
const SourceCodeModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [activeTab, setActiveTab] = useState<'guide' | 'assets' | 'html'>('guide')
  const [copied, setCopied] = useState(false)

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (!isOpen) return null

  const htmlTemplate = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>IMUCOR - Museo</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  <script src="https://unpkg.com/lucide@latest"></script>
</head>
<body>
  <div id="root"></div>
  <script type="text/babel">
    // Paste the full component code here
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(<App />);
    lucide.createIcons();
  </script>
</body>
</html>`

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-5xl h-[85vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        <div className="bg-[#508C46] text-white px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Code className="w-6 h-6" />
            <div>
              <h2 className="text-xl font-bold">Developer Package & Source Code</h2>
              <p className="text-xs opacity-80">IMUCOR Website Project Resources</p>
            </div>
          </div>
          <button onClick={onClose} className="hover:bg-white/20 p-2 rounded-full transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="flex flex-1 overflow-hidden">
          <div className="w-64 bg-gray-50 border-r border-gray-200 flex flex-col hidden md:flex">
            <button
              onClick={() => setActiveTab('guide')}
              className={`flex items-center gap-3 px-6 py-4 text-left font-medium transition-colors ${activeTab === 'guide' ? 'bg-white border-l-4 border-[#508C46] text-[#508C46]' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <Terminal size={18} /> Setup Guide
            </button>
            <button
              onClick={() => setActiveTab('assets')}
              className={`flex items-center gap-3 px-6 py-4 text-left font-medium transition-colors ${activeTab === 'assets' ? 'bg-white border-l-4 border-[#508C46] text-[#508C46]' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <FileImage size={18} /> Asset Manager
            </button>
            <button
              onClick={() => setActiveTab('html')}
              className={`flex items-center gap-3 px-6 py-4 text-left font-medium transition-colors ${activeTab === 'html' ? 'bg-white border-l-4 border-[#508C46] text-[#508C46]' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <FileJson size={18} /> HTML Template
            </button>

            <div className="mt-auto p-6">
              <div className="bg-green-50 p-4 rounded-xl border border-green-100">
                <p className="text-xs text-gray-600 mb-2">Project Status</p>
                <div className="flex items-center gap-2 text-green-700 font-bold text-sm">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  Ready to Export
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-8">
            {activeTab === 'guide' && (
              <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="border-b pb-4">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">How to run locally</h3>
                  <p className="text-gray-600">Follow these steps to host this website on your local machine.</p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-4">
                      <Monitor size={20} />
                    </div>
                    <h4 className="font-bold text-lg mb-2">Option A: Single File (Easiest)</h4>
                    <p className="text-sm text-gray-600 mb-4">Run directly in browser without installation.</p>
                    <ol className="list-decimal list-inside text-sm text-gray-700 space-y-2 mb-4">
                      <li>Create a file named <code className="bg-gray-100 px-1 rounded">index.html</code></li>
                      <li>Copy the <b>HTML Template</b> from the tab on the left.</li>
                      <li>Copy the <b>Component Code</b> (App.tsx content).</li>
                      <li>Paste the code inside the <code className="bg-gray-100 px-1 rounded">{'<script>'}</code> tag.</li>
                      <li>Open <code className="bg-gray-100 px-1 rounded">index.html</code> in Chrome/Edge.</li>
                    </ol>
                  </div>

                  <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-10 h-10 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center mb-4">
                      <Layers size={20} />
                    </div>
                    <h4 className="font-bold text-lg mb-2">Option B: Vite Project (Pro)</h4>
                    <p className="text-sm text-gray-600 mb-4">For development and production build.</p>
                    <div className="bg-gray-900 text-gray-300 p-4 rounded-lg text-xs font-mono mb-4">
                      <p>npm create vite@latest museum-site -- --template react-ts</p>
                      <p>cd museum-site</p>
                      <p>npm install</p>
                      <p>npm install lucide-react</p>
                      <p>npm run dev</p>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg flex gap-3">
                   <div className="text-yellow-600"><FolderOpen size={20} /></div>
                   <div>
                     <h5 className="font-bold text-yellow-800 text-sm">Note on Assets</h5>
                     <p className="text-sm text-yellow-700">This demo uses external image links. For a completely offline experience, please download the images from the <b>Asset Manager</b> tab and update the URLs in the code.</p>
                   </div>
                </div>
              </div>
            )}

            {activeTab === 'assets' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="flex justify-between items-end border-b pb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800">Asset Manager</h3>
                    <p className="text-gray-600">View and download all resources used in this website.</p>
                  </div>
                  <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-bold">
                    {SITE_ASSETS.length} files
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {SITE_ASSETS.map((asset, index) => (
                    <div key={index} className="bg-white border border-gray-200 rounded-lg p-3 hover:shadow-md transition-all group">
                      <div className="aspect-video bg-gray-100 rounded-md mb-3 overflow-hidden relative">
                         <img src={asset.url} alt={asset.name} className="w-full h-full object-cover" />
                         <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                           <a href={asset.url} target="_blank" rel="noopener noreferrer" className="p-2 bg-white rounded-full hover:bg-gray-200">
                             <ExternalLink size={16} className="text-gray-800" />
                           </a>
                         </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-bold text-sm text-gray-800 truncate">{asset.name}</p>
                          <p className="text-xs text-gray-500 uppercase">{asset.type.split('/')[1]}</p>
                        </div>
                        <button
                          onClick={() => handleCopy(asset.url)}
                          className="text-gray-400 hover:text-[#508C46] transition-colors"
                          title="Copy URL"
                        >
                          {copied ? <Check size={16} /> : <Copy size={16} />}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'html' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300 h-full flex flex-col">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800">HTML Template</h3>
                    <p className="text-gray-600 text-sm">Use this boilerplate to run the app without a build step.</p>
                  </div>
                  <button
                    onClick={() => handleCopy(htmlTemplate)}
                    className="flex items-center gap-2 bg-[#508C46] text-white px-4 py-2 rounded-lg hover:bg-[#3e6e36] transition-colors text-sm font-bold"
                  >
                    {copied ? <Check size={16} /> : 'Copy Template'}
                  </button>
                </div>

                <div className="relative flex-1 bg-gray-900 rounded-xl overflow-hidden border border-gray-700">
                  <div className="absolute top-0 left-0 right-0 h-8 bg-gray-800 flex items-center px-4 space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="ml-4 text-xs text-gray-400 font-mono">index.html</span>
                  </div>
                  <pre className="p-4 pt-10 text-gray-300 font-mono text-sm overflow-auto h-full w-full">
                    {htmlTemplate}
                  </pre>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// 5. Herbario View Component
const HerbarioView = ({ onBack }: { onBack: () => void }) => {
  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = 'Herbario - IMUCOR'
  }, [])

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="relative h-[300px] md:h-[400px] w-full overflow-hidden bg-black">
        <img
          src="https://roboneo-public.meitudata.com/public/html_imgs/01m4n0t42527veo6/69d9158f2f839u2jkpaa4g36.png"
          alt="Herbario Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white px-4 text-center z-10">
          <img
            src={iconosHerbario}
            alt="Iconos del Herbario"
            className="h-16 md:h-20 mb-4 drop-shadow-xl"
          />
          <h1 className="text-5xl md:text-7xl font-bold mb-4 drop-shadow-xl">HERBARIO</h1>
          <p className="text-2xl md:text-3xl font-medium drop-shadow-lg">Universidad de Córdoba HUC</p>
          <p className="text-lg md:text-xl font-light italic mt-2 drop-shadow-lg">Patrimonio científico de la flora Colombiana.</p>
        </div>
        <button
          onClick={onBack}
          className="absolute top-8 left-8 z-20 flex items-center text-white bg-black/20 hover:bg-black/40 px-4 py-2 rounded-full backdrop-blur-sm transition-all"
        >
          <ChevronLeft size={20} className="mr-1" />
          Volver al Inicio
        </button>
      </div>

      <div className="container mx-auto px-4 py-16 max-w-5xl">
        <section className="mb-20 grid md:grid-cols-12 gap-12 items-start">
          <div className="md:col-span-7 space-y-6">
            <h2 className="text-3xl font-bold text-[#508C46] border-l-4 border-[#A3D17C] pl-4">Salvaguardia y Conservación</h2>
            <p className="text-gray-700 leading-relaxed text-lg">
              El herbario de la Universidad de Córdoba es un espacio dedicado a la salvaguardia, investigación y conservación de la flora, con especial atención a la diversidad vegetal de la región Caribe. Su labor se centra en la recolección, preservación y documentación de especies, garantizando que cada ejemplar se convierta en una fuente de información científica para las generaciones presentes y futuras.
            </p>
            <p className="text-gray-700 leading-relaxed text-lg">
              Con más de 10.000 registros biológicos, el herbario se consolida como un referente regional y nacional para el estudio de la biodiversidad, aportando al conocimiento, valoración y protección del patrimonio natural.
            </p>
          </div>
          <div className="md:col-span-5 bg-green-50 p-8 rounded-2xl border border-green-100 shadow-sm relative overflow-hidden">
            <Leaf className="absolute -right-8 -bottom-8 w-48 h-48 text-[#508C46]/10" />
            <div className="relative z-10">
              <h3 className="text-xl font-bold text-[#508C46] mb-4 flex items-center">
                <Search className="w-5 h-5 mr-2" /> Datos Clave
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="w-2 h-2 mt-2 bg-[#A3D17C] rounded-full mr-3 flex-shrink-0"></span>
                  <span className="text-gray-700">Referente regional del Caribe</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 mt-2 bg-[#A3D17C] rounded-full mr-3 flex-shrink-0"></span>
                  <span className="text-gray-700">Patrimonio natural protegido</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 mt-2 bg-[#A3D17C] rounded-full mr-3 flex-shrink-0"></span>
                  <span className="text-gray-700">Fuente de información científica</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-20">
          <div className="text-center mb-12">
            <span className="text-[#A3D17C] font-bold tracking-wider uppercase text-sm">Nuestra Misión</span>
            <h2 className="text-3xl font-bold text-[#508C46] mt-2">Objetivos Principales</h2>
            <div className="w-20 h-1 bg-[#A3D17C] mx-auto mt-4 rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-[#508C46] hover:-translate-y-2 transition-transform duration-300">
              <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mb-6 mx-auto text-[#508C46]">
                <Microscope size={32} />
              </div>
              <h3 className="text-xl font-bold text-center mb-4 text-gray-800">Investigación</h3>
              <img 
                src="https://roboneo-public.meitudata.com/public/html_imgs/09m8nbsb2dj2k873/69d82a1f51312bjt431qk71002.jpeg" 
                alt="Investigación en laboratorio" 
                className="w-full h-40 object-cover rounded-lg mb-4 shadow-sm"
              />
              <p className="text-gray-600 text-center text-sm leading-relaxed">
                Fortalecer los procesos de investigación botánica, fomentando el trabajo interdisciplinario y la colaboración con grupos científicos.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-[#A3D17C] hover:-translate-y-2 transition-transform duration-300">
              <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mb-6 mx-auto text-[#508C46]">
                <GraduationCap size={32} />
              </div>
              <h3 className="text-xl font-bold text-center mb-4 text-gray-800">Formación</h3>
              <img 
                src="https://roboneo-public.meitudata.com/public/html_imgs/04m9ncsa29x6c1lt/69d82efc4828ee0dbnee631618.jpeg" 
                alt="Formación" 
                className="w-full h-40 object-cover rounded-lg mb-4 shadow-sm"
              />
              <p className="text-gray-600 text-center text-sm leading-relaxed">
                Apoyar la formación académica e investigativa, constituyendo un centro de información para el estudio de la biodiversidad.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-[#508C46] hover:-translate-y-2 transition-transform duration-300">
              <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mb-6 mx-auto text-[#508C46]">
                <Users size={32} />
              </div>
              <h3 className="text-xl font-bold text-center mb-4 text-gray-800">Divulgación</h3>
              <img 
                src="https://roboneo-public.meitudata.com/public/html_imgs/05m5nes145a8sff6/69d837e776393x2brrk29v4448.jpeg" 
                alt="Divulgación comunitaria" 
                className="w-full h-40 object-cover rounded-lg mb-4 shadow-sm"
              />
              <p className="text-gray-600 text-center text-sm leading-relaxed">
                Promover la documentación de la diversidad vegetal, especialmente del departamento de Córdoba y el conocimiento a través de estrategias educativas.
              </p>
            </div>
          </div>

          <div className="mt-8 bg-green-50 p-6 md:p-8 rounded-xl border border-green-100 flex flex-col md:flex-row items-center gap-6 md:gap-8 shadow-sm">
            <div className="flex-1 text-center md:text-left text-gray-700 italic text-lg leading-relaxed">
              "Reconocemos que la conservación de la flora requiere tanto del rigor científico como de estrategias pedagógicas y culturales que acerquen la biodiversidad a la comunidad."
            </div>
            <div className="w-full sm:w-2/3 md:w-1/3 lg:w-1/4 max-w-[280px] flex-shrink-0 mx-auto md:mx-0">
              <img 
                src="https://roboneo-public.meitudata.com/public/html_imgs/03m5n5tcdby3tf2u/69d96329ce329f942t8ya04665.png" 
                alt="Exploración de la biodiversidad" 
                className="w-full h-auto rounded-xl shadow-sm transform hover:scale-105 transition-transform duration-300 object-cover"
              />
            </div>
          </div>
        </section>

        <section className="mb-20">
          <div className="bg-white rounded-2xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden">
            <div className="grid md:grid-cols-2">
              
              {/* Texto */}
              <div className="p-8 md:p-10 flex flex-col justify-center">
                <div className="flex items-center space-x-3 mb-6">
                   <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center text-red-500">
                     <MapPin size={26} />
                   </div>
                   <h2 className="text-3xl font-bold text-gray-800">Ubicación</h2>
                </div>
                <p className="text-gray-600 text-lg leading-relaxed mb-8">
                  Ubicado en el bloque 40 de la Universidad de Córdoba, el herbario presta servicios a estudiantes, docentes, investigadores y público en general. Se constituye en un centro de apoyo clave para la investigación y la educación ambiental.
                </p>
                <div className="mt-auto">
                   <button className="flex items-center text-[#508C46] font-bold hover:text-[#3d6e35] transition-colors group">
                      <ExternalLink size={18} className="mr-2 group-hover:scale-110 transition-transform" />
                      Ver en el mapa interactivo
                   </button>
                </div>
              </div>
              
              {/* Imágenes */}
              <div className="bg-gray-50 p-6 md:p-8 flex flex-col gap-6 border-l border-gray-100">
                 {/* Map Image (Google Maps Style) */}
                 <div className="rounded-xl overflow-hidden shadow-md h-56 relative group">
                    <img 
                      src="https://roboneo-public.meitudata.com/public/html_imgs/02m2netf347102ln/4040532E_3df73e8d-a103-495a-8b04-d2ec7b52828a.png" 
                      alt="Mapa de ubicación Bloque 40" 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-xl pointer-events-none"></div>
                    <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-sm flex items-center text-sm font-semibold text-gray-800">
                       <MapPin size={16} className="text-red-500 mr-2" />
                       Bloque 40
                    </div>
                 </div>
                 {/* Lab Worker Image */}
                 <div className="rounded-xl overflow-hidden shadow-md h-56 relative group">
                    <img 
                      src="https://roboneo-public.meitudata.com/public/html_imgs/02m2netf347102ln/69d91b5ea18f1r2dm3i9xy7546.jpeg" 
                      alt="Personal trabajando en el laboratorio del Herbario" 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                       <span className="text-white font-medium text-sm drop-shadow-md">Laboratorio de investigación</span>
                    </div>
                 </div>
              </div>

            </div>
          </div>
        </section>

        <section className="bg-gray-50 rounded-3xl p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#A3D17C]/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

          <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-[#508C46] mb-6">Servicios</h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Ubicado en la Universidad de Córdoba, el herbario presta servicios a estudiantes, docentes, investigadores y público en general. Se constituye en un centro de apoyo clave para la investigación y la educación ambiental.
              </p>

              <div className="space-y-4">
                <h4 className="font-bold text-gray-800 flex items-center">
                  <Sprout className="w-5 h-5 mr-2 text-[#A3D17C]" /> Nuestros Servicios:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {['Identificación de plantas vasculares', 'Depósito de material Botánico', 'Visitas académicas', 'Consulta de ejemplares de la colección'].map((item, i) => (
                    <div key={i} className="flex items-center text-sm text-gray-600 bg-white p-3 rounded-lg shadow-sm">
                      <div className="w-2 h-2 bg-[#508C46] rounded-full mr-2"></div>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-xl transform rotate-1 md:rotate-2 border border-gray-100">
              <div className="grid grid-cols-2 gap-2 mb-4 h-64">
                <div className="bg-gray-200 rounded-xl overflow-hidden relative group">
                   <img
                    src="https://roboneo-public.meitudata.com/public/html_imgs/09m6mbmfec02g6d6/69b1b75735834dqlcjv2d82854.jpeg"
                    alt="Instalaciones Herbario"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
                </div>
                <div className="bg-gray-200 rounded-xl overflow-hidden relative group">
                   <img
                    src="https://roboneo-public.meitudata.com/public/html_imgs/03m0n3te22h6f1zk/69d9184974b0c5rb51rly88491.jpeg"
                    alt="Especímenes de algas marinas"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
                  <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-sm p-1.5 rounded-lg shadow-sm">
                    <Microscope size={16} className="text-[#508C46]" />
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-bold text-gray-800">Atención Especializada</p>
                  <p className="text-sm text-gray-500">Consultas para investigación</p>
                </div>
                <button className="bg-[#508C46] text-white p-2 rounded-full hover:bg-[#3d6e35] transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                  <Mail size={20} />
                </button>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  )
}

// 6. Colección Zoológica View Component
const ZoologicaView = ({ onBack }: { onBack: () => void }) => {
  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = 'Colección Zoológica - IMUCOR'
  }, [])

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 bg-white">
      <div className="relative h-[350px] md:h-[450px] w-full overflow-hidden bg-black">
        <img
          src="https://roboneo-public.meitudata.com/public/html_imgs/0dm1net8eahcl8br/69d966cc5b05dyac7jkjv58665.jpeg"
          alt="Banner Colección Zoológica CZUC"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#508C46]/90 via-black/60 to-black/40"></div>
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4 container mx-auto">
          <div className="flex items-center justify-center space-x-4 mb-4 text-[#A3D17C]">
            <Bird size={36} />
            <Fish size={32} />
            <Bug size={28} />
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 drop-shadow-2xl tracking-wide max-w-4xl leading-tight">
            COLECCIÓN ZOOLÓGICA UNIVERSIDAD DE CÓRDOBA CZUC
          </h1>
          <p className="text-lg md:text-xl text-gray-200 font-medium max-w-2xl drop-shadow-md">
            Resguardo de la diversidad animal del Caribe
          </p>
          <div className="mt-8 absolute top-4 left-4 md:top-8 md:left-8">
            <button
              onClick={onBack}
              className="flex items-center text-white bg-white/20 hover:bg-white/40 px-5 py-2.5 rounded-full backdrop-blur-md transition-all border border-white/30 shadow-lg"
            >
              <ChevronLeft size={20} className="mr-2" />
              Volver al Museo
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 max-w-6xl">
        <section className="mb-20 grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center space-x-2 text-[#508C46] font-semibold tracking-wider text-sm uppercase">
              <span className="w-8 h-0.5 bg-[#508C46]"></span>
              <span>CZUC - Universidad de Córdoba</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 leading-tight">
              Preservando el Patrimonio Biológico de la Región
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              La <span className="font-bold text-[#508C46]">Colección Zoológica de la Universidad de Córdoba - CZUC</span> tiene la misión de preservar y mantener a futuro muestras representativas de la diversidad animal, especialmente de la Región Caribe, que sirvan como fuente de información para la comunidad académica y la sociedad en general, y de referencia para el estudio y conservación de la biodiversidad de fauna en Colombia.
            </p>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="absolute inset-0 bg-[#A3D17C] rounded-2xl transform rotate-3 translate-x-2 translate-y-2 opacity-30"></div>
            <img
              src="https://roboneo-public.meitudata.com/public/html_imgs/0embn4u0feebw3lk/69da5976f3509s5kvofvrg8639.jpeg"
              alt="Presentación de Colección"
              className="relative rounded-2xl shadow-xl w-full h-auto object-cover transform transition-transform hover:-translate-y-1 duration-500"
            />
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg max-w-xs hidden md:block border-l-4 border-[#508C46]">
              <p className="text-xs text-gray-500 font-bold uppercase mb-1">Docencia y Extensión</p>
              <p className="text-sm font-medium text-gray-800">Espacios de aprendizaje interactivo con la biodiversidad local.</p>
            </div>
          </div>
        </section>

        <section className="mb-20 bg-green-50 rounded-3xl p-8 md:p-16 relative overflow-hidden">
          <Bug className="absolute top-10 right-10 text-[#508C46] opacity-5 w-32 h-32 rotate-12" />

          <div className="relative z-10 max-w-5xl mx-auto mb-12 flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/3 flex justify-center">
              <img 
                src="https://roboneo-public.meitudata.com/public/html_imgs/0amdn3y8w79eif8b/69de785dc55dddu04goy0s2471.png" 
                alt="Lagarto guía zoológico" 
                className="w-full max-w-[250px] object-contain transform hover:scale-105 transition-transform duration-300 drop-shadow-xl"
              />
            </div>
            
            <div className="md:w-2/3">
              <div className="text-center md:text-left mb-8">
                <h2 className="text-3xl font-bold text-[#508C46] mb-4">Consolidación y Futuro</h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="text-gray-700 text-lg whitespace-pre-line leading-relaxed">
                  La CZUC está conformada por representantes de{'\n'}
                  vertebrados.{'\n\n'}
                  peces, anfibios, reptiles y mamíferos; e{'\n'}
                  invertebrados: insectos (principalmente coleópteros,{'\n'}
                  lepidópteros, himenópteros, hemípteros, dípteros){'\n'}
                  otros artrópodos terrestres (arácnidos) e invertebrados{'\n'}
                  acuáticos (poríferos, cnidarios, crustáceos, anélidos y{'\n'}
                  equinodermos).
                </div>
                <div className="relative group">
                  <div className="absolute -inset-2 bg-[#A3D17C]/20 rounded-xl blur-lg group-hover:bg-[#A3D17C]/30 transition-colors duration-500"></div>
                  <img 
                    src="https://roboneo-public.meitudata.com/public/html_imgs/04m5netcf547wfg9/69d96b2eed042ee36vzalz6144.jpeg" 
                    alt="Composición de la Colección Zoológica" 
                    className="relative rounded-xl shadow-lg border-4 border-white w-full object-cover transform transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 relative z-10">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-[#508C46]">Objetivos</h2>
              <div className="w-16 h-1 bg-[#A3D17C] mx-auto mt-4 rounded-full"></div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* INVESTIGACIÓN */}
              <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all border-t-4 border-[#508C46]">
                <div className="flex items-center justify-center w-14 h-14 bg-green-100 rounded-full mb-6 text-[#508C46] mx-auto">
                  <Microscope size={28} />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4 text-center uppercase tracking-wide">INVESTIGACIÓN</h3>
                <p className="text-gray-600 text-sm leading-relaxed text-center">
                  Desarrollar y apoyar proyectos de<br/>
                  investigación, en colaboración con<br/>
                  docentes, estudiantes y profesionales de<br/>
                  diversas instituciones, relacionados con el<br/>
                  campo de la Zoología y áreas afines.
                </p>
              </div>

              {/* DOCENCIA */}
              <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all border-t-4 border-[#A3D17C]">
                <div className="flex items-center justify-center w-14 h-14 bg-green-100 rounded-full mb-6 text-[#508C46] mx-auto">
                  <GraduationCap size={28} />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4 text-center uppercase tracking-wide">DOCENCIA</h3>
                <p className="text-gray-600 text-sm leading-relaxed text-center">
                  Apoyar la docencia de diferentes<br/>
                  programas de pregrado de la Universidad<br/>
                  y de otras universidades regionales, y<br/>
                  llevar a cabo cursos, talleres y<br/>
                  capacitaciones sobre biodiversidad de<br/>
                  fauna.
                </p>
              </div>

              {/* DIVULGACIÓN */}
              <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all border-t-4 border-[#508C46]">
                <div className="flex items-center justify-center w-14 h-14 bg-green-100 rounded-full mb-6 text-[#508C46] mx-auto">
                  <Users size={28} />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4 text-center uppercase tracking-wide">DIVULGACIÓN</h3>
                <p className="text-gray-600 text-sm leading-relaxed text-center">
                  Implementar estrategias de divulgación e<br/>
                  intercambio de saberes, integrando<br/>
                  conocimiento científico y tradicional, para<br/>
                  potenciar la capacidad de gestión y<br/>
                  protección de la biodiversidad.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="grid lg:grid-cols-2 gap-12">
          <div className="relative group overflow-hidden rounded-2xl shadow-xl h-full min-h-[400px]">
            <img
              src="https://roboneo-public.meitudata.com/public/html_imgs/0dmdneu1fdo0n0at/69da5b4476c978mmpjkira7693.jpeg"
              alt="Belleza Incómoda"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-8 text-white w-full">
              <h3 className="text-3xl font-bold mb-2 tracking-wide">BELLEZA INCÓMODA</h3>
              <p className="text-gray-200 text-lg uppercase tracking-wider font-light">
                Los animales que no quieres ver
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-center">
             <div className="mb-6">
               <h3 className="text-2xl font-bold text-[#508C46] flex items-center mb-4">
                 <div className="w-10 h-10 rounded-full bg-[#508C46] text-white flex items-center justify-center mr-3 text-sm">
                   <BookOpen size={20} />
                 </div>
                 Nuestros Servicios
               </h3>
               <p className="text-gray-600 mb-6">
                 La CZUC offers una amplia gama de servicios académicos y técnicos para apoyar el desarrollo científico de la región:
               </p>
             </div>

             <div className="grid gap-4">
               {[
                 'Identificación taxonómica de especímenes',
                 'Depósito de material biológico de referencia',
                 'Atención a consultas de estudiantes e investigadores',
                 'Apoyo a proyectos de investigación y extensión',
                 'Realización de cursos, capacitaciones y talleres.'
               ].map((service, idx) => (
                 <div key={idx} className="flex items-center p-4 bg-gray-50 rounded-lg border-l-4 border-transparent hover:border-[#A3D17C] hover:bg-white hover:shadow-md transition-all group">
                   <div className="w-6 h-6 rounded-full bg-white border-2 border-[#A3D17C] flex items-center justify-center mr-4 group-hover:bg-[#508C46] group-hover:border-[#508C46] transition-colors flex-shrink-0">
                     <span className="w-2 h-2 rounded-full bg-[#508C46] group-hover:bg-white"></span>
                   </div>
                   <span className="text-gray-700 font-medium">{service}</span>
                 </div>
               ))}
             </div>
          </div>
        </section>

      </div>
    </div>
  )
}

// 7. Colección Etnográfica View Component
const EtnograficaView = ({ onBack, onNavigateToDesbaratado }: { onBack: () => void, onNavigateToDesbaratado: () => void }) => {
  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = 'Colección Etnográfica - IMUCOR'
  }, [])

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 bg-white">
      <div className="relative h-[400px] w-full overflow-hidden">
        <img
          src="https://roboneo-public.meitudata.com/public/html_imgs/0bmbn3xa98n68cug/69dcf7c03ac88hxaaa7hna7915.jpg"
          alt="Paisaje Natural Córdoba"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4 container mx-auto">
          <div className="flex items-center space-x-4 mb-4 text-[#A3D17C] opacity-90">
            <Users size={32} />
            <Globe size={32} />
            <Tent size={32} />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">Colección Etnográfica</h1>
          <p className="text-xl md:text-2xl text-gray-200 font-light max-w-3xl drop-shadow-md">
            Identidad, Memoria y Tradición del Caribe
          </p>
          <button
            onClick={onBack}
            className="absolute top-8 left-8 flex items-center text-white bg-white/20 hover:bg-white/30 px-4 py-2 rounded-full backdrop-blur-sm transition-all border border-white/30"
          >
            <ChevronLeft size={20} className="mr-1" />
            Inicio
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 max-w-6xl">
        <section className="mb-20">
          <div className="text-center max-w-4xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-[#508C46] mb-8 relative inline-block">
              Diversidad y Territorio
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-[#A3D17C] rounded-full"></span>
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div className="order-2 md:order-1">
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                La Colección Etnográfica de la Universidad de Córdoba (CEUC) tiene como misión salvaguardar, preservar, conservar, investigar y divulgar el patrimonio cultural material e inmaterial de la región Caribe, con énfasis en el de Córdoba. Asimismo, busca consolidarse como un espacio intercultural e interdisciplinario para la construcción colectiva de conocimiento, el diálogo con el territorio y el fortalecimiento de la Red de Museos de Saberes y Aprendizajes de la Universidad de Córdoba (MUSA-UC).
              </p>
            </div>
            <div className="order-1 md:order-2 relative group">
              <div className="absolute -inset-4 bg-[#A3D17C]/20 rounded-xl blur-lg group-hover:bg-[#A3D17C]/30 transition-colors"></div>
              <img
                src="https://roboneo-public.meitudata.com/public/html_imgs/05m5ndxfa046eawu/69dcfae0021633kdib75lm48.jpeg"
                alt="Espacio expositivo de la Colección Etnográfica"
                className="relative w-full rounded-2xl shadow-xl transform transition-transform duration-500 group-hover:scale-[1.02] border-4 border-white object-cover"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative group">
              <div className="absolute -inset-4 bg-[#A3D17C]/20 rounded-xl blur-lg group-hover:bg-[#A3D17C]/30 transition-colors"></div>
              <img
                src="https://roboneo-public.meitudata.com/public/html_imgs/05m5ndxfa046eawu/69dcfb2165616crtrav6ao6742.jpeg"
                alt="Actividad educativa de la Red de Museos"
                className="relative w-full rounded-2xl shadow-xl transform transition-transform duration-500 group-hover:scale-[1.02] border-4 border-white object-cover"
              />
            </div>
            <div>
              <p className="text-gray-700 text-lg leading-relaxed">
                La Red de Museos de Saberes y Aprendizajes de la Universidad de Córdoba (MUSA-UC) es el resultado de un esfuerzo colaborativo entre la Universidad de Córdoba, el Resguardo Indígena Zenú de San Andrés de Sotavento y cinco instituciones educativas de los municipios de San Andrés de Sotavento y Tuchín. Esta estrategia integra el patrimonio cultural, tanto material como inmaterial, de la cultura zenú en Córdoba.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-24 grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <div className="flex items-center mb-4">
              <div className="bg-green-100 p-3 rounded-full mr-4 text-[#508C46]">
                <Tent size={24} />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">Iniciativa Pedagógica</h3>
            </div>
            <p className="text-gray-700 mb-6 leading-relaxed">
              MUSA-UC se consolida como una iniciativa pedagógica, cultural y comunitaria, en la que se resguardan objetos donados y protegidos por las propias comunidades, garantizando su preservación y transmisión a las nuevas generaciones.
            </p>
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
               <p className="font-bold text-[#508C46] mb-4">Los museos que hacen parte de la estrategia MUSA-UC son:</p>
               <ul className="space-y-2 text-gray-700 mb-4">
                 <li>• I.E Alianza: Museo Cultural Aliancista MUCUALCE</li>
                 <li>• I.E Doribel Tarra: Museo el hilo de la vida</li>
                 <li>• I.E Patio Bonito Norte: Museo Jacinto Ortiz</li>
                 <li>• I.E Álvaro Ulcué Chocué: Centro de conocimiento sobre la cultura indígena Zenú</li>
                 <li>• I.E Cerro Vidales: Museo Blanco Estrada – Encanto Ancestral.</li>
               </ul>
               <p className="font-bold text-lg text-[#508C46] italic">Visítalos!!</p>
            </div>
          </div>
          <div className="order-1 md:order-2 relative group">
            <div className="absolute -inset-4 bg-[#A3D17C]/20 rounded-full blur-2xl group-hover:bg-[#A3D17C]/30 transition-colors"></div>
            <img
              src="https://roboneo-public.meitudata.com/public/html_imgs/09m1mc5b24q5b7zv/69a1be2ce10eboepusn2v69292.JPG"
              alt="Artefacto Etnográfico"
              className="relative w-full rounded-2xl shadow-2xl transform transition-transform duration-500 group-hover:scale-105 border-4 border-white object-cover aspect-[4/5]"
            />
            <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur p-3 rounded-lg shadow-lg max-w-[200px]">
              <p className="text-xs text-[#508C46] font-bold uppercase">Pieza de Colección</p>
              <p className="text-xs text-gray-600">Representación cultural de alto valor histórico.</p>
            </div>
          </div>
        </section>

        <section className="bg-green-50 rounded-3xl p-8 md:p-16 relative overflow-hidden mb-12">
          <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#508C46 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

          <div className="relative z-10 max-w-5xl mx-auto mb-12">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-[#508C46]">Objetivos</h2>
              <div className="w-16 h-1 bg-[#A3D17C] mx-auto mt-4 rounded-full"></div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all border-t-4 border-[#508C46]">
                <div className="flex items-center justify-center w-14 h-14 bg-green-100 rounded-full mb-6 text-[#508C46] mx-auto">
                  <Microscope size={28} />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4 text-center uppercase tracking-wide">INVESTIGACIÓN</h3>
                <p className="text-gray-600 text-sm leading-relaxed text-center">
                  Gestionar e implementar proyectos de investigación sociocultural que promuevan la salvaguarda y preservación de la cultura en todas sus expresiones y manifestaciones.
                </p>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all border-t-4 border-[#A3D17C]">
                <div className="flex items-center justify-center w-14 h-14 bg-green-100 rounded-full mb-6 text-[#508C46] mx-auto">
                  <GraduationCap size={28} />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4 text-center uppercase tracking-wide">DOCENCIA</h3>
                <p className="text-gray-600 text-sm leading-relaxed text-center">
                  Contribuir a la creación de escenarios de aprendizaje en las institutions educativas del territorio, en todos los niveles de educación, que faciliten la articulación del conocimiento con los saberes, haceres y sentires interculturales.
                </p>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all border-t-4 border-[#508C46]">
                <div className="flex items-center justify-center w-14 h-14 bg-green-100 rounded-full mb-6 text-[#508C46] mx-auto">
                  <Users size={28} />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4 text-center uppercase tracking-wide">EXTENSIÓN</h3>
                <p className="text-gray-600 text-sm leading-relaxed text-center">
                  Impulsar procesos de extensión comunitaria que promuevan el intercambio de saberes, la co-creación de estrategias pedagógicas para la educación propia y el fortalecimiento de la identidad cultural.
                </p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center relative z-10 mt-16 border-t border-green-200 pt-16">
            <div className="relative">
              <img
                src="https://roboneo-public.meitudata.com/public/html_imgs/04mdn4ycn0a5w3vi/69de3de45eb7asi4ps2ljo3084.jpeg"
                alt="Vida en el Río Sinú"
                className="rounded-xl shadow-lg border-4 border-white rotate-[-2deg] hover:rotate-0 transition-transform duration-500 w-full object-cover h-80"
              />
              <div className="absolute top-4 left-4 bg-[#508C46] text-white p-2 rounded-lg shadow-md">
                <Anchor size={20} />
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-[#508C46]">Nuestros compromisos con el territorio son:</h3>
              <ul className="space-y-4 text-gray-700 leading-relaxed">
                 <li className="flex items-start">
                    <span className="w-2 h-2 mt-2 bg-[#508C46] rounded-full mr-3 flex-shrink-0"></span>
                    <span>Apoyar la consolidación de la Estrategia: Museo de Aprendizajes y Saberes de la Universidad de Córdoba (MUSE-UC)</span>
                 </li>
                 <li className="flex items-start">
                    <span className="w-2 h-2 mt-2 bg-[#508C46] rounded-full mr-3 flex-shrink-0"></span>
                    <span>Crear alianzas con grupos étnicos y culturales para la gestión y el desarrollo de proyectos de investigación y extensión.</span>
                 </li>
                 <li className="flex items-start">
                    <span className="w-2 h-2 mt-2 bg-[#508C46] rounded-full mr-3 flex-shrink-0"></span>
                    <span>Implementar programas de educación continuada para el fortalecimiento de la labor museográfica</span>
                 </li>
                 <li className="flex items-start">
                    <span className="w-2 h-2 mt-2 bg-[#508C46] rounded-full mr-3 flex-shrink-0"></span>
                    <span>Salvaguardia y conservación del patrimonio cultural material e inmaterial.</span>
                 </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mt-20 pt-16 border-t border-gray-100">
          <div className="text-center mb-12">
            <span className="text-[#A3D17C] font-bold tracking-wider uppercase text-sm">Galería Cultural</span>
            <h2 className="text-3xl font-bold text-[#508C46] mt-2 uppercase">Nuestras Exposiciones</h2>
            <div className="w-24 h-1 bg-[#A3D17C] mx-auto mt-4 rounded-full"></div>
          </div>

          <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden border border-gray-50 flex flex-col md:flex-row items-center">
            <div className="w-full md:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center bg-gray-50/50">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-[#A3D17C]/20 rounded-full flex items-center justify-center text-[#508C46]">
                  <Users size={20} />
                </div>
                <span className="text-[#508C46] font-semibold tracking-wider text-sm uppercase">Cultura Zenú</span>
              </div>
              <h3 className="text-3xl md:text-4xl font-extrabold text-gray-800 leading-tight mb-6">
                MANOS QUE TRENZAN LOS SABERES, HACERES Y SENTIRES DE LA CULTURA ZENÚ.
              </h3>
              <p className="text-gray-600 leading-relaxed mb-8">
                Una exposición que honra la tradición artesanal y la sabiduría ancestral transmitida de generación en generación, donde cada tejido cuenta una historia de identidad y resistencia.
              </p>
              <button 
                onClick={onNavigateToDesbaratado}
                className="self-start px-6 py-3 bg-[#508C46] text-white font-semibold rounded-full hover:bg-[#3e6e36] transition-colors shadow-md hover:shadow-lg flex items-center group"
              >
                Explorar Exposición <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            
            <div className="w-full md:w-1/2 relative h-[400px] md:h-auto min-h-[500px]">
              <img 
                src="https://roboneo-public.meitudata.com/public/html_imgs/0cm9n2yfu0o320t3/69de6e09e6d39htgfd45wa3501.jpg" 
                alt="Arte Ancestral - Manos tejiendo" 
                className="absolute inset-0 w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-gray-50/50 to-transparent md:bg-gradient-to-l md:from-black/10"></div>
              <div className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg">
                <p className="text-xs font-bold text-[#508C46] uppercase">Arte Ancestral</p>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  )
}

// 7.1. Desbaratado View Component
const DesbaratadoView = ({ onBack }: { onBack: () => void }) => {
  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = 'Exposición: Desbaratado - IMUCOR'
  }, [])

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 bg-white min-h-screen flex flex-col">
      {/* Header Hero Area para la nueva vista */}
      <div className="relative h-[300px] md:h-[420px] w-full overflow-hidden bg-black/80">
        <img
          src={bannerSombrero}
          alt="Conoce la elaboración del sombrero vueltiao"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <button
          onClick={onBack}
          className="absolute top-8 left-8 flex items-center text-gray-800 bg-white/80 hover:bg-white px-5 py-2.5 rounded-full backdrop-blur-md transition-all shadow-md border border-gray-200 font-medium z-10 group"
        >
          <ChevronLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" />
          Volver a Colección Etnográfica
        </button>
      </div>

      {/* Contenido Principal */}
      <div className="container mx-auto px-4 py-16 max-w-5xl flex-grow">
        
        <section className="mb-20 bg-green-50/50 p-8 md:p-12 rounded-3xl border border-green-100/50 shadow-sm relative overflow-hidden">
          <Leaf className="absolute -top-10 -right-10 text-[#A3D17C]/10 w-48 h-48 rotate-45 pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
            {/* Texto a la izquierda */}
            <div className="flex-1 order-2 md:order-1">
              <p className="text-gray-700 text-xl leading-relaxed text-justify font-light mb-6">
                <span className="font-semibold text-[#508C46]">Actividad mediante la cual se elimina el follaje verde</span> o el exceso de la hoja, dejando únicamente la vena central o nervadura, con el fin de extraer la fibra necesaria para el proceso de trenzado. 
              </p>
              <div className="flex items-center justify-center my-6 opacity-50">
                <div className="h-px bg-gray-300 w-1/4"></div>
                <div className="mx-3 text-[#A3D17C]"><Leaf size={20} /></div>
                <div className="h-px bg-gray-300 w-1/4"></div>
              </div>
              <p className="text-gray-700 text-xl leading-relaxed text-justify">
                El desbaratado conocido como <em className="text-[#508C46] font-medium">desbaritao</em>, es un hacer zenú que se realiza en horas de la mañana o de la tarde, para evitar la exposición directa al sol, ya que puede afectar negativamente la calidad de la fibra.
              </p>
            </div>
            
            <div className="w-full md:w-5/12 order-1 md:order-2 flex justify-center">
              <div className="transform hover:scale-105 transition-transform duration-500 relative group max-w-sm w-full flex justify-center items-center">
                <img 
                  src="https://roboneo-public.meitudata.com/public/html_imgs/06mbncy8t1h4cdlb/69de64481090atw4kuvvel9217.png" 
                  alt="Iguana tejiendo sombrero vueltiao" 
                  className="w-full h-auto object-contain max-h-[300px]"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Galería de Imágenes Original */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-gray-800 flex items-center justify-center">
              <Users className="text-[#508C46] mr-3" size={28} /> El Proceso en Detalle
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {/* Imagen 1 */}
            <div className="group flex flex-col">
              <div className="overflow-hidden rounded-3xl shadow-lg border border-gray-100 aspect-[3/4] mb-6 relative">
                <img 
                  src="https://roboneo-public.meitudata.com/public/html_imgs/0cm4n8y7n3q4s34j/69de40a4dbd37sjs64d6u61164.jpg" 
                  alt="Selección de la hoja para el desbaratado" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-[#508C46] font-bold shadow-md z-10">1</div>
              </div>
              <div className="px-2 text-center md:text-left">
                <h4 className="text-xl font-bold text-[#508C46] mb-2">Selección</h4>
                <p className="text-gray-600">Identificación y recolección cuidadosa de la materia prima adecuada.</p>
              </div>
            </div>
            
            {/* Imagen 2 */}
            <div className="group flex flex-col md:translate-y-8">
              <div className="overflow-hidden rounded-3xl shadow-lg border border-gray-100 aspect-[3/4] mb-6 relative">
                <img 
                  src="https://roboneo-public.meitudata.com/public/html_imgs/0cm4n8y7n3q4s34j/69de40a4dbd404gfjtnmh23576.jpg" 
                  alt="Proceso manual de doblar la hoja" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-[#508C46] font-bold shadow-md z-10">2</div>
              </div>
              <div className="px-2 text-center md:text-left">
                <h4 className="text-xl font-bold text-[#508C46] mb-2">Manipulación</h4>
                <p className="text-gray-600">Proceso manual delicado para doblar y preparar la hoja antes de la extracción.</p>
              </div>
            </div>
            
            {/* Imagen 3 */}
            <div className="group flex flex-col">
              <div className="overflow-hidden rounded-3xl shadow-lg border border-gray-100 aspect-[3/4] mb-6 relative">
                <img 
                  src="https://roboneo-public.meitudata.com/public/html_imgs/0cm4n8y7n3q4s34j/69de40a4dbd48cd5jir4584887.jpg" 
                  alt="Extracción de la fibra central" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-[#508C46] font-bold shadow-md z-10">3</div>
              </div>
              <div className="px-2 text-center md:text-left">
                <h4 className="text-xl font-bold text-[#508C46] mb-2">Extracción</h4>
                <p className="text-gray-600">Separación precisa de la vena central para obtener la fibra lista para el trenzado.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-20 pt-16 border-t border-gray-200">
          
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Texto Raspado y Ripiao */}
            <div className="space-y-12">
              <div className="bg-white p-8 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border-l-4 border-[#508C46] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow">
                <h3 className="text-2xl font-bold text-[#508C46] mb-4 flex items-center">
                  <span className="bg-green-100 text-[#508C46] w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm">4</span>
                  Raspado de la fibra.
                </h3>
                <p className="text-gray-700 text-lg leading-relaxed">
                  El raspao o ripiao es otro de los haceres zenúes que forma parte de la elaboración del sombrero vueltiao. El artesano raspa la vena central o nervadura, retira la cutícula dura o "tripa" y continúa raspando hasta obtener una fibra de textura suave.
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border-l-4 border-[#A3D17C] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow">
                <h3 className="text-2xl font-bold text-[#508C46] mb-4 flex items-center">
                  <span className="bg-green-100 text-[#508C46] w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm">5</span>
                  Ripiado de la caña flecha:
                </h3>
                <p className="text-gray-700 text-lg leading-relaxed">
                  Esta fase, el hacer zenú se conecta con la habilidad, la experiencia y la destreza del artesano para ripiar y cortar la fibra en "pies", logrando así la finura y la calidad del tejido que se desea elaborar.
                </p>
              </div>
            </div>

            {/* Galería de Imágenes Nuevas - Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 rounded-2xl overflow-hidden shadow-lg h-64 relative group border-2 border-white">
                <img 
                  src="https://roboneo-public.meitudata.com/public/html_imgs/0fm0n5yco2n985r4/69de467f9b5d09xhxjo4q04291.jpg" 
                  alt="Manos manipulando fibras finas - Ripiao" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <p className="text-white font-medium drop-shadow-md">Precisión en la separación de fibras</p>
                </div>
              </div>
              <div className="rounded-2xl overflow-hidden shadow-lg h-48 relative group border-2 border-white">
                <img 
                  src="https://roboneo-public.meitudata.com/public/html_imgs/0fm0n5yco2n985r4/69de4670e63a08qdrw3ktl594.jpg" 
                  alt="Primer plano raspando la fibra" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <p className="text-white text-sm font-medium drop-shadow-md">Técnica de raspado</p>
                </div>
              </div>
              <div className="rounded-2xl overflow-hidden shadow-lg h-48 relative group border-2 border-white">
                <img 
                  src="https://roboneo-public.meitudata.com/public/html_imgs/0fm0n5yco2n985r4/69de467f9b5dagetu2s0q22413.jpg" 
                  alt="Afinando fibras finas con utensilio" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <p className="text-white text-sm font-medium drop-shadow-md">Logrando finura y calidad</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-20 pt-16 border-t border-gray-200">
          <div className="max-w-5xl mx-auto space-y-16">
            
            <div className="flex flex-col md:flex-row gap-8 items-center bg-white p-8 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border-l-4 border-[#A3D17C] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow">
              <div className="flex-1 order-2 md:order-1">
                <h3 className="text-2xl font-bold text-[#508C46] mb-4 flex items-center">
                  <span className="bg-green-100 text-[#508C46] w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm">6</span>
                  Macollos de caña flecha:
                </h3>
                <p className="text-gray-700 text-lg leading-relaxed">
                  La fibra, o “pies”, obtenida de la caña flecha se utiliza para hacer el trenzado con el que se elabora el sombrero vueltiao y otras artesanías.
                </p>
              </div>
              <div className="w-full md:w-1/3 order-1 md:order-2">
                <div className="rounded-xl overflow-hidden shadow-md group">
                  <img 
                    src="https://roboneo-public.meitudata.com/public/html_imgs/01mbncy5p9oe60yp/69de4d2aa634acm7uxq7up7836.jpg" 
                    alt="Macollos de caña flecha" 
                    className="w-full h-48 md:h-64 object-cover transform transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-8 items-center bg-white p-8 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border-l-4 border-[#508C46] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow">
              <div className="w-full md:w-1/3">
                <div className="rounded-xl overflow-hidden shadow-md group">
                  <img 
                    src="https://roboneo-public.meitudata.com/public/html_imgs/01mbncy5p9oe60yp/69de4d388b522ln8papky01837.jpg" 
                    alt="Hojas para el teñido de la caña" 
                    className="w-full h-48 md:h-64 object-cover transform transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-[#508C46] mb-4 flex items-center">
                  <span className="bg-green-100 text-[#508C46] w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm">7</span>
                  Teñido de la caña:
                </h3>
                <p className="text-gray-700 text-lg leading-relaxed mb-4">
                  Para teñir la fibra de la caña flecha se emplean plantas como el dividivi, la bija, la caña agria o el limoncillo. El color negro se obtiene al mezclar el barro con las hojas de bija, mientras que la caña agria se utiliza para blanquear la fibra. La armonía entre el blanco y negro, sin embargo, se logra gracias a los saberes y practices ancestrales vinculados a la espiritualidad y la cosmovisión de la cultura zenú.
                </p>
                <p className="text-gray-700 text-lg leading-relaxed">
                  La hoja de bija es un elemento clave en el teñido de la fibra de caña flecha. Históricamente, los zenúes la han utilizado para obtener un color negro brillante y natural, cocinando la fibra varias veces con estas hojas (cada ciclo dura de tres a cuatro horas) tras una inmersión inicial en barro. Además, al cocinarse con la palma blanca, la hoja de bija permite obtener un color rojo intenso, conocido como rojo bija.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-8 items-center bg-white p-8 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border-l-4 border-[#A3D17C] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow">
              <div className="flex-1 order-2 md:order-1">
                <h3 className="text-2xl font-bold text-[#508C46] mb-4 flex items-center">
                  <span className="bg-green-100 text-[#508C46] w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm">8</span>
                  Trenzando la caña flecha:
                </h3>
                <p className="text-gray-700 text-lg leading-relaxed">
                  La práctica ancestral del trenzado es generalmente realizada por la mujer zenú. Consiste en entrelazar manualmente la caña flecha, permitiendo que los pares de “pies” finos (cintas delgadas de la fibra) dialoguen entre sí para incorporar patrones simbólicos, conocidos como pintas, que dan forma a las distintas simbologías de la cultura zenú.
                </p>
              </div>
              <div className="w-full md:w-1/3 order-1 md:order-2">
                <div className="rounded-xl overflow-hidden shadow-md group">
                  <img 
                    src="https://roboneo-public.meitudata.com/public/html_imgs/01mbncy5p9oe60yp/69de4d4693d439dxq9ydix4182.jpg" 
                    alt="Trenzando la caña flecha" 
                    className="w-full h-48 md:h-64 object-cover transform transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-8 items-center bg-white p-8 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border-l-4 border-[#508C46] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow">
              <div className="w-full md:w-1/3">
                <div className="rounded-xl overflow-hidden shadow-md group">
                  <img 
                    src="https://roboneo-public.meitudata.com/public/html_imgs/05m0n8y7s753f1tg/69de5c406b8307qsb157w38705.jpg" 
                    alt="Aprendiendo a trenzar" 
                    className="w-full h-48 md:h-64 object-cover transform transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-[#508C46] mb-4 flex items-center">
                  <span className="bg-green-100 text-[#508C46] w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm">9</span>
                  Aprendiendo a trenzar
                </h3>
                <p className="text-gray-700 text-lg leading-relaxed">
                  El trenzado es uno de los saberes ancestrales que se transmiten de generación en generación. La educación familiar desempeña un papel fundamental en la preservación de la memoria cultural reflejada en el oficio de la tejeduría, el cual no solo constituye la principal fuente de sustento del pueblo zenú, sino que también representa un diálogo entre la madre, las hijas y la memoria de sus ancestros.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-8 bg-white p-8 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border-l-4 border-[#A3D17C] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow">
              <div>
                <h3 className="text-2xl font-bold text-[#508C46] mb-4 flex items-center">
                  <span className="bg-green-100 text-[#508C46] w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm">10</span>
                  Cosido o ensamblado del sombrero vueltiao
                </h3>
                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                  La práctica ancestral del cosido o ensamblado del sombrero vueltiao es realizada generalmente por el hombre zenú. El proceso comienza con la plantilla (base elaborada a mano) y continúa en espiral para formar primero la encopadura y, finalmente, el ala. La calidad del sombrero depende de una “buena pega” en cada vuelta, logrando uniones imperceptibles, y de un planchado cuidadoso que le confiere la flexibilidad característica.
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="rounded-xl overflow-hidden shadow-md group">
                  <img 
                    src="https://roboneo-public.meitudata.com/public/html_imgs/05m0n8y7s753f1tg/69de5c45cc118vj60by8cm9306.jpg" 
                    alt="Proceso de cosido del sombrero" 
                    className="w-full h-48 md:h-64 object-cover transform transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="rounded-xl overflow-hidden shadow-md group">
                  <img 
                    src="https://roboneo-public.meitudata.com/public/html_imgs/05m0n8y7s753f1tg/69de5c4a7c19evxjdkm6y86939.JPG" 
                    alt="Sombrero vueltiao terminado" 
                    className="w-full h-48 md:h-64 object-cover transform transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Footer actions de la vista */}
        <div className="flex justify-center mt-12 pt-12 border-t border-gray-100 pb-20">
          <button 
            onClick={onBack}
            className="px-8 py-4 bg-[#508C46] text-white font-bold rounded-full hover:bg-[#3e6e36] transition-all shadow-lg hover:shadow-xl flex items-center group transform hover:-translate-y-1"
          >
            <ChevronLeft className="mr-2 w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Regresar a la Colección Etnográfica
          </button>
        </div>

      </div>
    </div>
  )
}

// 8. Colección Música View Component
const MusicaView = ({ onBack }: { onBack: () => void }) => {
  const [showTooltip, setShowTooltip] = useState<string | null>(null)

  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = 'Colección Música - IMUCOR'
  }, [])

  const handleMascotClick = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault()
    const phrases = [
      '¡La música es vida!',
      'Disfruta de la melodía',
      'La música une corazones',
      'Siente el ritmo del Caribe',
      'Nuestra herencia sonora'
    ]
    const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)]
    setShowTooltip(randomPhrase)

    setTimeout(() => {
      setShowTooltip(null)
    }, 3000)
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 bg-white">
      <div className="relative h-[400px] w-full overflow-hidden">
        <img
          src="https://roboneo-public.meitudata.com/public/html_imgs/0dm7n6u0h6v7j4tw/69da695a58a08c22ylu4f97552.png"
          alt="Bailarinas Folclóricas"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-16 bg-white" style={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 10%, 0 100%)' }}></div>
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4 container mx-auto">
          <div className="flex items-center space-x-4 mb-4 text-[#A3D17C] animate-pulse">
            <Music size={40} />
            <MousePointer2 size={32} />
            <Radio size={32} />
          </div>
          {/* TEXTO MODIFICADO: Solo texto requerido y tamaño de fuente más pequeño (text-xl md:text-3xl lg:text-4xl en lugar de 3xl/5xl/6xl) */}
          <h1 className="text-xl md:text-3xl lg:text-4xl font-extrabold text-white mb-6 drop-shadow-2xl tracking-wide max-w-4xl leading-tight">
            COLECCIÓN COMPOSITORES REPRESENTATIVOS DEL DEPARTAMENTO DE CÓRDOBA UNIVERSIDAD DE CÓRDOBA
          </h1>
          <button
            onClick={onBack}
            className="absolute top-8 left-8 flex items-center text-white bg-white/20 hover:bg-white/30 px-4 py-2 rounded-full backdrop-blur-sm transition-all border border-white/30"
          >
            <ChevronLeft size={20} className="mr-1" />
            Inicio
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 max-w-6xl">
        <section className="mb-24 grid md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-4 flex justify-center relative">
            <div className="relative z-10 cursor-pointer" onClick={handleMascotClick} onTouchEnd={handleMascotClick}>
              <style>
                {`
                  @keyframes float {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                  }
                  .animate-float {
                    animation: float 4s ease-in-out infinite;
                  }
                `}
              </style>
              <img
                src="https://roboneo-public.meitudata.com/public/html_imgs/0dmdn2u4gdzfy8km/69da63bcdfa4aukqdg3g1e1402.png"
                alt="Guía Musical"
                className="w-full max-w-sm mx-auto object-contain drop-shadow-2xl animate-float hover:scale-105 transition-transform duration-300"
              />

              {showTooltip && (
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-white text-[#508C46] px-4 py-2 rounded-xl shadow-lg border-2 border-[#A3D17C] whitespace-nowrap z-20 animate-in fade-in zoom-in duration-300">
                  <p className="font-bold text-sm">{showTooltip}</p>
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-b-2 border-r-2 border-[#A3D17C] transform rotate-45"></div>
                </div>
              )}

              <div className="absolute top-0 right-10 bg-white text-[#508C46] p-3 rounded-full shadow-lg border-2 border-[#A3D17C] animate-bounce pointer-events-none">
                <Music size={24} />
              </div>
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-green-50 rounded-full -z-0"></div>
          </div>

          <div className="md:col-span-8 space-y-6">
            <div className="flex items-center space-x-2 text-[#508C46] font-semibold tracking-wider text-sm uppercase">
              <span className="w-8 h-0.5 bg-[#508C46]"></span>
              <span>Patrimonio Sonoro</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 leading-tight">
              Bienvenido a la coleccion musical.
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed text-justify">
              Poner a disposición a músicos, investigadores, educadores y al público en general el acceso a un espacio virtual destinado a la consulta y difusión del patrimonio musical del departamento de Córdoba.
            </p>
            <p className="text-gray-600 leading-relaxed text-justify">
              Esta colección está compuesta por textos con arreglos originales para banda de vientos a obras de los principales compositores del departamento de Córdoba.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <div className="flex items-center bg-green-50 px-4 py-2 rounded-lg text-[#508C46] font-medium">
                <FileText size={18} className="mr-2" /> Partituras PDF
              </div>
              <div className="flex items-center bg-green-50 px-4 py-2 rounded-lg text-[#508C46] font-medium">
                <CirclePlay size={18} className="mr-2" /> Audio MP3
              </div>
              <div className="flex items-center bg-green-50 px-4 py-2 rounded-lg text-[#508C46] font-medium">
                <Users size={18} className="mr-2" /> Biografías
              </div>
            </div>
          </div>
        </section>

        <section className="mb-20 bg-green-50 rounded-3xl p-8 md:p-16 relative overflow-hidden">
          <div className="relative z-10 max-w-5xl mx-auto mb-12">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-[#508C46]">Objetivos</h2>
              <div className="w-16 h-1 bg-[#A3D17C] mx-auto mt-4 rounded-full"></div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* INVESTIGACIÓN */}
              <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all border-t-4 border-[#508C46]">
                <div className="flex items-center justify-center w-14 h-14 bg-green-100 rounded-full mb-6 text-[#508C46] mx-auto">
                  <Microscope size={28} />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4 text-center uppercase tracking-wide">INVESTIGACIÓN</h3>
                <p className="text-gray-600 text-sm leading-relaxed text-center">
                  Diseñar y aplicar procesos de<br/>
                  investigación + creación basados en<br/>
                  la música regional, con el fin de<br/>
                  producir nuevos conocimientos.
                </p>
              </div>

              {/* DOCENCIA */}
              <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all border-t-4 border-[#A3D17C]">
                <div className="flex items-center justify-center w-14 h-14 bg-green-100 rounded-full mb-6 text-[#508C46] mx-auto">
                  <GraduationCap size={28} />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4 text-center uppercase tracking-wide">DOCENCIA</h3>
                <p className="text-gray-600 text-sm leading-relaxed text-center">
                  Fomentar la formación musical<br/>
                  mediada por el repertorio regional,<br/>
                  promoviendo el aprendizaje práctico,<br/>
                  la interpretación colectiva y el<br/>
                  desarrollo de habilidades técnicas<br/>
                  y creativas.
                </p>
              </div>

              {/* DIVULGACIÓN */}
              <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all border-t-4 border-[#508C46]">
                <div className="flex items-center justify-center w-14 h-14 bg-green-100 rounded-full mb-6 text-[#508C46] mx-auto">
                  <Users size={28} />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4 text-center uppercase tracking-wide">DIVULGACIÓN</h3>
                <p className="text-gray-600 text-sm leading-relaxed text-center">
                  Incrementar la visibilidad, acceso<br/>
                  y uso de la colección virtual de<br/>
                  partituras y textos musicales entre<br/>
                  investigadores, docentes, estudiantes,<br/>
                  intérpretes y público general,<br/>
                  posicionándola como un recurso de<br/>
                  referencia abierto y confiable.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="grid lg:grid-cols-2 gap-12 mb-24">
          <div className="relative group overflow-hidden rounded-2xl shadow-xl h-full min-h-[400px]">
            <img
              src="https://roboneo-public.meitudata.com/public/html_imgs/08mdm65e41a4v3v0/69a1c6a50babeh8t3sa5tb6265.JPG"
              alt="Niño escuchando música"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 border-4 border-white/20"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-8 text-white w-full">
              <h3 className="text-3xl font-bold mb-2 tracking-wide">CENTRO DE DOCUMENTACIÓN</h3>
              <p className="text-gray-200 text-lg uppercase tracking-wider font-light">
                "La música tradicional al alcance de las nuevas generaciones"
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-center">
             <div className="mb-6">
               <h3 className="text-2xl font-bold text-[#508C46] flex items-center mb-4">
                 <div className="w-10 h-10 rounded-full bg-[#508C46] text-white flex items-center justify-center mr-3 text-sm">
                   <BookOpen size={20} />
                 </div>
                 Nuestros Servicios
               </h3>
               <p className="text-gray-600 mb-6">
                 La colección ofrece una amplia gama de servicios académicos y técnicos para apoyar el desarrollo musical de la región:
               </p>
             </div>

             <div className="grid gap-4">
               {[
                 'Acceso a partituras y partes: descargas en PDF y partes individuales por instrumento y transposiciones listas para uso en banda de vientos (pelayera con saxofones)',
                 'Grabaciones de referencia: audios MP3',
                 'Catálogo curado por grados',
                 'Metadatos enriquecidos: instrumentación, duración, tonalidades, nivel técnico, temáticas, géneros (porro, fandango, cumbia, pasillo, bambuco fiestero), palabras clave y descriptores geográficos.'
               ].map((service, idx) => (
                 <div key={idx} className="flex items-start p-4 bg-gray-50 rounded-lg border-l-4 border-transparent hover:border-[#A3D17C] hover:bg-white hover:shadow-md transition-all group">
                   <div className="w-6 h-6 rounded-full bg-white border-2 border-[#A3D17C] flex items-center justify-center mr-4 mt-0.5 group-hover:bg-[#508C46] group-hover:border-[#508C46] transition-colors flex-shrink-0">
                     <span className="w-2 h-2 rounded-full bg-[#508C46] group-hover:bg-white"></span>
                   </div>
                   <span className="text-gray-700 font-medium leading-relaxed">{service}</span>
                 </div>
               ))}
             </div>
          </div>
        </section>

        <section className="text-center max-w-4xl mx-auto mb-16">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-[#508C46]">
            <Globe size={32} />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Proyección Global</h2>
          <p className="text-gray-600 text-lg leading-relaxed italic relative px-8">
            <span className="text-6xl text-[#A3D17C] absolute top-[-20px] left-0 opacity-30 font-serif">"</span>
            Deseamos ser un referente mundial y brindar una plataforma para que nuestra cultura musical trascienda el nivel local y se proyecte en distintos escenarios, tanto académicos como en la puesta en escena a través de conciertos.
            <span className="text-6xl text-[#A3D17C] absolute bottom-[-40px] right-0 opacity-30 font-serif">"</span>
          </p>
        </section>
      </div>
    </div>
  )
}

// 8.1. Contactos View Component (Nueva página separada)
const ContactosView = ({ onBack }: { onBack: () => void }) => {
  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = 'Contactos - IMUCOR'
  }, [])

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 bg-white min-h-screen flex flex-col">
      {/* Header Hero Area */}
      <div className="relative h-[250px] w-full overflow-hidden bg-[#508C46]">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4 container mx-auto">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4 backdrop-blur-sm border border-white/30">
            <Phone size={32} className="text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2 drop-shadow-md">Directorio de Contactos</h1>
          <p className="text-lg text-green-100 font-medium">Comunícate con nuestras diferentes colecciones</p>
        </div>
        
        <button
          onClick={onBack}
          className="absolute top-8 left-8 flex items-center text-white bg-black/20 hover:bg-black/40 px-4 py-2 rounded-full backdrop-blur-sm transition-all border border-white/20 z-10"
        >
          <ChevronLeft size={20} className="mr-1" />
          Volver al Inicio
        </button>
      </div>

      {/* Contenido Principal */}
      <div className="container mx-auto px-4 py-16 max-w-5xl flex-grow">
        
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 flex flex-col md:flex-row">
          {/* Información de Contactos */}
          <div className="w-full md:w-3/5 p-8 md:p-12">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                <Users className="text-[#508C46] mr-3" size={24} />
                Directores y Responsables
              </h2>
              <div className="w-16 h-1 bg-[#A3D17C] mt-3 rounded-full"></div>
            </div>

            <div className="space-y-8">
              {/* Herbario */}
              <div className="flex items-start group">
                <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-[#508C46] mr-4 flex-shrink-0 group-hover:bg-[#508C46] group-hover:text-white transition-colors">
                  <Leaf size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800">Herbario</h3>
                  <p className="text-gray-700 font-medium mt-1">MARTHA MOGOLLÓN ARISMENDY</p>
                  <p className="text-sm text-gray-500 mb-2">Directora Herbario HUC</p>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm">
                    <a href="mailto:herbario@correo.unicordoba.edu.co" className="flex items-center text-[#508C46] hover:underline">
                      <Mail size={14} className="mr-1" /> herbario@correo.unicordoba.edu.co
                    </a>
                    <a href="mailto:mmogollon@correo.unicordoba.edu.co" className="flex items-center text-[#508C46] hover:underline">
                      <Mail size={14} className="mr-1" /> mmogollon@correo.unicordoba.edu.co
                    </a>
                  </div>
                </div>
              </div>

              {/* Zoológica */}
              <div className="flex items-start group">
                <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-[#508C46] mr-4 flex-shrink-0 group-hover:bg-[#508C46] group-hover:text-white transition-colors">
                  <Bug size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800">Zoológica</h3>
                  <p className="text-gray-700 font-medium mt-1">Ana Mendez</p>
                  <p className="text-sm text-gray-500 mb-2">Responsable Colección Zoológica</p>
                  <div className="flex items-center text-sm text-gray-400 italic">
                    <Mail size={14} className="mr-1" /> [Espacio para correo]
                  </div>
                </div>
              </div>

              {/* Música */}
              <div className="flex items-start group">
                <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-[#508C46] mr-4 flex-shrink-0 group-hover:bg-[#508C46] group-hover:text-white transition-colors">
                  <Music size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800">Música</h3>
                  <p className="text-gray-700 font-medium mt-1">Julio Castillo</p>
                  <p className="text-sm text-gray-500 mb-2">Responsable Colección Musical</p>
                  <div className="flex items-center text-sm text-gray-400 italic">
                    <Mail size={14} className="mr-1" /> [Espacio para correo]
                  </div>
                </div>
              </div>

              {/* Etnográfica */}
              <div className="flex items-start group">
                <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-[#508C46] mr-4 flex-shrink-0 group-hover:bg-[#508C46] group-hover:text-white transition-colors">
                  <Tent size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800">Etnográfica</h3>
                  <p className="text-gray-700 font-medium mt-1">Nina Valencia</p>
                  <p className="text-sm text-gray-500 mb-2">Directora de Etnografía</p>
                  <a href="mailto:grupdes@correo.unicordoba.edu.co" className="flex items-center text-[#508C46] hover:underline text-sm">
                    <Mail size={14} className="mr-1" /> grupdes@correo.unicordoba.edu.co
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Imagen Decorativa */}
          <div className="w-full md:w-2/5 bg-green-50/50 p-8 flex items-center justify-center relative border-l border-gray-100">
            <div className="absolute inset-0 bg-gradient-to-br from-[#A3D17C]/10 to-transparent"></div>
            <div className="relative z-10 flex flex-col items-center">
              <div className="bg-white p-4 rounded-full shadow-lg mb-6 transform -rotate-6 hover:rotate-0 transition-transform duration-300">
                <img 
                  src="https://roboneo-public.meitudata.com/public/html_imgs/0am3n8y2vd853dzl/69de7198ebbacd23rnt5019875.png" 
                  alt="Mascota de Contacto Universidad de Córdoba" 
                  className="w-48 h-48 object-contain drop-shadow-md"
                />
              </div>
              <div className="bg-white px-6 py-4 rounded-xl shadow-md text-center border-t-4 border-[#508C46]">
                <p className="text-[#508C46] font-bold text-lg mb-1">¡Estamos a un clic!</p>
                <p className="text-sm text-gray-600">Contáctanos para resolver tus dudas o agendar una visita a nuestras colecciones.</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

// 9. Home View Component
interface HomeViewProps {
  onNavigate: (action: string) => void
}

const HomeView = ({ onNavigate }: HomeViewProps) => {
  useEffect(() => {
    document.title = 'IMUCOR - Instituto Museo Universidad de Córdoba'
  }, [])

  return (
    <>
      <HeroSlider onNavigate={onNavigate} />

      <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-[#A3D17C] font-bold tracking-wider uppercase text-sm">Nuestra Institución</span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#508C46] mt-2">Quienes Somos</h2>
            <div className="w-20 h-1 bg-[#A3D17C] mx-auto mt-4 rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="bg-green-50 p-6 rounded-xl border-l-4 border-[#508C46] hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-3">
                  <Leaf className="text-[#508C46] mr-3" />
                  <h3 className="text-xl font-bold text-gray-800">Misión</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  Somos una unidad académico-administrativa de la Universidad de Córdoba, dedicada a la preservación, investigación y divulgación del patrimonio biológico y cultural de la región. Fomentamos la apropiación social del conocimiento a través de nuestras colecciones y programas educativos.
                </p>
              </div>

              <div className="bg-green-50 p-6 rounded-xl border-l-4 border-[#A3D17C] hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-3">
                  <Search className="text-[#508C46] mr-3" />
                  <h3 className="text-xl font-bold text-gray-800">Visión</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  Consolidarnos como un referente nacional e internacional en la gestión de colecciones biológicas y museales, liderando procesos de conservación de la biodiversidad y el patrimonio cultural del Caribe colombiano, integrando la ciencia con la comunidad.
                </p>
              </div>
            </div>

            <div className="relative group rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://roboneo-public.meitudata.com/public/html_imgs/0bmbn3xa98n68cug/69dcf8172cfc6zd9zc38xm5088.jpg"
                alt="Instalaciones de la Universidad"
                className="w-full h-96 object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#508C46]/60 to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <p className="font-bold text-lg">​</p>
                <p className="text-sm opacity-90">Patrimonio de todos</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="social" className="py-20 bg-gray-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#A3D17C]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#508C46]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <span className="text-[#A3D17C] font-bold tracking-wider uppercase text-sm">Comunidad</span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#508C46] mt-2">Proyección Social</h2>
            <div className="w-20 h-1 bg-[#A3D17C] mx-auto mt-4 rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all p-8 text-center group border-t-4 border-transparent hover:border-[#508C46]">
              <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-[#508C46] transition-colors">
                <BookOpen className="w-8 h-8 text-[#508C46] group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Educación</h3>
              <p className="text-gray-600 mb-6">Talleres lúdicos y visitas guiadas para escuelas y colegios, fomentando el amor por la ciencia desde temprana edad.</p>
              <a href="#" className="text-[#508C46] font-semibold flex items-center justify-center hover:underline">
                Ver programas <ExternalLink className="w-4 h-4 ml-1" />
              </a>
            </div>

            <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all p-8 text-center group border-t-4 border-transparent hover:border-[#A3D17C]">
              <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-[#A3D17C] transition-colors">
                <MapPin className="w-8 h-8 text-[#508C46] group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Territorio</h3>
              <p className="text-gray-600 mb-6">Proyectos de conservación institucional. trabajando de la mano con comunidades locales y campesinas.</p>
              <a href="#" className="text-[#A3D17C] font-semibold flex items-center justify-center hover:underline">
                Nuestros proyectos <ExternalLink className="w-4 h-4 ml-1" />
              </a>
            </div>

            <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all p-8 text-center group border-t-4 border-transparent hover:border-[#508C46]">
              <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-[#508C46] transition-colors">
                <Calendar className="w-8 h-8 text-[#508C46] group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Eventos</h3>
              <p className="text-gray-600 mb-6">Participación en ferias de ciencia, seminarios ambientales y exposiciones itinerantes por todo el departamento.</p>
              <a href="#" className="text-[#508C46] font-semibold flex items-center justify-center hover:underline">
                Agenda cultural <ExternalLink className="w-4 h-4 ml-1" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Removed the old inline Contactos section from HomeView to use the new separated ContactosView */}
      
    </>
  )
}

// 10. Rio Sinu Timeline Component
interface RioSinuTimelineProps {
  onBack: () => void
}

const TIMELINE_IMAGES = [
  {
    url: 'https://roboneo-public.meitudata.com/public/html_imgs/0emamdjeofg380zy/69af372897c60hsd07z2r09823.png',
    character: 'https://roboneo-public.meitudata.com/public/html_imgs/05manar5x7n9t5c2/69d80c430694cwu0j7bm4v2314.png',
    showTitle: true,
    showNewImages: false,
    showThirdImages: false
  },
  {
    url: 'https://roboneo-public.meitudata.com/public/html_imgs/0emamdjeofg380zy/69af37425bfc59jv0mi3g92174.png',
    character: 'https://roboneo-public.meitudata.com/public/html_imgs/05manar5x7n9t5c2/69d80c430694cwu0j7bm4v2314.png',
    showTitle: false,
    showNewImages: true,
    showThirdImages: false
  },
  {
    url: 'https://roboneo-public.meitudata.com/public/html_imgs/0emamdjeofg380zy/69af374d58de0jgs2idisq1104.png',
    character: 'https://roboneo-public.meitudata.com/public/html_imgs/05manar5x7n9t5c2/69d80c430694cwu0j7bm4v2314.png',
    showTitle: false,
    showNewImages: false,
    showThirdImages: true // Adding the new cultural images to the THIRD section
  }
]

const RadioButton = ({ onClick, isPlaying }: { onClick: () => void, isPlaying: boolean }) => (
  <button
    onClick={onClick}
    className="group relative flex flex-col items-center justify-center bg-[#2C3E2D] p-4 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.5)] border-t-2 border-[#508C46] border-b-4 border-[#1A251B] transition-transform hover:-translate-y-1 active:translate-y-1 active:border-b-0 mt-8 cursor-pointer z-50 w-24 h-24"
    aria-label="Play Radio"
  >
    <div className="absolute -top-6 w-1 h-8 bg-gray-400 rounded-t-full shadow-inner transform rotate-12 right-6 group-hover:rotate-6 transition-transform"></div>
    <div className="absolute top-2 left-2 flex gap-1">
      <div className="w-1.5 h-1.5 bg-red-500 rounded-full shadow-[0_0_5px_rgba(239,68,68,0.8)]"></div>
      <div className={`w-1.5 h-1.5 bg-green-500 rounded-full shadow-[0_0_5px_rgba(34,197,94,0.8)] ${isPlaying ? 'animate-pulse' : 'opacity-50'}`}></div>
    </div>
    
    <div className="bg-[#1A251B] w-full h-8 rounded mb-2 overflow-hidden relative shadow-inner border border-gray-700 flex items-center justify-center">
      <div className="absolute inset-0 flex items-center px-1">
        <div className="w-full border-t border-gray-600/50"></div>
      </div>
      {isPlaying && (
        <div className="w-full flex justify-around items-center h-4 px-2 z-10 gap-0.5">
           <div className="w-1 bg-green-400 h-full animate-[ping_1s_ease-in-out_infinite]"></div>
           <div className="w-1 bg-green-400 h-1/2 animate-[ping_1.2s_ease-in-out_infinite]"></div>
           <div className="w-1 bg-green-400 h-3/4 animate-[ping_0.8s_ease-in-out_infinite]"></div>
           <div className="w-1 bg-green-400 h-full animate-[ping_1.5s_ease-in-out_infinite]"></div>
           <div className="w-1 bg-green-400 h-1/3 animate-[ping_0.9s_ease-in-out_infinite]"></div>
        </div>
      )}
    </div>
    
    <div className="flex w-full justify-between items-end">
      <div className="w-6 h-6 rounded-full bg-gray-300 shadow-[inset_0_-2px_4px_rgba(0,0,0,0.6)] flex items-center justify-center border-2 border-gray-400">
        <div className={`w-1 h-3 bg-gray-600 rounded-full transition-transform duration-300 ${isPlaying ? 'rotate-45' : '-rotate-45'}`}></div>
      </div>
      <div className="flex gap-1">
         <div className="w-2 h-4 bg-[#A3D17C] rounded shadow-inner"></div>
         <div className="w-2 h-4 bg-[#A3D17C] rounded shadow-inner"></div>
         <div className="w-2 h-4 bg-[#A3D17C] rounded shadow-inner"></div>
      </div>
    </div>
    <div className="mt-2 text-[10px] font-bold text-gray-400 tracking-wider font-mono">FM/AM</div>
  </button>
)

const RioSinuTimeline = ({ onBack }: RioSinuTimelineProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPlaying, setIsPlaying] = useState<Record<number, boolean>>({ 0: false, 1: false, 2: false })

  const handleScroll = useCallback(() => {
    if (containerRef.current) {
      const scrollY = containerRef.current.scrollTop
      const slideHeight = window.innerHeight
      const newSlide = Math.round(scrollY / slideHeight)
      if (newSlide !== currentSlide) {
        setCurrentSlide(newSlide)
      }
    }
  }, [currentSlide])

  useEffect(() => {
    const container = containerRef.current
    if (container) {
      container.addEventListener('scroll', handleScroll)
      return () => container.removeEventListener('scroll', handleScroll)
    }
  }, [handleScroll])

  useEffect(() => {
    document.title = 'Río Sinú: Hilos de Vida - IMUCOR'
  }, [])

  const scrollToSlide = (index: number) => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: index * window.innerHeight,
        behavior: 'smooth'
      })
    }
  }

  const handleRadioClick = (index: number) => {
    setIsPlaying(prev => ({
      ...prev,
      [index]: !prev[index]
    }))
    console.log(`Radio button ${index + 1} clicked!`)
  }

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-black text-white">
      <style>
        {`
          @keyframes float-slow {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-15px); }
          }
          @keyframes float-medium {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }
          @keyframes float-fast {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }
          .animate-float-1 { animation: float-slow 4s ease-in-out infinite; }
          .animate-float-2 { animation: float-medium 5s ease-in-out infinite 1s; }
          .animate-float-3 { animation: float-fast 3.5s ease-in-out infinite 0.5s; }
        `}
      </style>
      <div className="absolute top-0 left-0 w-full bg-gradient-to-b from-black/80 to-transparent p-6 z-30 flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center text-white bg-white/20 hover:bg-white/30 px-4 py-2 rounded-full backdrop-blur-sm transition-all border border-white/30"
        >
          <ChevronLeft size={20} className="mr-1" />
          Volver al Inicio
        </button>
        {/* Title hidden via CSS as requested */}
        <h1 className="text-xl md:text-3xl font-bold text-white drop-shadow-md hidden md:hidden">Navegando por nuestro Rio Sinú</h1>
        <div className="w-24"></div>
      </div>

      <div
        ref={containerRef}
        className="h-full w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth"
      >
        {TIMELINE_IMAGES.map((item, index) => (
          <div key={index} className="snap-start h-screen w-full flex items-center justify-center relative flex-shrink-0 overflow-hidden">
            <div className="absolute inset-0 z-0">
               <img
                src={item.url}
                alt={'Rio Sinu Image'}
                className="w-full h-full object-cover opacity-90 transition-transform duration-[10000ms] ease-linear scale-105 hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80"></div>
            </div>

            {item.showTitle && (
              <>
                {/* Title Removed as per request */}
                
                {/* Floating Rectangular Images - Only on First Section */}
                <div className={`absolute inset-0 z-20 pointer-events-none transition-opacity duration-1000 ${currentSlide === 0 ? 'opacity-100' : 'opacity-0'}`}>
                  {/* Rectangle 1 - Top Left 1 */}
                  <div className="absolute top-[15%] left-[5%] md:left-[10%] lg:left-[15%] animate-float-1 pointer-events-auto">
                    <div className="w-40 h-28 md:w-56 md:h-40 lg:w-64 lg:h-44 rounded-xl overflow-hidden border-4 border-white shadow-[0_10px_25px_rgba(0,0,0,0.5)] bg-black/20 backdrop-blur-sm group hover:scale-105 transition-transform duration-300">
                      <img 
                        src="https://roboneo-public.meitudata.com/public/html_imgs/07m7m9j5q0d6u0yu/69af43e7aa5f0qbty28fya199.JPG" 
                        alt="Flora acuática con flor lila" 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>
                  </div>

                  {/* Rectangle 2 - Top Left 2 (Slightly offset from Rectangle 1) */}
                  <div className="absolute top-[10%] left-[35%] md:left-[35%] lg:left-[35%] animate-float-2 pointer-events-auto hidden sm:block">
                    <div className="w-36 h-24 md:w-48 md:h-32 lg:w-56 lg:h-40 rounded-xl overflow-hidden border-4 border-white shadow-[0_10px_25px_rgba(0,0,0,0.5)] bg-black/20 backdrop-blur-sm group hover:scale-105 transition-transform duration-300">
                      <img 
                        src="https://roboneo-public.meitudata.com/public/html_imgs/07m7m9j5q0d6u0yu/69af43e7aa5fbtg6wg05il2499.JPG" 
                        alt="Superficie del río" 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>
                  </div>

                  {/* Rectangle 3 - Bottom Left */}
                  <div className="absolute bottom-[20%] left-[5%] md:left-[10%] lg:left-[15%] animate-float-3 pointer-events-auto">
                    <div className="w-32 h-24 md:w-44 md:h-32 lg:w-52 lg:h-40 rounded-xl overflow-hidden border-4 border-white shadow-[0_10px_25px_rgba(0,0,0,0.5)] bg-black/20 backdrop-blur-sm group hover:scale-105 transition-transform duration-300">
                      <img 
                        src="https://roboneo-public.meitudata.com/public/html_imgs/07m7m9j5q0d6u0yu/69af43e7aa608ee91zzees9468.JPG" 
                        alt="Raíces y vegetación" 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Floating Images for the Second Section */}
            {item.showNewImages && (
               <div className={`absolute inset-0 z-20 pointer-events-none transition-opacity duration-1000 ${currentSlide === 1 ? 'opacity-100' : 'opacity-0'} flex justify-end items-center pr-[10%] lg:pr-[15%]`}>
                 <div className="flex flex-col items-center gap-6 md:gap-8 pointer-events-auto max-w-[50vw]">
                    {/* Top Row: Two images */}
                    <div className="flex flex-row justify-center items-center gap-4 md:gap-8 w-full">
                       {/* Top Left Image */}
                       <div className="animate-float-1">
                         <div className="w-28 h-20 sm:w-40 sm:h-28 md:w-52 md:h-36 lg:w-60 lg:h-44 rounded-[12px] overflow-hidden shadow-[0_8px_20px_rgba(0,0,0,0.4)] bg-white/10 backdrop-blur-sm group hover:scale-105 transition-transform duration-300 border border-white/20">
                           <img 
                             src="https://roboneo-public.meitudata.com/public/html_imgs/07m8mcl71815dayz/69b07613de425n6ianhf4m2927.jpeg" 
                             alt="Humedal y vegetación" 
                             className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                           />
                         </div>
                       </div>
                       {/* Top Right Image */}
                       <div className="animate-float-2">
                         <div className="w-28 h-20 sm:w-40 sm:h-28 md:w-52 md:h-36 lg:w-60 lg:h-44 rounded-[12px] overflow-hidden shadow-[0_8px_20px_rgba(0,0,0,0.4)] bg-white/10 backdrop-blur-sm group hover:scale-105 transition-transform duration-300 border border-white/20">
                           <img 
                             src="https://roboneo-public.meitudata.com/public/html_imgs/07m8mcl71815dayz/69b07613de42ebd8ltexc4140.jpeg" 
                             alt="Vegetación de ribera" 
                             className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                           />
                         </div>
                       </div>
                    </div>
                    {/* Bottom Row: One image centered */}
                    <div className="animate-float-3 flex justify-center w-full">
                       <div className="w-36 h-24 sm:w-48 sm:h-32 md:w-64 md:h-40 lg:w-72 lg:h-48 rounded-[12px] overflow-hidden shadow-[0_8px_20px_rgba(0,0,0,0.4)] bg-white/10 backdrop-blur-sm group hover:scale-105 transition-transform duration-300 border border-white/20">
                         <img 
                           src="https://roboneo-public.meitudata.com/public/html_imgs/07m8mcl71815dayz/69b07613de41fugkv04l0z8393.jpeg" 
                           alt="Paisaje del río" 
                           className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                         />
                       </div>
                    </div>
                 </div>
               </div>
            )}

            {/* LATEST ADDITION: Floating Images for the Third Section */}
            {item.showThirdImages && (
               <div className={`absolute inset-0 z-20 pointer-events-none transition-opacity duration-1000 ${currentSlide === 2 ? 'opacity-100' : 'opacity-0'} flex justify-end items-center pr-[5%] md:pr-[10%] lg:pr-[15%]`}>
                 <div className="flex flex-col items-center gap-6 md:gap-8 pointer-events-auto max-w-[60vw] md:max-w-[50vw]">
                    {/* Top Row: Two images */}
                    <div className="flex flex-row justify-center items-center gap-4 md:gap-8 w-full">
                       {/* Top Left Image */}
                       <div className="animate-float-1">
                         <div className="w-28 h-28 sm:w-36 sm:h-36 md:w-48 md:h-48 lg:w-56 lg:h-56 rounded-[12px] overflow-hidden shadow-[0_8px_20px_rgba(0,0,0,0.4)] bg-white/10 backdrop-blur-sm group hover:scale-105 transition-transform duration-300 border border-white/20">
                           <img 
                             src="https://roboneo-public.meitudata.com/public/html_imgs/0fmbm5l418e28d8o/69b0788d112731x39t5t2l3186.JPG" 
                             alt="Sombrero artesanal" 
                             className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                           />
                         </div>
                       </div>
                       {/* Top Right Image */}
                       <div className="animate-float-2">
                         <div className="w-32 h-24 sm:w-44 sm:h-32 md:w-56 md:h-40 lg:w-64 lg:h-48 rounded-[12px] overflow-hidden shadow-[0_8px_20px_rgba(0,0,0,0.4)] bg-white/10 backdrop-blur-sm group hover:scale-105 transition-transform duration-300 border border-white/20">
                           <img 
                             src="https://roboneo-public.meitudata.com/public/html_imgs/0fmbm5l418e28d8o/69b0788d1127dwku0tn8dk7380.JPG" 
                             alt="Exhibición cultural" 
                             className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                           />
                         </div>
                       </div>
                    </div>
                    {/* Bottom Row: One image centered */}
                    <div className="animate-float-3 flex justify-center w-full">
                       <div className="w-28 h-36 sm:w-36 sm:h-48 md:w-44 md:h-56 lg:w-52 lg:h-64 rounded-[12px] overflow-hidden shadow-[0_8px_20px_rgba(0,0,0,0.4)] bg-white/10 backdrop-blur-sm group hover:scale-105 transition-transform duration-300 border border-white/20">
                         <img 
                           src="https://roboneo-public.meitudata.com/public/html_imgs/0fmbm5l418e28d8o/69b0788d11286dvur53bab2093.JPG" 
                           alt="Figura cerámica arqueológica" 
                           className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                         />
                       </div>
                    </div>
                 </div>
               </div>
            )}

            <div className={`absolute z-10 w-full h-full pointer-events-none flex items-end 
              ${index === 0 ? 'justify-end pr-4 md:pr-20 pb-0' : ''}
              ${index === 1 ? 'justify-start pl-4 md:pl-20 pb-0' : ''}
              ${index === 2 ? 'justify-start pl-4 md:pl-20 pb-0' : ''}
            `}>
              <div className={`transition-all duration-1000 transform 
                ${currentSlide === index ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-20 scale-95'}
              `}>
                 <img 
                   src={item.character} 
                   alt="Exploradora del Río" 
                   className={`
                     drop-shadow-2xl object-contain filter brightness-90 contrast-110
                     ${index === 0 ? 'h-[40vh] md:h-[60vh] lg:h-[70vh] origin-bottom-right' : ''}
                     ${index === 1 ? 'h-[45vh] md:h-[65vh] lg:h-[75vh] origin-bottom-left' : ''}
                     ${index === 2 ? 'h-[50vh] md:h-[70vh] lg:h-[80vh] origin-bottom-left' : ''}
                   `}
                 />
              </div>
            </div>

            <div className={`relative z-20 w-full h-full flex flex-col justify-center items-center pointer-events-none`}>
              <div className={`transition-all duration-1000 delay-300 transform pointer-events-auto mt-auto mb-20 md:mb-32
                 ${currentSlide === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
              `}>
                <RadioButton onClick={() => handleRadioClick(index)} isPlaying={isPlaying[index] || false} />
              </div>
            </div>

          </div>
        ))}
      </div>

      <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col space-y-4 z-40">
        {TIMELINE_IMAGES.map((_, index) => (
          <div key={index} className="group relative flex items-center justify-end">
            <span className={`absolute right-8 bg-black/50 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap mr-2 pointer-events-none`}>
              {index === 0 ? 'Inicio' : index === 1 ? 'Interacción' : 'Música y Archivos'}
            </span>
            <button
              onClick={() => scrollToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-500 border-2 border-white shadow-lg
                ${index === currentSlide ? 'bg-[#A3D17C] scale-150 border-[#A3D17C]' : 'bg-transparent hover:bg-white'}
              `}
              aria-label={`Go to slide ${index + 1}`}
            />
          </div>
        ))}
      </div>
      
      <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center transition-opacity duration-500 ${currentSlide === 2 ? 'opacity-0' : 'opacity-70'}`}>
        <span className="text-xs uppercase tracking-widest mb-2 font-light">Desliza</span>
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center p-1">
          <div className="w-1 h-2 bg-white rounded-full animate-bounce"></div>
        </div>
      </div>
    </div>
  )
}

// --- Main App Component ---

function ImucApp() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [currentView, setCurrentView] = useState<'home' | 'herbario' | 'zoologica' | 'etnografica' | 'musica' | 'riosinutimeline' | 'desbaratado' | 'contactos'>('home')
  const [isSourceModalOpen, setIsSourceModalOpen] = useState(false)

  // Document Title Effect is handled in each view component for better encapsulation. 
  // A fallback is added here for the default state or unexpected transitions.
  useEffect(() => {
    if(currentView === 'home') document.title = 'IMUCOR - Instituto Museo Universidad de Córdoba'
  }, [currentView])

  const handleNavigation = (action: string, target?: string) => {
    setIsMobileMenuOpen(false)

    if (action === 'herbario') setCurrentView('herbario')
    else if (action === 'zoologica') setCurrentView('zoologica')
    else if (action === 'etnografica') setCurrentView('etnografica')
    else if (action === 'musica') setCurrentView('musica')
    else if (action === 'riosinutimeline') setCurrentView('riosinutimeline')
    else if (action === 'desbaratado') setCurrentView('desbaratado')
    else if (action === 'contactos') setCurrentView('contactos')
    else if (action === 'home') setCurrentView('home')
    else if (action === 'scroll' && target) {
      if (currentView !== 'home') {
        setCurrentView('home')
        setTimeout(() => {
          document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' })
        }, 100)
      } else {
        document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' })
      }
    } else {
      if (target) window.location.href = target
    }
    
    if (action !== 'scroll') window.scrollTo(0, 0)
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800 flex flex-col">
      <button
        onClick={() => setIsSourceModalOpen(true)}
        className="fixed bottom-6 left-6 z-50 bg-[#508C46] text-white p-3 rounded-full shadow-lg hover:bg-[#3e6e36] transition-all flex items-center gap-2 pr-4 group animate-in slide-in-from-left-4 duration-1000"
        title="Download Source Code"
      >
        <div className="bg-white/20 p-1 rounded-full">
           <Download size={20} className="animate-bounce" />
        </div>
        <span className="font-bold text-sm hidden group-hover:inline-block">Get Source Code</span>
      </button>

      <SourceCodeModal isOpen={isSourceModalOpen} onClose={() => setIsSourceModalOpen(false)} />

      <header className={`bg-white shadow-md sticky top-0 z-40 ${currentView === 'riosinutimeline' ? 'hidden' : ''}`}>
        <div className="container mx-auto px-4 h-24 flex items-center justify-between">
          <div className="flex-shrink-0 cursor-pointer" onClick={() => handleNavigation('home')}>
            <img
              src={logoUnicor}
              alt="Universidad de Córdoba Logo"
              className="h-14 md:h-16 object-contain"
            />
          </div>

          <nav className="hidden lg:flex items-center space-x-1">
            {NAV_ITEMS.map((item, index) => (
              <NavItem key={index} item={item} onNavigate={handleNavigation} />
            ))}
          </nav>

          <div className="hidden md:block flex-shrink-0 cursor-pointer" onClick={() => handleNavigation('home')}>
            <img
              src={logoImuc}
              alt="IMUC Logo"
              className="h-14 md:h-16 object-contain"
            />
          </div>

          <button
            className="lg:hidden p-2 text-[#508C46]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        <div className={`lg:hidden bg-white border-t border-gray-100 overflow-hidden transition-all duration-300 ${isMobileMenuOpen ? 'max-h-screen py-4' : 'max-h-0'}`}>
          <div className="container mx-auto px-4 flex flex-col space-y-1">
            {NAV_ITEMS.map((item, index) => (
              <NavItem key={index} item={item} isMobile={true} onNavigate={handleNavigation} />
            ))}
            <div className="pt-4 flex justify-center md:hidden">
              <img src={logoUnicor} alt="UniCórdoba" className="h-14 object-contain" />
            </div>
          </div>
        </div>
      </header>

      <main className="relative flex-grow">
        {currentView === 'home' && <HomeView onNavigate={handleNavigation} />}
        {currentView === 'herbario' && <HerbarioView onBack={() => handleNavigation('home')} />}
        {currentView === 'zoologica' && <ZoologicaView onBack={() => handleNavigation('home')} />}
        {currentView === 'etnografica' && <EtnograficaView onBack={() => handleNavigation('home')} onNavigateToDesbaratado={() => handleNavigation('desbaratado')} />}
        {currentView === 'desbaratado' && <DesbaratadoView onBack={() => handleNavigation('etnografica')} />}
        {currentView === 'musica' && <MusicaView onBack={() => handleNavigation('home')} />}
        {currentView === 'riosinutimeline' && <RioSinuTimeline onBack={() => handleNavigation('home')} />}
        {currentView === 'contactos' && <ContactosView onBack={() => handleNavigation('home')} />}

        {currentView !== 'riosinutimeline' && currentView !== 'desbaratado' && <GuideMascot />}
      </main>

      <footer className={`bg-[#508C46] text-white mt-auto ${currentView === 'riosinutimeline' ? 'hidden' : ''}`}>
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-1">
              <div className="bg-white p-2 rounded-lg inline-block mb-4">
                <img src={logoImucFooter} alt="IMUC - Instituto Museo Universidad de Córdoba" className="h-16 object-contain" />
              </div>
              <p className="text-sm opacity-90 leading-relaxed">
                Instituto Museo de la Universidad de Córdoba. Comprometidos con la biodiversidad y la cultura del Caribe.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-4 border-b border-[#A3D17C] pb-2 inline-block">Contacto</h4>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start">
                  <MapPin className="w-5 h-5 mr-2 text-[#A3D17C] flex-shrink-0" />
                  <span>Carrera 6 No. 76-103, Montería, Córdoba, Colombia</span>
                </li>
                <li className="flex items-center">
                  <Phone className="w-5 h-5 mr-2 text-[#A3D17C] flex-shrink-0" />
                  <span>+57 (4) 786 0300</span>
                </li>
                <li className="flex items-center">
                  <Mail className="w-5 h-5 mr-2 text-[#A3D17C] flex-shrink-0" />
                  <span>museo@unicordoba.edu.co</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-4 border-b border-[#A3D17C] pb-2 inline-block">Enlaces Rápidos</h4>
              <ul className="space-y-2 text-sm">
                <li><button onClick={() => handleNavigation('home')} className="hover:text-[#A3D17C] transition-colors">Inicio</button></li>
                <li><a href="#" className="hover:text-[#A3D17C] transition-colors">Sistema de Bibliotecas</a></li>
                <li><a href="#" className="hover:text-[#A3D17C] transition-colors">Admisiones</a></li>
                <li><a href="#" className="hover:text-[#A3D17C] transition-colors">Investigación</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-4 border-b border-[#A3D17C] pb-2 inline-block">Síguenos</h4>
              <div className="flex space-x-4 mb-6">
                <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-[#A3D17C] hover:text-white transition-all">
                  <Facebook size={20} />
                </a>
                <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-[#A3D17C] hover:text-white transition-all">
                  <Instagram size={20} />
                </a>
                <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-[#A3D17C] hover:text-white transition-all">
                  <Twitter size={20} />
                </a>
              </div>
              <p className="text-xs opacity-75">
                © {new Date().getFullYear()} Universidad de Córdoba. Todos los derechos reservados.
              </p>
            </div>
          </div>
        </div>
        <div className="bg-[#3e6e36] py-4 text-center text-xs opacity-80 px-4">
          <p>Vigilada Mineducación | Diseño Demo para propósitos ilustrativos</p>
        </div>
      </footer>
    </div>
  )
}

export default ImucApp