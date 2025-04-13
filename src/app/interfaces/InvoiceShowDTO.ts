export interface InvoiceShowDTO {
  invoiceId: number;
  dateCreate: string;          // Дата создания
  descriptionInvoice: string;  // Описание накладной
  status: string;              // Статус накладной
  userConfirmed: string;       // Идентификатор пользователя, подтвердившего накладную
  cost: number;                // Стоимость
  pointOfDeparture: string;    // Точка отправления
  pointOfReceipt: string;      // Точка получения
  applicationId: number;
}
