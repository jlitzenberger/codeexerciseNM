import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { TeamArrest } from '../model/teamarrest.model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import { environment } from '../../environments/environment';

@Injectable()
export class GitService {

    constructor(private _http: Http) { }

    getApi(): Observable<TeamArrest[]> {
        let params: URLSearchParams = new URLSearchParams();

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers, search: params, withCredentials: false });

        return this._http.get("api/GitApi", options)
            .map((response: Response) => {
                return <TeamArrest[]>response.json();
            })
            .catch(this.handleError);        
    }

    private handleError(error: Response) {
        return Observable.throw(error);
    }
}