export interface GalleryImage {
  src: string;
  alt: string;
}

export interface CitySlide {
  src: string;
  alt: string;
  description: string;
}

export interface Country {
  name: string;
  slug: string;
}

export interface BookEntry {
  id: string;
  title: string;
  author: string;
  cover?: string;
  notes?: string;
  readAt?: string;
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  image?: string;
  createdAt?: string;
}
