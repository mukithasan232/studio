import { Lightbulb } from "lucide-react";

export default function InstructionBox() {
  return (
    <div className="p-4 bg-blue-50 border-l-4 border-blue-400 text-blue-800 rounded-lg">
      <h3 className="font-semibold flex items-center gap-2">
        <Lightbulb className="w-5 h-5" />
        কিভাবে ব্যবহার করবেন:
      </h3>
      <p className="text-sm mt-2 pl-7">
        প্রোডাক্টের নাম, ফিচার, দাম, আপনার অ্যাফিলিয়েট লিঙ্ক এবং একটি ছবির লিঙ্ক দিন। এরপর বাটনে ক্লিক করলে AI স্বয়ংক্রিয়ভাবে একটি আকর্ষণীয় বিবরণ তৈরি করে দেবে এবং পণ্যটি আপনার সাইটে লাইভ হয়ে যাবে।
      </p>
    </div>
  );
}
