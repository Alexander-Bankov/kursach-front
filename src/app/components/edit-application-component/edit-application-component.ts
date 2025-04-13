// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
// import { ActivatedRoute, Router } from '@angular/router';
// import { ApplicationService } from '../../services/application.service';
// import { ApplicationDTO } from '../../interfaces/application.model';
// import { CommonModule } from '@angular/common';
//
// declare const ymaps: any;
//
// @Component({
//   selector: 'app-application-edit',
//   templateUrl: './edit-application-component.html',
//   styleUrls: ['./edit-application-component.css'],
//   standalone: true,
//   imports: [
//     CommonModule,
//     ReactiveFormsModule
//   ]
// })
// export class ApplicationEditComponent implements OnInit {
//   applicationForm: FormGroup;
//   applicationId: number | null = null;
//   map: any;
//   selectedPointType: 'departure' | 'receipt' | null = null;
//   isMapVisible: boolean = false;
//   distance: number = 0;
//
//   constructor(
//     private fb: FormBuilder,
//     private applicationService: ApplicationService,
//     private route: ActivatedRoute,
//     private router: Router
//   ) {
//     this.applicationForm = this.fb.group({
//       desiredDepartureDate: [''],
//       desiredDateOfReceipt: [''],
//       desiredPointOfDeparture: [''],
//       desiredPointOfReceipt: [''],
//       description: [''],
//       distance: [0]
//     });
//   }
//
//   ngOnInit() {
//     this.applicationId = this.route.snapshot.params['id'];
//     if (this.applicationId) {
//       this.loadApplication(this.applicationId);
//     }
//   }
//
//   loadApplication(id: number) {
//     this.applicationService.getApplicationById(id).subscribe(application => {
//       this.applicationForm.patchValue(application);
//       this.distance = application.distance;
//     });
//   }
//
//   calculateDistance() {
//     const departure = this.applicationForm.get('desiredPointOfDeparture')?.value;
//     const receipt = this.applicationForm.get('desiredPointOfReceipt')?.value;
//
//     if (departure && receipt) {
//       const requestUrl = `/api/v1/maps/directions?departure=${encodeURIComponent(departure)}&receipt=${encodeURIComponent(receipt)}&lang=ru_RU`;
//
//       console.log('Request URL:', requestUrl); // Логируем URL
//
//       fetch(requestUrl, {
//         method: 'GET',
//         headers: {
//           'Authorization': 'Bearer f406c419-501a-4028-8424-88cc2dcb2d92',
//         }
//       })
//         .then(response => {
//           console.log('Response status:', response.status);
//           if (!response.ok) {
//             return response.text().then(text => {
//               throw new Error(`Error (${response.status}): ${text}`);
//             });
//           }
//           return response.text(); // Получаем текст ответа для отладки
//         })
//         .then(responseText => {
//           console.log('Response text:', responseText); // Лог ответа
//           // Здесь вы должны определить логику обработки текста
//           const distanceMatch = responseText.match(/(\d+(\.\d+)?)\s*км/); // Извлечение по регулярному выражению
//           if (distanceMatch) {
//             this.distance = parseFloat(distanceMatch[1]);
//             this.applicationForm.get('distance')?.setValue(this.distance);
//           } else {
//             console.error('Расстояние не найдено в ответе.');
//           }
//         })
//         .catch(err => {
//           console.error('Ошибка при расчетах расстояния: ', err);
//         });
//     } else {
//       console.error('Пункты отправления и получения должны быть заполнены.');
//     }
//   }
//
//   openMap(selectedPoint: 'departure' | 'receipt') {
//     this.selectedPointType = selectedPoint;
//     this.isMapVisible = true;
//     this.initMap();
//   }
//
//   initMap() {
//     ymaps.ready(() => {
//       this.map = new ymaps.Map('map', {
//         center: [53.200102, 50.100003],
//         zoom: 10
//       });
//
//       this.map.events.add('click', (e: any) => {
//         const coords = e.get('coords');
//         this.getAddressFromCoords(coords);
//       });
//     });
//   }
//
//   getAddressFromCoords(coords: number[]) {
//     const geoCode = ymaps.geocode(coords);
//     geoCode.then((res: any) => {
//       const address = res.geoObjects.get(0).getAddressLine();
//       if (this.selectedPointType === 'departure') {
//         this.applicationForm.get('desiredPointOfDeparture')?.setValue(address);
//       } else if (this.selectedPointType === 'receipt') {
//         this.applicationForm.get('desiredPointOfReceipt')?.setValue(address);
//       }
//     });
//   }
//
//   savePoint() {
//     this.isMapVisible = false;
//   }
//
//   save() {
//     const applicationDTO: ApplicationDTO = this.applicationForm.value;
//     applicationDTO.distance = 0
//
//     if (this.applicationId) {
//       this.applicationService.updateApplication(this.applicationId, applicationDTO).subscribe({
//         next: () => {
//           this.router.navigate(['/applications']);
//         },
//         error: (err) => {
//           console.error('Ошибка при обновлении заявки:', err);
//           // Здесь можно добавить логику для отображения сообщения об ошибке пользователю
//           alert('Произошла ошибка при обновлении заявки. Пожалуйста, попробуйте снова.');
//         }
//       });
//     } else {
//       this.applicationService.createApplication(applicationDTO).subscribe({
//         next: () => {
//           this.router.navigate(['/applications']);
//         },
//         error: (err) => {
//           console.error('Ошибка при создании заявки:', err);
//           // Здесь также можно добавить логику для отображения сообщения об ошибке пользователю
//           alert('Произошла ошибка при создании заявки. Пожалуйста, попробуйте снова.');
//         }
//       });
//     }
//   }
//
//   goBack() {
//     this.router.navigate(['/applications']);
//   }
// }

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationService } from '../../services/application.service';
import { ApplicationDTO } from '../../interfaces/application.model';
import { CommonModule } from '@angular/common';

