import React from "react";

export default function Lazyspinner() {
  return (
    // "fixed inset-0" makes it cover the entire screen
    // "z-50" ensures it stays on top of all other elements
    <div className="fixed inset-0 flex items-center justify-center bg-white/80 z-50">
      <div className="flex flex-col items-center gap-4">
        {/* The actual purple spinner */}
        <div className="w-12 h-12 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
        <p className="text-purple-600 font-medium animate-spin"></p>
      </div>
    </div>
  );
}