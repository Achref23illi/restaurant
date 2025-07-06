import { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslation } from 'react-i18next';

gsap.registerPlugin(ScrollTrigger);

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  title: string;
  description: string;
  year?: string;
}

export default function Gallery() {
  const { t } = useTranslation();
  const galleryRef = useRef<HTMLDivElement>(null);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Données de la galerie - photos réelles du restaurant
  const galleryImages: GalleryImage[] = [
    {
      id: 1,
      src: '/resturant/IMG_2084.JPG',
      alt: 'L\'extérieur du restaurant',
      title: t('gallery.founding.title'),
      description: t('gallery.founding.description'),
      year: '1985'
    },
    {
      id: 2,
      src: '/resturant/IMG_2090.JPG',
      alt: 'L\'intérieur du restaurant',
      title: t('gallery.tradition.title'),
      description: t('gallery.tradition.description'),
      year: '1990'
    },
    {
      id: 3,
      src: '/resturant/IMG_2095.JPG',
      alt: 'Nos spécialités culinaires',
      title: t('gallery.specialties.title'),
      description: t('gallery.specialties.description'),
      year: '1995'
    },
    {
      id: 4,
      src: '/resturant/IMG_2100.JPG',
      alt: 'L\'équipe en cuisine',
      title: t('gallery.expansion.title'),
      description: t('gallery.expansion.description'),
      year: '2000'
    },
    {
      id: 5,
      src: '/resturant/IMG_2105.JPG',
      alt: 'Nos plats signature',
      title: t('gallery.fusion.title'),
      description: t('gallery.fusion.description'),
      year: '2005'
    },
    {
      id: 6,
      src: '/resturant/IMG_2110.JPG',
      alt: 'L\'ambiance chaleureuse',
      title: t('gallery.recognition.title'),
      description: t('gallery.recognition.description'),
      year: '2010'
    },
    {
      id: 7,
      src: '/resturant/WhatsApp Image 2025-07-04 at 16.20.18_6435be57.jpg',
      alt: 'Moments de convivialité',
      title: t('gallery.innovation.title'),
      description: t('gallery.innovation.description'),
      year: '2015'
    },
    {
      id: 8,
      src: '/resturant/WhatsApp Image 2025-07-04 at 16.23.19_297f71b0.jpg',
      alt: 'Notre restaurant aujourd\'hui',
      title: t('gallery.today.title'),
      description: t('gallery.today.description'),
      year: '2024'
    },
    {
      id: 9,
      src: '/resturant/IMG_2088.JPG',
      alt: 'Détails de nos plats',
      title: 'Raffinement culinaire',
      description: 'Chaque plat est préparé avec soin et attention aux détails',
      year: '2020'
    },
    {
      id: 10,
      src: '/resturant/IMG_2092.JPG',
      alt: 'L\'art de la présentation',
      title: 'Présentation artistique',
      description: 'Nos chefs accordent une attention particulière à la présentation',
      year: '2021'
    },
    {
      id: 11,
      src: '/resturant/WhatsApp Image 2025-07-04 at 16.20.26_8f1efdd7.jpg',
      alt: 'Ambiance familiale',
      title: 'Esprit familial',
      description: 'Un lieu où les familles se rassemblent autour de bons plats',
      year: '2022'
    },
    {
      id: 12,
      src: '/resturant/IMG_2113.JPG',
      alt: 'Excellence culinaire',
      title: 'Excellence continue',
      description: 'Notre engagement pour l\'excellence ne faiblit jamais',
      year: '2023'
    }
  ];

  useGSAP(() => {
    // Animation d'entrée pour chaque image
    const images = galleryRef.current?.querySelectorAll('.gallery-item');
    if (images) {
      gsap.fromTo(images,
        { opacity: 0, y: 50, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.2,
          scrollTrigger: {
            trigger: galleryRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }

    // Animation du titre
    const title = galleryRef.current?.querySelector('.gallery-title');
    if (title) {
      gsap.fromTo(title,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: galleryRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }

    // Animation de la description
    const subtitle = galleryRef.current?.querySelector('.gallery-subtitle');
    if (subtitle) {
      gsap.fromTo(subtitle,
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power3.out",
          delay: 0.3,
          scrollTrigger: {
            trigger: galleryRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }
  }, []);

  const openModal = (image: GalleryImage) => {
    setSelectedImage(image);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
    document.body.style.overflow = 'unset';
  };

  return (
    <section id="gallery" ref={galleryRef} className="py-20 px-6" style={{ backgroundColor: '#F8F4F0' }}>
      <div className="max-w-7xl mx-auto">
        {/* En-tête */}
        <div className="text-center mb-16">
          <h2 className="gallery-title text-5xl lg:text-6xl font-bold mb-6" style={{ color: '#8B4513' }}>
            {t('gallery.title')}
          </h2>
          <p className="gallery-subtitle text-xl text-gray-700 max-w-3xl mx-auto">
            {t('gallery.subtitle')}
          </p>
        </div>

        {/* Grille de la galerie */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {galleryImages.map((image, index) => (
            <div
              key={image.id}
              className="gallery-item group cursor-pointer"
              onClick={() => openModal(image)}
            >
              <div className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                {/* Overlay avec informations */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <div className="text-sm font-semibold text-yellow-300 mb-2">
                      {image.year}
                    </div>
                    <h3 className="text-lg font-bold mb-2">{image.title}</h3>
                    <p className="text-sm opacity-90 line-clamp-2">{image.description}</p>
                  </div>
                </div>

                {/* Indicateur de clic */}
                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Ligne du temps */}
        <div className="mt-16">
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-yellow-400 to-orange-500"></div>
            <div className="space-y-8">
              {galleryImages.map((image, index) => (
                <div key={image.id} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className="w-1/2 px-8">
                    <div className={`bg-white p-6 rounded-2xl shadow-lg ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                      <div className="text-2xl font-bold text-yellow-600 mb-2">{image.year}</div>
                      <h3 className="text-xl font-bold mb-3" style={{ color: '#8B4513' }}>{image.title}</h3>
                      <p className="text-gray-700">{image.description}</p>
                    </div>
                  </div>
                  <div className="w-8 h-8 bg-yellow-400 rounded-full border-4 border-white shadow-lg relative z-10"></div>
                  <div className="w-1/2 px-8">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-48 object-cover rounded-2xl shadow-lg cursor-pointer hover:scale-105 transition-transform duration-300"
                      onClick={() => openModal(image)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal pour afficher l'image en grand */}
      {isModalOpen && selectedImage && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full max-h-full overflow-auto">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-white hover:text-yellow-400 transition-colors duration-300 z-10"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div className="bg-white rounded-2xl overflow-hidden">
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="w-full h-96 object-cover"
              />
              <div className="p-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold" style={{ color: '#8B4513' }}>
                    {selectedImage.title}
                  </h3>
                  {selectedImage.year && (
                    <span className="text-lg font-semibold text-yellow-600">
                      {selectedImage.year}
                    </span>
                  )}
                </div>
                <p className="text-gray-700 text-lg leading-relaxed">
                  {selectedImage.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
} 