declare const ymaps: any;

@Component({
  selector: 'app-application-edit',
  templateUrl: './edit-application-component.html',
  styleUrls: ['./edit-application-component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class ApplicationEditComponent implements OnInit {
  applicationForm: FormGroup;
  applicationId: number | null = null;
  map: any;
  selectedPointType: 'departure' | 'receipt' | null = null;
  isMapVisible: boolean = false;
  distance: number = 0;
  travelTime: number = 0; // Время в пути в минутах

  constructor(
    private fb: FormBuilder,
    private applicationService: ApplicationService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.applicationForm = this.fb.group({
      desiredDepartureDate: [''],
      desiredDateOfReceipt: [''],
      desiredPointOfDeparture: [''],
      desiredPointOfReceipt: [''],
      description: [''],
      distance: [0]
    });
  }

  ngOnInit() {
    this.applicationId = this.route.snapshot.params['id'];
    if (this.applicationId) {
      this.loadApplication(this.applicationId);
    }
  }

  loadApplication(id: number) {
    this.applicationService.getApplicationById(id).subscribe(application => {
      this.applicationForm.patchValue(application);
      this.distance = application.distance;
    });
  }

  updateReceiptDate() {
    const departureDate = this.applicationForm.get('desiredDepartureDate')?.value;

    if (departureDate && this.travelTime) {
      // Создаем объект Date из строки, полученной из поля ввода
      const departureTime = new Date(departureDate);

      // Добавляем время в пути (в миллисекундах)
      const receiptTime = new Date(departureTime.getTime() + this.travelTime * 60000); // Время, рассчитанное при помощи маршрута

      // Добавляем 4 часа (4 часа = 4 * 60 минут * 60 секунд * 1000 миллисекунд)
      receiptTime.setHours(receiptTime.getHours() + 4);

      // Устанавливаем дату получения в формате ISO. slice(0, 16) обрезает миллисекунды, чтобы оставался только нужный формат
      this.applicationForm.get('desiredDateOfReceipt')?.setValue(receiptTime.toISOString().slice(0, 16));
    }
  }

// Теперь в методе calculateDistance вызываем updateReceiptDate только после успешного расчета
  calculateDistance() {
    const departure = this.applicationForm.get('desiredPointOfDeparture')?.value;
    const receipt = this.applicationForm.get('desiredPointOfReceipt')?.value;

    if (departure && receipt) {
      ymaps.route([departure, receipt]).then((route: any) => {
        const distanceInMeters = route.getLength(); // Расстояние в метрах
        const timeInSeconds = route.getTime(); // Время в пути в секундах

        this.distance = parseFloat((distanceInMeters / 1000).toFixed(2)); // Переводим в километры
        this.travelTime = Math.ceil(timeInSeconds / 60); // Переводим в минуты
        console.log(this.travelTime);

        this.applicationForm.get('distance')?.setValue(this.distance);

        // Теперь вызываем обновление времени получения
        this.updateReceiptDate();
      }).catch((err: any) => {
        console.error('Ошибка при расчете маршрута:', err);
      });
    } else {
      console.error('Пункты отправления и получения должны быть заполнены.');
    }
  }

  // calculateDistance() {
  //   const departure = this.applicationForm.get('desiredPointOfDeparture')?.value;
  //   const receipt = this.applicationForm.get('desiredPointOfReceipt')?.value;
  //
  //   if (departure && receipt) {
  //     const geocodeUrl = `https://api-maps.yandex.ru/services/route/2.1/?lang=ru_RU&apikey=f406c419-501a-4028-8424-88cc2dcb2d92`;
  //
  //     ymaps.route([departure, receipt]).then((route: any) => {
  //       const distanceInMeters = route.getLength();
  //       const timeInSeconds = route.getTime();
  //
  //       this.distance = parseFloat((distanceInMeters / 1000).toFixed(2)); // Переводим в километры
  //       this.travelTime = Math.ceil(timeInSeconds / 60); // Переводим в минуты
  //
  //       this.applicationForm.get('distance')?.setValue(this.distance);
  //       this.updateReceiptDate();
  //     }).catch((err: any) => {
  //       console.error('Ошибка при расчете маршрута:', err);
  //     });
  //   } else {
  //     console.error('Пункты отправления и получения должны быть заполнены.');
  //   }
  // }
  //
  // updateReceiptDate() {
  //   const departureDate = this.applicationForm.get('desiredDepartureDate')?.value;
  //
  //   if (departureDate && this.travelTime) {
  //     const departureTime = new Date(departureDate);
  //     const receiptTime = new Date(departureTime.getTime() + this.travelTime * 60000); // Добавляем время в пути
  //     this.applicationForm.get('desiredDateOfReceipt')?.setValue(receiptTime.toISOString().slice(0, 16));
  //   }
  // }

  openMap(selectedPoint: 'departure' | 'receipt') {
    this.selectedPointType = selectedPoint;
    this.isMapVisible = true;
    this.initMap();
  }

  initMap() {
    ymaps.ready(() => {
      this.map = new ymaps.Map('map', {
        center: [53.200102, 50.100003],
        zoom: 10
      });

      this.map.events.add('click', (e: any) => {
        const coords = e.get('coords');
        this.getAddressFromCoords(coords);
      });
    });
  }

  getAddressFromCoords(coords: number[]) {
    const geoCode = ymaps.geocode(coords);
    geoCode.then((res: any) => {
      const address = res.geoObjects.get(0).getAddressLine();
      if (this.selectedPointType === 'departure') {
        this.applicationForm.get('desiredPointOfDeparture')?.setValue(address);
      } else if (this.selectedPointType === 'receipt') {
        this.applicationForm.get('desiredPointOfReceipt')?.setValue(address);
      }
      this.isMapVisible = false;
    });
  }
    savePoint() {
    this.isMapVisible = false;
  }

  save() {
    const applicationDTO: ApplicationDTO = this.applicationForm.value;

    if (this.applicationId) {
      this.applicationService.updateApplication(this.applicationId, applicationDTO).subscribe({
        next: () => {
          this.router.navigate(['/applications']);
        },
        error: (err) => {
          console.error('Ошибка при обновлении заявки:', err);
          alert('Произошла ошибка при обновлении заявки. Пожалуйста, попробуйте снова.');
        }
      });
    } else {
      this.applicationService.createApplication(applicationDTO).subscribe({
        next: () => {
          this.router.navigate(['/applications']);
        },
        error: (err) => {
          console.error('Ошибка при создании заявки:', err);
          alert('Произошла ошибка при создании заявки. Пожалуйста, попробуйте снова.');
        }
      });
    }
  }

  goBack() {
    this.router.navigate(['/applications']);
  }
}
