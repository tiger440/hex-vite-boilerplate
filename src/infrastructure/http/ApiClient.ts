export interface HttpResponse<T> {
  data: T;
  status: number;
  statusText: string;
}

export class ApiClient {
  constructor(private baseUrl: string) {}

  async get<T>(endpoint: string): Promise<HttpResponse<T>> {
    const response = await fetch(`${this.baseUrl}${endpoint}`);
    const data = await response.json();

    return {
      data,
      status: response.status,
      statusText: response.statusText,
    };
  }

  async post<T>(endpoint: string, body: unknown): Promise<HttpResponse<T>> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    return {
      data,
      status: response.status,
      statusText: response.statusText,
    };
  }

  async put<T>(endpoint: string, body: unknown): Promise<HttpResponse<T>> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    return {
      data,
      status: response.status,
      statusText: response.statusText,
    };
  }

  async delete<T>(endpoint: string): Promise<HttpResponse<T>> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'DELETE',
    });

    const data = await response.json();

    return {
      data,
      status: response.status,
      statusText: response.statusText,
    };
  }
}