export interface Property {
  id: number;
  owner_id: number;
  title: string;
  description: string;
  rent: number;
  location: string;
  amenities: string;
  photos: string;
  created_at: Date;
}
