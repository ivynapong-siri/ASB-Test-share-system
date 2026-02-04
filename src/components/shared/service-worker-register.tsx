"use client";

import { useEffect } from "react";

export default function ServiceWorkerRegister() {
  useEffect(() => {
    // Only register service worker in production and if supported
    if (typeof window !== "undefined" && "serviceWorker" in navigator && process.env.NODE_ENV === "production") {
      // Register service worker
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => {
          console.log("Service Worker registered successfully:", registration.scope);

          // Setup periodic cache cleanup (every 30 minutes)
          setInterval(
            () => {
              if (registration.active) {
                registration.active.postMessage({ action: "CLEANUP_CACHE" });
              }
            },
            30 * 60 * 1000
          );

          // Check for updates
          registration.addEventListener("updatefound", () => {
            const newWorker = registration.installing;
            if (newWorker) {
              newWorker.addEventListener("statechange", () => {
                if (newWorker.state === "installed" && navigator.serviceWorker.controller) {
                  console.log("New service worker available");
                  // Optional: Show update notification to user
                }
              });
            }
          });
        })
        .catch((error) => {
          console.error("Service Worker registration failed:", error);
        });

      // Handle service worker updates
      let refreshing = false;
      navigator.serviceWorker.addEventListener("controllerchange", () => {
        if (!refreshing) {
          refreshing = true;
          console.log("Service Worker updated, reloading page...");
          // Force reload to clear old cache
          window.location.reload();
        }
      });
    }
  }, []);

  return null;
}
