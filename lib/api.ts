const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4001/api';

export interface ApiResponse<T = any> {
  data?: T;
  error?: string;
}

async function fetcher<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      credentials: 'include', // Incluir cookies
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Erro na requisição' }));
      return { error: error.message || `Erro ${response.status}` };
    }

    const data = await response.json();
    return { data };
  } catch (error: any) {
    return { error: error.message || 'Erro de conexão' };
  }
}

export const api = {
  // Auth
  register: (data: any) => fetcher('/auth/register', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  
  login: (data: any) => fetcher('/auth/login', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  
  logout: () => fetcher('/auth/logout', { method: 'POST' }),
  
  me: () => fetcher('/auth/me'),
  
  refresh: () => fetcher('/auth/refresh', { method: 'POST' }),

  // Plans
  getPlans: () => fetcher('/plans'),
  
  createOrder: (planCode: string) => fetcher('/plans/orders', {
    method: 'POST',
    body: JSON.stringify({ planCode }),
  }),

  // Credits
  getBalance: () => fetcher('/credits/balance'),
  
  getHistory: () => fetcher('/credits/history'),

  // Prompts
  generatePrompt: (data: any) => fetcher('/prompts/generate', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  
  getPrompts: () => fetcher('/prompts'),
  
  getPrompt: (id: string) => fetcher(`/prompts/${id}`),
  
  deletePrompt: (id: string) => fetcher(`/prompts/${id}`, {
    method: 'DELETE',
  }),

  // Videos
  generateVideo: (data: any) => fetcher('/videos/generate', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  
  getVideos: () => fetcher('/videos'),
  
  getVideo: (id: string) => fetcher(`/videos/${id}`),

  // Trends
  getTrends: () => fetcher('/trends'),
};

