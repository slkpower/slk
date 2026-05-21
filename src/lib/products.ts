export type ProductCategory = 'rent' | 'power' | 'services' | 'parts' | 'panel';

export type Product = {
  slug: string;
  category: ProductCategory;
  title: string;
  image: string;
  heroImage?: string;
  brochure?: string;
  capacity?: string;
};

export const productCategories: ProductCategory[] = ['rent', 'power', 'services', 'parts', 'panel'];

export const products: Product[] = [
  // Rent
  {
    slug: 'rent-25',
    category: 'rent',
    title: '25 kVA',
    image: '/assets/images/portfolio/genset-rent-25kva.jpeg',
    heroImage: '/assets/images/portfolio/rent.jpg',
    capacity: '25 kVA',
  },
  {
    slug: 'rent-40',
    category: 'rent',
    title: '40-45 kVA',
    image: '/assets/images/portfolio/genset-rent-40kva.jpeg',
    capacity: '40-45 kVA',
  },
  {
    slug: 'rent-60',
    category: 'rent',
    title: '60 kVA',
    image: '/assets/images/portfolio/genset-rent-60kva.jpeg',
    capacity: '60 kVA',
  },
  {
    slug: 'rent-80',
    category: 'rent',
    title: '80 kVA',
    image: '/assets/images/portfolio/genset-rent-80kva.jpeg',
    capacity: '80 kVA',
  },
  {
    slug: 'rent-100',
    category: 'rent',
    title: '100 kVA',
    image: '/assets/images/portfolio/genset-rent-100kva.jpeg',
    capacity: '100 kVA',
  },
  {
    slug: 'rent-100plus',
    category: 'rent',
    title: '>100 kVA',
    image: '/assets/images/portfolio/genset-rent-100kva.jpeg',
    capacity: '>100 kVA',
  },

  // Power
  {
    slug: 'power-petrol',
    category: 'power',
    title: 'Petrol Series',
    image: '/assets/images/portfolio/petrol.png',
    heroImage: '/assets/images/portfolio/generatorset.jpeg',
  },
  {
    slug: 'power-spp',
    category: 'power',
    title: 'SPP Series (Perkins)',
    image: '/assets/images/portfolio/spp.jpg',
  },
  {
    slug: 'power-spc',
    category: 'power',
    title: 'SPC Series (Cummins)',
    image: '/assets/images/portfolio/spc.jpg',
  },
  {
    slug: 'power-sptz',
    category: 'power',
    title: 'SPTZ Series (Tsuzumi)',
    image: '/assets/images/portfolio/sptz.png',
  },
  {
    slug: 'power-spi',
    category: 'power',
    title: 'SPI Series (Isuzu)',
    image: '/assets/images/portfolio/spi.png',
  },
  {
    slug: 'power-spy',
    category: 'power',
    title: 'SPY Series (Yanmar)',
    image: '/assets/images/portfolio/spy.jpg',
  },
  {
    slug: 'power-pump',
    category: 'power',
    title: 'Pump Engine',
    image: '/assets/images/portfolio/pumpengine.png',
  },
  {
    slug: 'power-marine',
    category: 'power',
    title: 'Marine Engine',
    image: '/assets/images/portfolio/marineengine.jpg',
  },

  // Services
  {
    slug: 'service-preventive',
    category: 'services',
    title: 'Preventive Maintenance',
    image: '/assets/images/portfolio/service-preventive.jpeg',
    heroImage: '/assets/images/portfolio/service-program.jpeg',
  },
  {
    slug: 'service-corrective',
    category: 'services',
    title: 'Corrective Maintenance',
    image: '/assets/images/portfolio/service-corrective.jpeg',
  },
  {
    slug: 'service-overhaul',
    category: 'services',
    title: 'Overhaul Program',
    image: '/assets/images/portfolio/service-overhaul.jpeg',
  },
  {
    slug: 'service-contract',
    category: 'services',
    title: 'Maintenance Contract',
    image: '/assets/images/portfolio/service-contract.jpeg',
  },

  // Parts
  {
    slug: 'parts-genuine',
    category: 'parts',
    title: 'Genuine Spareparts',
    image: '/assets/images/portfolio/spareparts.jpg',
  },

  // Panel
  {
    slug: 'panel-ats-amf',
    category: 'panel',
    title: 'Panel ATS & AMF',
    image: '/assets/images/portfolio/panel-amf.jpeg',
    heroImage: '/assets/images/portfolio/panel.jpeg',
  },
  {
    slug: 'panel-sync',
    category: 'panel',
    title: 'Panel Synchronize',
    image: '/assets/images/portfolio/panel-sync.png',
  },
];

export function getProductsByCategory(category: ProductCategory): Product[] {
  return products.filter((p) => p.category === category);
}

export const clientLogos = [
  { src: '/assets/images/client-logo/client1.png', alt: 'Client 1' },
  { src: '/assets/images/client-logo/client2.png', alt: 'Client 2' },
  { src: '/assets/images/client-logo/client3.png', alt: 'Client 3' },
  { src: '/assets/images/client-logo/client4.png', alt: 'Client 4' },
  { src: '/assets/images/client-logo/client-kemendikbud.png', alt: 'Kemendikbud' },
  { src: '/assets/images/client-logo/client-yara.jpeg', alt: 'Yara' },
];
