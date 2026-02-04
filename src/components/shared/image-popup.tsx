"use client";

import { useEffect, useState } from "react";

export default function ImagePopup() {
  const [isMounted, setIsMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasSeenPopup = sessionStorage.getItem("hasSeenJanPromotion");
    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        setIsMounted(true);
        requestAnimationFrame(() => setIsVisible(true));
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    sessionStorage.setItem("hasSeenJanPromotion", "true");

    setTimeout(() => {
      setIsMounted(false);
    }, 400); // ต้องเท่าหรือมากกว่า duration
  };

  if (!isMounted) return null;

  return (
    <div
      onClick={handleClose}
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm transition-opacity duration-400 ease-out ${isVisible ? "opacity-100" : "opacity-0"} `}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative w-[90vw] max-w-[400px] transform transition-[opacity,transform] duration-400 ease-out ${
          isVisible ? "translate-y-0 scale-100 opacity-100" : "translate-y-2 scale-95 opacity-0"
        } `}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-2 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-red-600 text-black shadow-lg transition-transform duration-200 hover:scale-110 active:scale-95"
        >
          <span className="text-xl font-bold">&times;</span>
        </button>

        {/* Image */}
        <div className="overflow-hidden rounded-2xl bg-white shadow-2xl">
          <img
            src="https://dcb9450325.nxcli.io/wp-content/uploads/2025/12/January-02.jpg"
            alt="January New Year Special Offers"
            className="block h-auto w-full object-contain"
          />
        </div>
      </div>
    </div>
  );
}
