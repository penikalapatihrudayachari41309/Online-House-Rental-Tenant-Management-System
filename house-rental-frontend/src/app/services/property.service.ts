import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Property {
  id: number;
  owner_id: string;
  title: string;
  description: string;
  rent: number;
  location: string;
  amenities: string;
  photos: string;
  created_at: string;
}

@Injectable({
  providedIn: 'root'
})
export class PropertyService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  getProperties(): Observable<Property[]> {
    return this.http.get<Property[]>(`${this.apiUrl}/properties`);
  }

  getProperty(id: number): Observable<Property> {
    return this.http.get<Property>(`${this.apiUrl}/properties/${id}`);
  }

  addProperty(property: Omit<Property, 'id' | 'created_at'>): Observable<any> {
    return this.http.post(`${this.apiUrl}/properties`, property);
  }
}
