export interface Products {
  id: number;
  title: string;
  thumbnail: string;
  price: number;
  description: string;
  quantity?: number;
  category: string;
  availabilityStatus: string;
  warrantyInformation: string;
  shippingInformation: string;
  reviews: [];
}
