'use client';

import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { Product } from '@/lib/types';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { notFound } from 'next/navigation';
import { ExternalLink, ShoppingCart } from 'lucide-react';

interface ProductPageProps {
  params: {
    id: string;
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProduct() {
      if (!db) {
        setLoading(false);
        return;
      }
      
      try {
        const appId = 'ai-affiliate-automator';
        const docRef = doc(db, `artifacts/${appId}/public/data/products`, params.id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProduct({ id: docSnap.id, ...docSnap.data() } as Product);
        } else {
          // Handle case where product is not found in Firestore
          // We can try to find it in the placeholder data as a fallback for this demo
          const { products: placeholderProducts } = await import('@/lib/placeholder-images');
          const placeholderProduct = placeholderProducts.find(p => p.id === params.id);
          if (placeholderProduct) {
             setProduct({
                id: placeholderProduct.id,
                name: placeholderProduct.name,
                description: placeholderProduct.description,
                price: placeholderProduct.price,
                imageUrl: placeholderProduct.imageUrl,
                link: `https://example.com/product/${placeholderProduct.id}`,
                timestamp: new Date() as any, // Mock timestamp
                userId: 'placeholder',
                source: 'placeholder'
             });
          } else {
             notFound();
          }
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [params.id]);

  if (loading) {
    return <ProductPageSkeleton />;
  }

  if (!product) {
    return notFound();
  }

  return (
    <main className="flex-1 bg-muted/20">
      <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          <div className="bg-card rounded-lg shadow-lg overflow-hidden">
            <Image
              src={product.imageUrl}
              alt={product.name}
              width={600}
              height={600}
              className="w-full h-auto object-cover"
            />
          </div>
          <div className="flex flex-col justify-center space-y-6">
            <h1 className="text-3xl lg:text-4xl font-bold text-primary">{product.name}</h1>
            <div className="text-4xl font-bold text-green-600">
                ${product.price.toFixed(2)}
            </div>
            <div className="ai-content text-card-foreground/90 space-y-4" dangerouslySetInnerHTML={{ __html: product.description }} />
            
            <div className="flex items-center gap-4 pt-4">
                 <Button asChild size="lg" className="w-full md:w-auto">
                    <a href={product.link} target="_blank" rel="noopener noreferrer nofollow">
                        Buy Now
                        <ExternalLink className="ml-2 h-5 w-5" />
                    </a>
                </Button>
                <Button variant="outline" size="lg" className="w-full md:w-auto">
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    Add to Cart
                </Button>
            </div>
             <p className="text-xs text-muted-foreground pt-4">
              Note: Clicking "Buy Now" will take you to an external affiliate website. Prices and availability are subject to change.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

function ProductPageSkeleton() {
  return (
     <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            <div>
                <Skeleton className="w-full aspect-square rounded-lg" />
            </div>
            <div className="space-y-6">
                <Skeleton className="h-10 w-3/4" />
                <Skeleton className="h-12 w-1/4" />
                <div className="space-y-3">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                    <Skeleton className="h-4 w-3/4" />
                </div>
                 <div className="flex items-center gap-4 pt-4">
                    <Skeleton className="h-12 w-40" />
                    <Skeleton className="h-12 w-40" />
                </div>
            </div>
        </div>
     </div>
  );
}
