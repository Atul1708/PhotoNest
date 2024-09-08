import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../env/env';
@Injectable({
  providedIn: 'root',
})
export class CommonService {
  private apiKey = environment.apiKey;

  constructor(private http: HttpClient) {}
  getData(url: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: this.apiKey,
    });
    return this.http.get(url, { headers });
  }

  // common.service.ts
  downloadFile(url: string): Promise<Blob> {
    return fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        return blob;
      });
  }
}
