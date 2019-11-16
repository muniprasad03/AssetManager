  import { Injectable } from '@angular/core';
  import { Headers, Http } from '@angular/http';
import { HttpParams, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

  //import 'rxjs/add/operator/toPromise';


  @Injectable()
  export class TrackService {
    private headers = new Headers({ 'Content-Type': 'application/json' });
    private setting = 'api/track';  // URL to web api
    constructor(private http: Http,
      private httpClient: HttpClient) { }


    getSignals(): Promise<any> {
      const url = `${this.setting}/list`;
      return this.http.get(url)
        .toPromise()
        .then(response => response.json() as any)
        .catch(this.handleError);
    }

    addSignal(settings: any): any {
      const url = `${this.setting}/add`;
      return this.http.post(url, JSON.stringify(settings), { headers: this.headers })
        .toPromise()
        .catch(this.handleError);
    }

    getSignal(id): Promise<any> {
      const url = `${this.setting}/details/${id}`;
      return this.http.get(url)
        .toPromise()
        .then(response => response.json() as any)
        .catch(this.handleError);
    }

    getValidationOfSignalName(id: number, name: string): Observable<any> {
      id = id || 0;
      const params = new HttpParams().set('id', id.toString())
        .set('name', name);
      const url = `${this.setting}/isUnique`;
      return this.httpClient.get(url, { params });
    }

    updateSignal(settings: any): any {
      const url = `${this.setting}/update/${settings.id}`;
      return this.http.put(url, JSON.stringify(settings), { headers: this.headers })
        .toPromise()
        .catch(this.handleError);
    }

    deleteSignal(settings: any): any {
      const url = `${this.setting}/update/${settings.id}`;
      return this.http.put(url, JSON.stringify(settings), { headers: this.headers })
        .toPromise()
        .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
      console.error('An error occurred', error); // for demo purposes only
      return Promise.reject(error.message || error);
    }

  }
