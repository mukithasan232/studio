import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import type { GeneratedProductData } from "@/lib/types";

interface ProductPreviewProps {
  isGenerating: boolean;
  data: GeneratedProductData | null;
}

export default function ProductPreview({ isGenerating, data }: ProductPreviewProps) {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold border-b pb-3">২. জেনারেটেড প্রোডাক্ট প্রিভিউ</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="border border-primary/20 bg-primary/5 p-4 rounded-lg min-h-32 max-h-96">
          <div id="product-display">
            {isGenerating ? (
              <div className="p-2 space-y-3">
                 <p className="text-sm text-primary animate-pulse font-medium">স্ক্র্যাপিং এবং AI ডেসক্রিপশন তৈরি হচ্ছে...</p>
                <Skeleton className="h-5 w-3/4 mt-2" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-4/5" />
              </div>
            ) : data ? (
              <div className="ai-content" dangerouslySetInnerHTML={{ __html: data.description }} />
            ) : (
              <p className="text-muted-foreground italic p-2">
                এখানে AI দ্বারা তৈরি প্রোডাক্টের বিবরণ দেখা যাবে...
              </p>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
