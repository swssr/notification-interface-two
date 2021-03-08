import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private _http: HttpClient) { }
  create(data: any) {
    return this._http.post<any>(environment.notification_api_base_url, data).pipe(

      catchError(error => {
        console.log('@@@ api error ==>', error);
        return throwError(error);

      })
    ).toPromise();
  }
}
