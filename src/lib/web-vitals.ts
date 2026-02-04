/**
 * Web Vitals Monitoring
 * Tracks Core Web Vitals metrics and sends to analytics
 */

type MetricValue = {
  name: string;
  value: number;
  rating: "good" | "needs-improvement" | "poor";
  delta: number;
  id: string;
};

/**
 * Send metrics to analytics service
 * Replace this with your actual analytics implementation
 */
function sendToAnalytics(metric: MetricValue) {
  // Example: Send to Google Analytics
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("event", metric.name, {
      value: Math.round(metric.value),
      metric_id: metric.id,
      metric_value: metric.value,
      metric_delta: metric.delta,
      metric_rating: metric.rating,
    });
  }

  // Example: Send to custom analytics endpoint
  if (process.env.NEXT_PUBLIC_ANALYTICS_URL) {
    fetch(process.env.NEXT_PUBLIC_ANALYTICS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        metric: metric.name,
        value: metric.value,
        rating: metric.rating,
        page: window.location.pathname,
        timestamp: Date.now(),
      }),
      keepalive: true,
    }).catch((error) => {
      console.error("Failed to send web vitals:", error);
    });
  }

  // Development logging
  if (process.env.NODE_ENV === "development") {
    console.log(`[Web Vitals] ${metric.name}:`, {
      value: Math.round(metric.value),
      rating: metric.rating,
      delta: Math.round(metric.delta),
    });
  }
}

/**
 * Get rating based on metric thresholds
 */
function getRating(name: string, value: number): "good" | "needs-improvement" | "poor" {
  switch (name) {
    case "CLS":
      // Cumulative Layout Shift
      if (value <= 0.1) return "good";
      if (value <= 0.25) return "needs-improvement";
      return "poor";

    case "FID":
      // First Input Delay
      if (value <= 100) return "good";
      if (value <= 300) return "needs-improvement";
      return "poor";

    case "LCP":
      // Largest Contentful Paint
      if (value <= 2500) return "good";
      if (value <= 4000) return "needs-improvement";
      return "poor";

    case "FCP":
      // First Contentful Paint
      if (value <= 1800) return "good";
      if (value <= 3000) return "needs-improvement";
      return "poor";

    case "TTFB":
      // Time to First Byte
      if (value <= 800) return "good";
      if (value <= 1800) return "needs-improvement";
      return "poor";

    case "INP":
      // Interaction to Next Paint
      if (value <= 200) return "good";
      if (value <= 500) return "needs-improvement";
      return "poor";

    default:
      return "good";
  }
}

/**
 * Report Web Vitals
 * This function is called by Next.js automatically
 */
export function reportWebVitals(metric: any) {
  const metricValue: MetricValue = {
    name: metric.name,
    value: metric.value,
    rating: getRating(metric.name, metric.value),
    delta: metric.delta || 0,
    id: metric.id,
  };

  sendToAnalytics(metricValue);
}

/**
 * Get current page performance metrics
 * Can be called manually for debugging
 */
export function getPerformanceMetrics() {
  if (typeof window === "undefined" || !window.performance) {
    return null;
  }

  const navigation = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming;
  const paint = performance.getEntriesByType("paint");

  return {
    // Navigation timing
    dns: navigation.domainLookupEnd - navigation.domainLookupStart,
    tcp: navigation.connectEnd - navigation.connectStart,
    ttfb: navigation.responseStart - navigation.requestStart,
    download: navigation.responseEnd - navigation.responseStart,
    domProcessing: navigation.domContentLoadedEventEnd - navigation.responseEnd,
    onLoad: navigation.loadEventEnd - navigation.loadEventStart,
    total: navigation.loadEventEnd - navigation.fetchStart,

    // Paint timing
    fcp: paint.find((entry) => entry.name === "first-contentful-paint")?.startTime || 0,

    // Memory (if available)
    memory: (performance as any).memory
      ? {
          usedJSHeapSize: Math.round((performance as any).memory.usedJSHeapSize / 1024 / 1024),
          totalJSHeapSize: Math.round((performance as any).memory.totalJSHeapSize / 1024 / 1024),
          jsHeapSizeLimit: Math.round((performance as any).memory.jsHeapSizeLimit / 1024 / 1024),
        }
      : null,
  };
}

/**
 * Log performance metrics to console (development only)
 */
export function logPerformanceMetrics() {
  if (process.env.NODE_ENV !== "development") return;

  const metrics = getPerformanceMetrics();
  if (!metrics) return;

  console.table({
    "DNS Lookup": `${Math.round(metrics.dns)}ms`,
    "TCP Connection": `${Math.round(metrics.tcp)}ms`,
    TTFB: `${Math.round(metrics.ttfb)}ms`,
    Download: `${Math.round(metrics.download)}ms`,
    "DOM Processing": `${Math.round(metrics.domProcessing)}ms`,
    "On Load": `${Math.round(metrics.onLoad)}ms`,
    "Total Load Time": `${Math.round(metrics.total)}ms`,
    "First Contentful Paint": `${Math.round(metrics.fcp)}ms`,
  });

  if (metrics.memory) {
    console.log("Memory Usage:", metrics.memory);
  }
}

/**
 * Monitor long tasks (tasks taking >50ms)
 */
export function monitorLongTasks() {
  if (typeof window === "undefined" || !("PerformanceObserver" in window)) {
    return;
  }

  try {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.duration > 50) {
          if (process.env.NODE_ENV === "development") {
            console.warn(`⚠️ Long task detected: ${Math.round(entry.duration)}ms`, entry);
          }

          // Send to analytics
          sendToAnalytics({
            name: "LongTask",
            value: entry.duration,
            rating: entry.duration > 100 ? "poor" : "needs-improvement",
            delta: entry.duration,
            id: `long-task-${Date.now()}`,
          });
        }
      }
    });

    observer.observe({ entryTypes: ["longtask"] });
  } catch (error) {
    // PerformanceLongTaskTiming not supported
    console.warn("Long task monitoring not supported");
  }
}

/**
 * Monitor layout shifts
 */
export function monitorLayoutShifts() {
  if (typeof window === "undefined" || !("PerformanceObserver" in window)) {
    return;
  }

  try {
    let clsValue = 0;
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries() as any[]) {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;

          if (process.env.NODE_ENV === "development" && entry.value > 0.1) {
            console.warn(`⚠️ Large layout shift detected: ${entry.value.toFixed(4)}`, entry.sources);
          }
        }
      }
    });

    observer.observe({ type: "layout-shift", buffered: true });
  } catch (error) {
    console.warn("Layout shift monitoring not supported");
  }
}

/**
 * Initialize all performance monitoring
 * Call this in _app.tsx or layout.tsx
 */
export function initPerformanceMonitoring() {
  if (typeof window === "undefined") return;

  // Log metrics in development
  if (process.env.NODE_ENV === "development") {
    window.addEventListener("load", () => {
      setTimeout(logPerformanceMetrics, 1000);
    });
  }

  // Monitor long tasks and layout shifts
  monitorLongTasks();
  monitorLayoutShifts();
}
