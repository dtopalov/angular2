import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs';
import { ILog, ILocation, User } from 'app/common/models';

@Injectable()
export class DataService {
    private _logsUrl = 'app/common/logs.example.json';
    private _locationsUrl = 'app/common/locations.example.json';
    private _usersUrl = 'app/common/users.example.json';

    constructor(private _http: Http) { }

    private getAll<T>(url: string): Observable<T[]> {
         return this._http.get(url)
            .map((response: Response) => <T[]>response.json())
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    private getById<T>(id: number, url: string): Observable<T> {

        return this._http.get(url)
            .map((response: Response) => <T>response.json())
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    getAllLogs(): Observable<ILog[]> {
       return this.getAll<ILog>(this._logsUrl);
    }

    getLogById(id: number): Observable<ILog> {
        //TODO: refactor to request the item directly
        return this.getAllLogs()
            .map((diveLogs: ILog[]) => diveLogs.find(p => p.id === id));
    }

    getAllLocations(): Observable<ILocation[]> {
        return this.getAll<ILocation>(this._locationsUrl);
    }

    getUserById(id: number): Observable<User>{
        console.log("get all",  this.getAll<User>(this._usersUrl))
         return this.getAll<User>(this._usersUrl)
            .map((users: User[]) => users.find(p => p.id === id));
    }

    private handleError(error: Response) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}