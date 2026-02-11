// types/place.ts
export interface Place {
  id: string;
  title: string;
  location: string;
  rating: number;
  image: { uri: string };
  category: string;
  price: number;
  duration: string;
  temperature: string;
  description: string;
}