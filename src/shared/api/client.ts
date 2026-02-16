import { API_BASE_URL } from "@env";

type FetchJsonOptions = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
  headers?: Record<string, string>;
};

// 공통 API 요청 헬퍼. 서버 준비 전에는 baseUrl 유무로만 분기한다.
export async function fetchJson<T>(path: string, options: FetchJsonOptions = {}): Promise<T> {
  if (!API_BASE_URL) {
    throw new Error("API_BASE_URL is not set");
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: options.method ?? "GET",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers ?? {}),
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API Error ${response.status}: ${errorText}`);
  }

  return response.json() as Promise<T>;
}
