interface Geopoint {
  lat: number
  lon: number
}

export interface LocationData {
  id: number
  description: string
  hits: number
  IATA: string
  latitude: number
  longitude: number
  masterCode: number
  type: string
  product: string
  idproduct: string
  inc: number
  city: string
  state: string
  country: string
  geopoint: Geopoint
  _id: string
  _score: number
}
export interface CVCLocationsResponse {
  locations: LocationData[]
  meta: {
    total: number
  }
}
interface ContentItem {
  code: string;
  name: string;
}

interface Content {
  code: string;
  items: ContentItem[];
}

interface Image {
  href?: string;
  title?: string;
}

interface Coordinates {
  latitude: number;
  longitude: number;
}

interface Location {
  address: string;
  nearby: string;
  coordinates: Coordinates;
}

interface Rate {
  rph: string;
  packageGroup: string;
  rateToken: string;
  currency: string;
  roomId: string;
  isInternational: boolean;
  installment: number;
  priceWithTax: number;
  priceWithoutTax: number;
  pricePerDayWithTax: number;
  pricePerDayWithoutTax: number;
  pricePerPaxWithTax: number;
  pricePerPaxWithoutTax: number;
}

interface Room {
  group: string;
  mealPlan: string;
  category: string;
  cancellationPolicy: boolean;
  rate: Rate;
}

export interface Hotel {
  id: string;
  name: string;
  description: string;
  source: string;
  award: number;
  isPreferential: boolean;
  contents: Content[];
  images: Image[];
  location: Location;
  room: Room;
}
export enum NotificationStatus {
  Pendente = 'Pendente',
  EmAnalise = 'Em analise',
  Concluido = 'Concluído',
}
export interface Notification {
  id?: string
  description: string
  status: NotificationStatus
  readAt?: string
  createdAt: string
}