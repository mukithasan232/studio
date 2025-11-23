"use server";

import { generateProductDescription } from "@/ai/flows/generate-product-description";
import type { GeneratedProductData } from "@/lib/types";

export async function generateProductDataAction(
  productData: Omit<GeneratedProductData, 'description' | 'source'> & { features: string }
): Promise<{ success: true; data: GeneratedProductData } | { success: false; error: string }> {
  try {
    if (!productData.link || !productData.name || !productData.imageUrl || !productData.price) {
        return { success: false, error: "All fields are required." };
    }

    // Step 1: Generate description with AI using provided name and features
    const aiResult = await generateProductDescription({
      productName: productData.name,
      features: productData.features,
    });
    
    if (!aiResult.htmlDescription) {
        return { success: false, error: "AI failed to generate a description." };
    }

    // Step 2: Combine and return all data for the client to save
    const finalData: GeneratedProductData = {
      name: productData.name,
      price: productData.price,
      link: productData.link,
      imageUrl: productData.imageUrl,
      description: aiResult.htmlDescription,
      source: "AI-Importer",
    };

    return {
      success: true,
      data: finalData,
    };
  } catch (error) {
    console.error("Error in generateProductData action:", error);
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred during data generation.";
    return { success: false, error: errorMessage };
  }
}
