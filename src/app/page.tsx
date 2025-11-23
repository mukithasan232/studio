
'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useProducts } from '@/hooks/use-products';
import { Skeleton } from '@/components/ui/skeleton';
import { placeholderImages as PlaceHolderImages } from '@/lib/placeholder-images.json';

export default function LandingPage() {
  const { products, isLoading } = useProducts();
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-background');
  const featuredImage = PlaceHolderImages.find(img => img.id === 'product-headphones');

  return (
    <main className="flex-1">
      <section className="relative w-full pt-12 md:pt-24 lg:pt-32">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            fill
            objectFit="cover"
            alt="Hero background"
            className="absolute inset-0 z-[-1] opacity-30"
            data-ai-hint={heroImage.imageHint}
            priority
          />
        )}
        <div className="container px-4 md:px-6 space-y-10 xl:space-y-16">
          <div className="grid max-w-[1300px] mx-auto gap-8 px-4 sm:px-6 md:px-10 md:grid-cols-2 md:gap-16 items-center">
            <div>
              <h1 className="lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
                Discover Your Next Favorite Thing
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl mt-4">
                Explore our curated collection of high-quality products. We find the best, so you don&apos;t have to.
              </p>
              <div className="space-x-4 mt-6">
                <Button size="lg" asChild>
                  <Link href="/#products">Explore Products</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                   <Link href="/admin">Add New Product</Link>
                </Button>
              </div>
            </div>
            <div className="flex justify-center items-center">
              {featuredImage && (
                <Image
                  src={featuredImage.imageUrl}
                  width="600"
                  height="600"
                  alt="Featured Product"
                  className="mx-auto aspect-square overflow-hidden rounded-xl object-cover"
                  data-ai-hint={featuredImage.imageHint}
                />
              )}
            </div>
          </div>
        </div>
      </section>
      <section id="products" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Featured Products</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Hand-picked items that we think you&apos;ll love. High quality, great prices.
              </p>
            </div>
          </div>
          <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-12">
            {isLoading ? (
              Array.from({ length: 4 }).map((_, i) => <ProductCardSkeleton key={i} />)
            ) : products.length > 0 ? (
              products.map((product) => (
                <Link key={product.id} href={`/product/${product.id}`} className="block group">
                  <Card className="overflow-hidden shadow-lg group-hover:shadow-xl transition-all duration-300 h-full">
                    <CardContent className="p-0 flex flex-col h-full">
                      <div className="relative w-full h-48 overflow-hidden">
                        <Image
                          src={product.imageUrl}
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-4 flex flex-col flex-grow">
                        <h3 className="text-lg font-bold line-clamp-2">{product.name}</h3>
                        <div className="flex-grow" />
                        <div className="flex items-center justify-between mt-4">
                          <span className="text-xl font-bold">${product.price.toFixed(2)}</span>
                          <Button size="sm" variant="outline">
                            View Details
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))
            ) : (
               <p className="col-span-full text-center text-muted-foreground">No products yet. Add some from the Admin page!</p>
            )}
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
          <div className="space-y-3">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              Ready to Start Shopping?
            </h2>
            <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Browse our full catalog and find the perfect products for you.
            </p>
          </div>
          <div className="mx-auto w-full max-w-sm space-x-2">
            <Button asChild type="submit" size="lg">
                <Link href="/#products">
                    View All Products
                </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}


const ProductCardSkeleton = () => (
    <Card className="overflow-hidden">
        <CardContent className="p-0">
            <Skeleton className="w-full h-48" />
            <div className="p-4 space-y-2">
                <Skeleton className="h-6 w-3/4" />
                <div className="flex items-center justify-between mt-4">
                    <Skeleton className="h-8 w-1/4" />
                    <Skeleton className="h-8 w-1/3" />
                </div>
            </div>
        </CardContent>
    </Card>
)
