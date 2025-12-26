export interface Property {
  id?: number;
  owner_id: number;
  title: string;
  description?: string;
  rent: number;
  location: string;
  amenities?: string;  // e.g. JSON string or comma-separated
  photos?: string;     // e.g. URLs (comma-separated or JSON)
  created_at?: Date;
}
