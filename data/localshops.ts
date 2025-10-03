import { ImageSourcePropType } from 'react-native';

export const shop_categories = [
  "Kött (lokalt)",
  "Mjölk & Mejeri - självhållning",
  "Jordgubbar - självplock",
  "Potatis - självplock",
  "Majs - självplock",
  "Grönsaker - Gårdsbutik",
  "Honung & Biprodukter - Butik",
];

export type LocalShop = {
  id: string;
  name: string;
  category: string;
  address: string;
  city?: string;
  postalCode?: string;
  lat: number;
  lng: number;
  phone?: string;
  hours?: string;
  description?: string;
  image: ImageSourcePropType;
};

const localShops: LocalShop[] = [
  {
    id: 'farm-001',
    name: 'Ebbarps Spa och Hjortgård',
    category: 'Kött (lokalt)',
    address: 'Stora Ebbarp 1',
    city: 'Svenljunga',
    postalCode: '51292',
    lat: 57.496838,
    lng: 13.076509,
    phone: '0325 - 106 73',
    hours: '11:00 - 13:00',
    description: 'Lokal gård som säljer köttlådor och styckdetaljer från gårdens djur. Förhandsbeställ eller köp i gårdsbutiken.',
    image: require('../assets/images/shops/firstStore.jpg')
  },
  {
    id: 'farm-002',
    name: 'Smedsgårdens Gårdsmejeri',
    category: 'Mjölk & Mejeri - självhällning',
    address: 'Smedsgårdsvägen 4',
    city: 'Borås',
    postalCode: '504 32',
    lat: 57.7169,
    lng: 12.9406,
    phone: '033 - 45 67 89',
    hours: '09:00 - 16:00',
    description: 'Litet gårdsmejeri som säljer färsk mjölk, ost och yoghurt i gårdsbutiken.',
    image: require('../assets/images/shops/secondStore.jpg')
  },
  {
    id: 'farm-003',
    name: 'Björkängs Självplock',
    category: 'Jordgubbar - självplock',
    address: 'Björkängsvägen 10',
    city: 'Ulricehamn',
    postalCode: '523 30',
    lat: 57.7821,
    lng: 13.0442,
    phone: '070 - 123 45 67',
    hours: '09:00 - 19:00 (säsong)',
    description: 'Säsongsöppet självplock av jordgubbar och smultron. Hinkar finns att köpa på plats.',
    image: require('../assets/images/shops/thirdStore.jpg')
  },
  {
    id: 'farm-004',
    name: 'Lillåns Potatisfält',
    category: 'Potatis - självplock',
    address: 'Lillåvägen 6',
    city: 'Kinna',
    postalCode: '511 60',
    lat: 57.4923,
    lng: 12.8734,
    phone: '0320 - 22 334',
    hours: '08:00 - 18:00 (säsong)',
    description: 'Stor åker där självplock av potatis är möjligt under sensommaren. Guidade helger vid behov.',
    image: require('../assets/images/shops/fourthStore.jpg')
  },
  {
    id: 'farm-005',
    name: 'Tranemos Majsfält',
    category: 'Majs - självplock',
    address: 'Fältslingan 2',
    city: 'Tranemo',
    postalCode: '514 44',
    lat: 57.3867,
    lng: 13.2199,
    phone: '0325 - 77 123',
    hours: '10:00 - 16:00 (säsong)',
    description: 'Familjevänligt majsfält med självplock och grillplats under utvalda helger.',
    image: require('../assets/images/shops/fifthStore.jpg')
  },
  {
    id: 'farm-006',
    name: 'Hestra Grönsaker',
    category: 'Grönsaker - Gårdsbutik',
    address: 'Hestra by 12',
    city: 'Gislaved',
    postalCode: '332 30',
    lat: 57.2611,
    lng: 13.2322,
    phone: '0371 - 44 500',
    hours: '09:00 - 17:00',
    description: 'Gårdsbutik med säsongens grönsaker och färska rotfrukter.',
    image: require('../assets/images/shops/sixthStore.jpg')
  },
  {
    id: 'farm-007',
    name: 'Bergsjö Honung & Biodling',
    category: 'Honung & Biprodukter - Butik',
    address: 'Bergsjövägen 9',
    city: 'Falköping',
    postalCode: '521 30',
    lat: 58.1418,
    lng: 13.5455,
    phone: '0506 - 12 345',
    hours: '10:00 - 15:00',
    description: 'Biodling med lokal honung, bivax och pollineringstjänster.',
    image: require('../assets/images/shops/seventhStore.jpg')
  }
];

export default localShops;
