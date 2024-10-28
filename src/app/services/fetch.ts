import { useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const useFetch = () => {
  const [error, setError] = useState<string | null>(null);

  const fetchData = async (data: any, url: string, method: string) => {
    const fullUrl = `${API_URL}${url}`;
    try {
      const response = await fetch(fullUrl, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(
          `HTTP error! status: ${response.status}, message: ${errorMessage}`
        );
      }

      return await response.json();
    } catch (error) {
      console.error("Fetch error:", error);
      setError((error as Error).message);
      throw error;
    }
  };

  return { fetchData, error };
};
