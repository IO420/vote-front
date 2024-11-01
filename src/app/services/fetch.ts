import { useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const useFetch = () => {
  const [error, setError] = useState<string | null>(null);

  const fetchData = async (data: any, url: string, method: string, withToken = false) => {
    const fullUrl = `${API_URL}${url}`;
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    if (withToken) {
      const token = localStorage.getItem("Token");
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }
    }

    try {
      const options: RequestInit = {
        method: method,
        headers: headers,
      };

      if (method !== "GET" && method !== "HEAD") {
        options.body = JSON.stringify(data);
      }

      const response = await fetch(fullUrl, options);
      const responseBody = await response.clone().json().catch(() => response.text());

      if (!response.ok) {
        const errorMessage = responseBody instanceof Object ? responseBody.message || 'Error' : responseBody;
        setError(errorMessage);
      }

      return responseBody;
    } catch (error) {
      console.error("Fetch error:", error);
      setError((error as Error).message);
      throw error;
    }
  };

  return { fetchData, error };
};
