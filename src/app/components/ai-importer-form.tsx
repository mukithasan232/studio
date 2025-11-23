"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Loader2, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { generateProductDataAction } from "@/app/actions";
import type { GeneratedProductData } from "@/lib/types";

import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

interface AIImporterFormProps {
  isGenerating: boolean;
  setIsGenerating: (isGenerating: boolean) => void;
  setPreviewData: (data: GeneratedProductData | null) => void;
  onProductPublished: () => void;
}

type FormInputs = {
  affiliateLink: string;
};

export default function AiImporterForm({ setIsGenerating, isGenerating, setPreviewData, onProductPublished }: AIImporterFormProps) {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormInputs>();
  const { toast } = useToast();

  const onSubmit: SubmitHandler<FormInputs> = async (formData) => {
    if (!db) {
      toast({
        title: "Connection Error",
        description: "Firebase is not connected. Please check your configuration and try again.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    setPreviewData(null);
    toast({ title: "প্রক্রিয়া শুরু হয়েছে...", description: "AI ডেটা তৈরি করছে। অনুগ্রহ করে অপেক্ষা করুন..." });

    const result = await generateProductDataAction(formData.affiliateLink);

    if (result.success) {
      const generatedData = result.data;
      setPreviewData(generatedData);
      
      try {
        // In a real app, this would be an env variable. For this demo, it's hardcoded.
        const appId = 'ai-affiliate-automator';
        const productsCollectionPath = `artifacts/${appId}/public/data/products`;
        
        await addDoc(collection(db, productsCollectionPath), {
          ...generatedData,
          userId: 'anonymous',
          timestamp: serverTimestamp(),
        });
        
        toast({
          title: "সফল!",
          description: "AI দ্বারা তৈরি প্রোডাক্টটি ডাটাবেসে যোগ করা হয়েছে।",
          variant: "default",
        });
        
        onProductPublished();
        reset();

      } catch (error) {
        console.error("Firestore Error:", error);
        toast({
          title: "Database Error",
          description: error instanceof Error ? error.message : "Could not save the product to Firestore.",
          variant: "destructive",
        });
      }

    } else {
      toast({
        title: "AI Generation Failed",
        description: result.error,
        variant: "destructive",
      });
    }

    setIsGenerating(false);
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold border-b pb-3">১. প্রোডাক্ট লিঙ্ক ইনপুট</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="affiliateLink" className="font-medium">এফিলিয়েট প্রোডাক্ট URL:</Label>
            <Input
              id="affiliateLink"
              type="url"
              placeholder="https://example.com/product-link"
              {...register("affiliateLink", { 
                required: "Product URL is required.",
                pattern: {
                  value: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
                  message: "Please enter a valid URL."
                }
              })}
              className="mt-2"
              disabled={isGenerating}
            />
            {errors.affiliateLink && <p className="text-sm text-destructive mt-1">{errors.affiliateLink.message}</p>}
          </div>
          <Button type="submit" className="w-full font-bold py-2.5 h-auto text-base" disabled={isGenerating}>
            {isGenerating ? (
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            ) : (
              <Zap className="mr-2 h-5 w-5" />
            )}
            {isGenerating ? "ডেটা তৈরি হচ্ছে..." : "AI দ্বারা ডেটা তৈরি করুন ও পাবলিশ করুন"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
