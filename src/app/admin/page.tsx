
"use client";

import React, { useState } from "react";
import AppHeader from "@/app/components/app-header";
import AiImporterForm from "@/app/components/ai-importer-form";
import ProductPreview from "@/app/components/product-preview";
import ProductList from "@/app/components/product-list";
import InstructionBox from "@/app/components/instruction-box";
import type { GeneratedProductData } from "@/lib/types";

export default function AdminPage() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [previewData, setPreviewData] = useState<GeneratedProductData | null>(null);
  
  // This state will be used to force a re-render of the ProductList
  const [productUpdateKey, setProductUpdateKey] = useState(0);

  const handleProductPublished = () => {
    setProductUpdateKey(prevKey => prevKey + 1);
    setPreviewData(null); 
  };

  return (
    <main className="flex-1 bg-muted/20">
      <div className="container mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
        <AppHeader />
        <InstructionBox />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-1 space-y-8">
            <AiImporterForm
              isGenerating={isGenerating}
              setIsGenerating={setIsGenerating}
              setPreviewData={setPreviewData}
              onProductPublished={handleProductPublished}
            />
          </div>
          <div className="lg:col-span-2 space-y-8">
            <ProductPreview isGenerating={isGenerating} data={previewData} />
            <ProductList key={productUpdateKey} />
          </div>
        </div>
      </div>
    </main>
  );
}
