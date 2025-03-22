// src/app/interfaces/LoginResponse.ts
export interface LoginResponse {
  message: string;  // Сообщение об успешной или неуспешной авторизации
  email: string;    // Email пользователя
  role: string;     // Роль пользователя
}
