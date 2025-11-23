"use server";

import { generateProductDescription } from "@/ai/flows/generate-product-description";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import type { GeneratedProductData } from "@/lib/types";

// For the prototype, we use a mock function that returns static data.
// In a real system, this would involve a web scraping service.
function getMockProductData(link: string) {
  const headphoneImage = PlaceHolderImages.find(img => img.id === 'product-headphones');

  return {
    productName: "Wireless Noise-Cancelling Headphones Pro",
    features: "Active Noise Cancellation, 30 Hour Battery Life, Comfortable Over-Ear Design, Crystal Clear Calls",
    price: 249.99,
    imageUrl: headphoneImage?.imageUrl || "https://picsum.photos/seed/placeholder/300/200", 
    link: link,
  };
}

export async function generateProductDataAction(
  affiliateLink: string
): Promise<{ success: true; data: GeneratedProductData } | { success: false; error: string }> {
  try {
    if (!affiliateLink) {
        return { success: false, error: "Product URL cannot be empty." };
    }

    // Step 1: Get product data (mocked for this prototype)
    const { productName, features, price, imageUrl, link } = getMockProductData(affiliateLink);

    // Step 2: Generate description with AI
    const aiResult = await generateProductDescription({
      productName: productName,
      features: features,
    });
    
    if (!aiResult.htmlDescription) {
        return { success: false, error: "AI failed to generate a description." };
    }

    // Step 3: Combine and return all data for the client to save
    const finalData: GeneratedProductData = {
      name: productName,
      price,
      link,
      imageUrl,
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
