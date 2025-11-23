import Image from "next/image";
import type { Product } from "@/lib/types";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const formattedDate = product.timestamp
    ? new Date(product.timestamp.toDate()).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    : 'N/A';
  
  const isPlaceholder = product.imageUrl.includes('picsum.photos');

  return (
    <div className="p-4 border border-border rounded-lg shadow-sm bg-card flex items-center space-x-4">
      <div className="flex-shrink-0">
        <Image
          src={product.imageUrl}
          alt={product.name}
          width={64}
          height={64}
          className="w-16 h-16 object-cover rounded-md bg-muted"
          data-ai-hint={isPlaceholder ? "headphones" : ""}
        />
      </div>
      <div className="flex-grow overflow-hidden">
        <h4 className="font-bold text-primary truncate">{product.name}</h4>
        <p className="text-sm text-muted-foreground truncate">{product.link}</p>
        <p className="text-xs text-green-600 font-medium">
          Price: ${product.price.toFixed(2)} | Added: {formattedDate}
        </p>
      </div>
    </div>
  );
}
