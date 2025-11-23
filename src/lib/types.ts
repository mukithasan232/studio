import type { Timestamp } from "firebase/firestore";

export interface Product {
  id: string;
  name: string;
  link: string;
  price: number;
  imageUrl: string;
  description: string;
  timestamp: Timestamp;
  userId: string;
  source: string;
}

export type GeneratedProductData = Omit<Product, "id" | "timestamp" | "userId">;
