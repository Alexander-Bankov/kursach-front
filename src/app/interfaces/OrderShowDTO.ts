export interface OrderShowDTO {
  id: number;                   // Идентификатор заказа
  dateStartExecution: string;   // Дата начала исполнения (можно использовать Date, но для отправки/получения из API лучше string)
  endDateExecution: string;     // Дата завершения исполнения
  status: string;               // Статус заказа (можно заменить на перечисление, если у вас есть типы статусов)
  idApplication: number;        // Идентификатор заявки, к которой относится заказ
}
