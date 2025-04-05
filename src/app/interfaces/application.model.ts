export interface ShowApplicationDTO {
  id: number;
  createDate: string; // Используйте string для сохранения ISO формата даты
  desiredDepartureDate: string;
  desiredDateOfReceipt: string;
  desiredPointOfDeparture: string;
  desiredPointOfReceipt: string;
  description: string;// Нужно определить этот интерфейс
  applicationStatus: ApplicationStatus; // Нужно определить этот интерфейс
}

export interface ApplicationDTO {
  desiredDepartureDate: string;
  desiredDateOfReceipt: string;
  desiredPointOfDeparture: string;
  desiredPointOfReceipt: string;
  description: string;
}

export enum ApplicationStatus {
  CREATE = 'CREATE',
  REJECTED = 'REJECTED',
  CONSIDERATION = 'НА CONSIDERATION',
  INVOICE_CREATED = 'INVOICE_CREATED'
}
