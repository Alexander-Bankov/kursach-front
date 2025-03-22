// src/app/interfaces/show-application.dto.ts
export interface ShowApplicationDTO {
  createDate: string; // Используйте string агрессивно, или можно использовать Date и преобразовать при получении данных
  desiredDepartureDate: string;
  desiredDateOfReceipt: string;
  desiredPointOfDeparture: string;
  desiredPointOfReceipt: string;
  description: string;
  application: string; // предполагаем, что это строка, замените на нужный тип
  status: string; // предполагаем, что это строка, замените на нужный тип
}
