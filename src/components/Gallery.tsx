'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

type GalleryImage = {
  id: number;
  src: string;
  alt: string;
  category: string;
  _debug?: {
    fullPath: string;
    baseUrl: string | undefined;
    path: string;
  };
};

// Base path for gallery images
const GALLERY_IMAGE_PATH = '/images/gallery/';

// Define gallery images with local paths
const galleryImages: GalleryImage[] = [
  { 
    id: 1, 
    src: GALLERY_IMAGE_PATH + 'villa-exterior.jpg', 
    alt: 'Villa Exterior', 
    category: 'villas' 
  },
  { 
    id: 2, 
    src: GALLERY_IMAGE_PATH + 'bedroom.jpg', 
    alt: 'Luxury Bedroom', 
    category: 'rooms' 
  },
  { 
    id: 3, 
    src: GALLERY_IMAGE_PATH + 'swimming-pool.jpg', 
    alt: 'Swimming Pool', 
    category: 'amenities' 
  },
  { 
    id: 4, 
    src: GALLERY_IMAGE_PATH + 'bathroom.jpg', 
    alt: 'Bathroom Interior', 
    category: 'rooms' 
  },
  { 
    id: 5, 
    src: GALLERY_IMAGE_PATH + 'dinning.jpg', 
    alt: 'Dining Area', 
    category: 'dining' 
  },
  { 
    id: 6, 
    src: GALLERY_IMAGE_PATH + 'room.jpg', 
    alt: 'Room', 
    category: 'amenities' 
  },
  { 
    id: 7, 
    src: GALLERY_IMAGE_PATH + 'room.jpg', // Using room.jpg as a fallback
    alt: 'Room', 
    category: 'amenities' 
  },
  { 
    id: 8, 
    src: GALLERY_IMAGE_PATH + 'sunset-view.jpg', 
    alt: 'Sunset View', 
    category: 'villas' 
  },
];

const categories = [
  { id: 'all', name: 'All' },
  { id: 'villas', name: 'Villas' },
  { id: 'rooms', name: 'Rooms' },
  { id: 'amenities', name: 'Amenities' },
  { id: 'dining', name: 'Dining' },
];

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [visibleImages, setVisibleImages] = useState(6); // Number of images to show initially
  const imagesPerLoad = 6; // Number of images to load when clicking "View More"

  // Filter images based on selected category
  const filteredImages = selectedCategory === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category.toLowerCase() === selectedCategory.toLowerCase());

  // Get only the images that should be currently visible
  const imagesToShow = filteredImages.slice(0, visibleImages);

  // Check if there are more images to load
  const hasMoreImages = visibleImages < filteredImages.length;

  const openLightbox = (image: GalleryImage) => {
    setSelectedImage(image);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

  const loadMoreImages = () => {
    setVisibleImages(prev => prev + imagesPerLoad);
  };

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setVisibleImages(6); // Reset visible images when changing category
    // Scroll to gallery section when changing categories
    const gallerySection = document.getElementById('gallery');
    if (gallerySection) {
      window.scrollTo({
        top: gallerySection.offsetTop - 100,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    console.log('Gallery images:', galleryImages);
  }, []);

  return (
    <section id="gallery" className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto text-center mb-16">
          <span className="text-primary-500 text-sm font-semibold tracking-widest uppercase mb-4 inline-block">
            Photo Gallery
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-serif">
            Discover Our <span className="text-primary-500">Property</span>
          </h2>
          <div className="w-24 h-1 bg-primary-300 mx-auto mb-8"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Take a visual journey through our luxurious property and discover the beauty that awaits you at Dolce Vita Pushkar.
          </p>
          
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategorySelect(category.id)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-primary-500 text-white shadow-md'
                    : 'bg-white text-gray-700 hover:bg-gray-50 hover:text-primary-600 shadow-sm'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {imagesToShow.map((image) => (
            <div 
              key={image.id} 
              className="relative aspect-[4/3] overflow-hidden rounded-xl cursor-pointer group"
              onClick={() => openLightbox(image)}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-all duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                <div className="w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="text-white text-lg font-semibold mb-1">
                    {image.alt}
                  </h3>
                  <span className="text-sm text-gray-200">
                    {categories.find(cat => cat.id === image.category)?.name}
                  </span>
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center text-primary-600 shadow-lg">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button - Only show if there are more images to load */}
        {hasMoreImages && (
          <div className="text-center mt-12">
            <button 
              onClick={loadMoreImages}
              className="px-6 py-3 border-2 border-primary-500 text-primary-600 rounded-full font-medium hover:bg-primary-50 transition-colors duration-300"
            >
              View More Photos
            </button>
          </div>
        )}
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button 
            className="absolute top-4 right-4 text-white hover:text-amber-400 transition-colors duration-200"
            onClick={(e) => {
              e.stopPropagation();
              closeLightbox();
            }}
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <div className="relative w-full max-w-4xl max-h-[90vh]" onClick={e => e.stopPropagation()}>
            <div className="relative w-full h-full">
              <Image
                src={selectedImage.src}
                alt={selectedImage.alt}
                width={1200}
                height={800}
                className="object-contain w-full h-full"
              />
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white p-4 text-center">
              {selectedImage.alt}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
