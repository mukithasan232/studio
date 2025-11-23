"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useProducts } from "@/hooks/use-products";
import ProductCard from "./product-card";
import { Database } from "lucide-react";

export default function ProductList() {
  const { products, isLoading } = useProducts();

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold border-b pb-3 flex items-center gap-2">
          <Database />
          ৩. লাইভ প্রোডাক্টের তালিকা (Firestore)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div id="product-list" className="space-y-4 pt-2">
          {isLoading ? (
            <>
              <ProductSkeleton />
              <ProductSkeleton />
              <ProductSkeleton />
            </>
          ) : products.length === 0 ? (
            <p className="text-center text-muted-foreground p-4">
              ডাটাবেসে কোনো প্রোডাক্ট নেই। উপরে যোগ করুন।
            </p>
          ) : (
            products.map((product) => <ProductCard key={product.id} product={product} />)
          )}
        </div>
      </CardContent>
    </Card>
  );
}

const ProductSkeleton = () => (
  <div className="flex items-center space-x-4 p-4 rounded-lg bg-muted/50">
    <Skeleton className="h-16 w-16 rounded-md" />
    <div className="space-y-2 flex-grow">
      <Skeleton className="h-4 w-[250px]" />
      <Skeleton className="h-4 w-[200px]" />
      <Skeleton className="h-4 w-[150px]" />
    </div>
  </div>
);
