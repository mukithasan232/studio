"use client";

import React, { useState } from "react";
import AppHeader from "@/app/components/app-header";
import AiImporterForm from "@/app/components/ai-importer-form";
import ProductPreview from "@/app/components/product-preview";
import ProductList from "@/app/components/product-list";
import InstructionBox from "@/app/components/instruction-box";
import type { GeneratedProductData } from "@/lib/types";

export default function AffiliateImporterPage() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [previewData, setPreviewData] = useState<GeneratedProductData | null>(null);

  const handleProductPublished = () => {
    // Firestore's onSnapshot will update the list automatically.
    // We just clear the form and preview.
    setPreviewData(null);
  };

  return (
    <main className="max-w-6xl mx-auto p-4 md:p-8">
      <AppHeader />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        <div className="lg:col-span-1 space-y-8 h-fit lg:sticky top-8">
          <AiImporterForm
            isGenerating={isGenerating}
            setIsGenerating={setIsGenerating}
            setPreviewData={setPreviewData}
            onProductPublished={handleProductPublished}
          />
          <InstructionBox />
        </div>

        <div className="lg:col-span-2 space-y-8">
          <ProductPreview
            isGenerating={isGenerating}
            data={previewData}
          />
          <ProductList />
        </div>
      </div>
    </main>
  );
}
