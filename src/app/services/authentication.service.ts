import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Employee } from '../models/Employee-model';
import { AlertService } from '../services/alert.service'

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<Employee>;
    public currentUser: Observable<Employee>;
    

    constructor(private http: HttpClient, private alertService: AlertService) {
        this.currentUserSubject = new BehaviorSubject<Employee>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    readonly APIUrl = 'https://localhost:44381/api';

    public get currentUserValue(): Employee {
        return this.currentUserSubject.value;
    }
    
    login(MailID, Password) {
        return this.http.get<any>(this.APIUrl + '/Employee/authenticate')
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                //console.log(user);
                for (let i = 0; i < user.length; ++i) {
                    if (user[i].MailID === MailID && user[i].Password === Password){
                        //console.log(user[i].MailID);
                        //console.log(user[i].Password);
                        localStorage.setItem('currentUser', JSON.stringify(user));
                        this.currentUserSubject.next(user);
                        return user;
                    } 
                    //console.log (user[i].MailID);
                }          
            }));
    }

    isUserLoggedIn() {
        let user = sessionStorage.getItem('MailID')
        console.log(!(user === null))
        return !(user === null)
    }

    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}