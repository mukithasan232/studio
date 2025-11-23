"use client";

import { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db, auth } from '@/lib/firebase';
import type { Product } from '@/lib/types';
import { useToast } from "@/hooks/use-toast";

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (!db || !auth) {
      if (process.env.NODE_ENV === 'development') {
        toast({
          title: "Firebase Not Configured",
          description: "Please set NEXT_PUBLIC_FIREBASE_CONFIG in your .env.local file to see the live product list.",
          variant: "destructive",
        });
      }
      console.error("Firestore DB or Auth is not initialized. Live product list is disabled.");
      setIsLoading(false);
      return;
    }

    const unsubscribeAuth = auth.onAuthStateChanged(user => {
      if (user) {
        // This is a demo app, so we use a predictable app ID.
        // In a real multi-tenant app, this would come from the environment.
        const appId = 'ai-affiliate-automator'; 
        const productsCollectionPath = `artifacts/${appId}/public/data/products`;
        
        const q = query(collection(db, productsCollectionPath), orderBy("timestamp", "desc"));
        
        const unsubscribeSnapshot = onSnapshot(q, (snapshot) => {
          const productList = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          } as Product));
          setProducts(productList);
          setIsLoading(false);
        }, (error) => {
          console.error("Error fetching products: ", error);
          toast({
            title: "Error fetching products",
            description: "Could not retrieve live product list. Please check the console.",
            variant: "destructive",
          });
          setIsLoading(false);
        });

        return () => unsubscribeSnapshot();
      } else {
        // User is signed out.
        setIsLoading(false);
        setProducts([]);
      }
    });

    return () => unsubscribeAuth();
  }, [toast]);

  return { products, isLoading };
}
