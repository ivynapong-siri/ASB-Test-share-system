export const fetchCountries = async () => {
  const cacheKey = "countries_cache";
  const lastFetchKey = "lastFetch";
  const lastFetch = localStorage.getItem(lastFetchKey);
  const currentTime = new Date().getTime();
  const cacheExpiry = 60 * 60 * 1000;

  if (lastFetch && currentTime - Number(lastFetch) < cacheExpiry) {
    const cachedData = localStorage.getItem(cacheKey);
    if (cachedData) {
      console.log("Using cached data");
      return JSON.parse(cachedData);
    }
  }
  try {
    const res = await fetch("https://restcountries.com/v3.1/all?fields=name,cca2", {
      next: {
        tags: ["countries"],
        revalidate: 3600, // 1 hour
      },
    });
    if (!res.ok) {
      throw new Error("Failed to fetch countries");
    }
    const data = await res.json();

    const minimalData = data
      .map((c: any) => ({
        name: c.name.common,
        code: c.cca2,
      }))
      .sort((a: any, b: any) => a.name.localeCompare(b.name));
    localStorage.setItem(cacheKey, JSON.stringify(minimalData));
    localStorage.setItem(lastFetchKey, currentTime.toString());
    return minimalData;
  } catch (error) {
    console.error("Error fetching countries:", error);
    return [];
  }
};
