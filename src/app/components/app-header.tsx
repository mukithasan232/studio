import { Bot } from "lucide-react";

export default function AppHeader() {
  return (
    <header className="text-center py-6 bg-card rounded-xl shadow-lg">
      <h1 className="text-4xl font-extrabold text-primary flex items-center justify-center gap-3">
        Codernest
        <Bot className="w-9 h-9" />
        AI Importer
      </h1>
      <p className="text-muted-foreground mt-2">
        পণ্য যোগ করার জন্য AI চালিত স্বয়ংক্রিয় ব্যবস্থা (Affiliate Product Importer)
      </p>
    </header>
  );
}
