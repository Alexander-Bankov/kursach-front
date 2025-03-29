export interface ShowApplicationDTO {
  id: number;
  createDate: string; // Используйте string для сохранения ISO формата даты
  desiredDepartureDate: string;
  desiredDateOfReceipt: string;
  desiredPointOfDeparture: string;
  desiredPointOfReceipt: string;
  description: string;
  application: ApplicationStatus; // Нужно определить этот интерфейс
  status: ApplicationStatus; // Нужно определить этот интерфейс
}

export interface ApplicationDTO {
  desiredDepartureDate: string;
  desiredDateOfReceipt: string;
  desiredPointOfDeparture: string;
  desiredPointOfReceipt: string;
  description: string;
}

export enum ApplicationStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED"
}
