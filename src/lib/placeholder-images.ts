export type ProductPlaceholder = {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  imageHint: string;
  price: number;
};

export const products: ProductPlaceholder[] = [
  {
    id: "prod_1",
    name: "Wireless Headphones",
    description: "High-fidelity sound and noise cancellation.",
    imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxoZWFkcGhvbmVzJTIwcHJvZHVjdHxlbnwwfHx8fDE3MTc4NzUxNDR8MA&ixlib=rb-4.0.3&q=80&w=1080",
    imageHint: "headphones product",
    price: 99.99,
  },
  {
    id: "prod_2",
    name: "Smart Watch",
    description: "Stay connected and track your fitness goals.",
    imageUrl: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxzbWFydCUyMHdhdGNofGVufDB8fHx8MTcxNzg3NTI1MXww&ixlib=rb-4.0.3&q=80&w=1080",
    imageHint: "smart watch",
    price: 199.99,
  },
  {
    id: "prod_3",
    name: "Leather Backpack",
    description: "Stylish and durable for everyday use.",
    imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb68c6a62?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxsZWF0aGVyJTIwYmFja3BhY2t8ZW58MHx8fHwxNzE3ODc1Mjg0fDA&ixlib=rb-4.0.3&q=80&w=1080",
    imageHint: "leather backpack",
    price: 79.99,
  },
  {
    id: "prod_4",
    name: "Sunglasses",
    description: "Protect your eyes with a classic style.",
    imageUrl: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxzdW5nbGFzc2VzfGVufDB8fHx8MTcxNzg3NTMxMnww&ixlib=rb-4.0.3&q=80&w=1080",
    imageHint: "sunglasses",
    price: 49.99,
  },
];
