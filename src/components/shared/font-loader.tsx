"use client";

import { useEffect } from "react";

export default function FontLoader() {
  useEffect(() => {
    // Local fonts are now loaded via @fontsource
    // This component just manages the fonts-loaded class for CSS optimization
    const optimizeFontLoading = () => {
      // Check if fonts are already loaded
      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(() => {
          // Add loaded class to body for CSS optimizations
          document.body.classList.add("fonts-loaded");
          console.log("✅ Local fonts loaded successfully");
        });
      } else {
        // Fallback: add class immediately if Font Loading API not supported
        document.body.classList.add("fonts-loaded");
      }
    };

    // Run optimization immediately if DOM is ready, otherwise wait
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", optimizeFontLoading);
    } else {
      optimizeFontLoading();
    }

    return () => {
      document.removeEventListener("DOMContentLoaded", optimizeFontLoading);
    };
  }, []);

  return null;
}
