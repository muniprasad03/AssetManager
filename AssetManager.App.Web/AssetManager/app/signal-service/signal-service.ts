import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

//import 'rxjs/add/operator/toPromise';


@Injectable()
export class SignalService {
    private headers = new Headers({ 'Content-Type': 'application/json' });
    private setting = 'api/signal';  // URL to web api
    constructor(private http: Http) { }


    getSignals(): Promise<any> {
      const url = `${this.setting}/list`;
        return this.http.get(url)
            .toPromise()
            .then(response => response.json() as any)
            .catch(this.handleError);
    }

    addSignal(settings: any): any {
      const url = `${this.setting}/add`;
        return this.http.put(url, JSON.stringify(settings), { headers: this.headers })
            .toPromise()
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

}
