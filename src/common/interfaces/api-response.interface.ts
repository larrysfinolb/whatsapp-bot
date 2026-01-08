export interface ApiResponse<T = void> {
  success: boolean;
  statusCode: number;
  data?: T;

  error?: string;
  message?: string | string[];
}
