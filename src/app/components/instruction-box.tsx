import { Lightbulb } from "lucide-react";

export default function InstructionBox() {
  return (
    <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 text-yellow-800 rounded-lg">
      <h3 className="font-semibold flex items-center gap-2">
        <Lightbulb className="w-5 h-5" />
        গুরুত্বপূর্ণ নির্দেশনা:
      </h3>
      <p className="text-sm mt-2 pl-7">
        এই প্রোটোটাইপটি একটি ডেমো লিঙ্ক ব্যবহার করে। লাইভ সিস্টেমে, আপনার ইনপুট করা লিঙ্ক থেকে তথ্য স্ক্র্যাপ করা এবং AI দিয়ে ডেসক্রিপশন তৈরি করা সম্ভব।
      </p>
    </div>
  );
}
