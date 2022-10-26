import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class HttpService{
constructor(private _http: HttpClient) {}
private userId: any = null;
private tokenTimer: any;
private token: any = null;
private isAuthenticated = false;
private authStatusListener = new Subject<boolean>();

serviceFunctionTest(){
    return this._http.get('/api/test');
}
secondServicFunctionTest(){
    return this._http.get('/api/test/2')
}
getIsAuth() {
    // console.log('THIS.ISAUTHENTICATED', this.isAuthenticated)
    return this.isAuthenticated;
}
getAuthStatusListener() {
    // console.log('THIS.GETAUTHSTATUSLISTENER', this.authStatusListener)
    return this.authStatusListener;
}
logOut(){
    this.token = null;
    this.userId = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.clearAuthData();
}
private saveAuthData(token: string, expirationDate: Date, userId: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('userId', userId)
}
private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userId')
}
private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    if (!token || !expirationDate) {
        return;
    }
    return {
        token: token,
        expirationDate: new Date(expirationDate)
    }
}
private setAuthTimer(duration: number) {
    console.log("Setting timer " + duration);
    this.tokenTimer = setTimeout(() => {
    console.log(this.tokenTimer)
    this.logOut();
    }, duration * 1000);
}
autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
        this.logOut();
        return;
    }
    console.log(authInformation.token)
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
        this.token = authInformation.token;
        this.isAuthenticated = true;
        this.setAuthTimer(expiresIn / 1000)
        this.authStatusListener.next(true);
    }
}
login(email: string, password: string){
    const authData = { email: email, password: password }
    this._http.post('/api/login', authData).subscribe((response: any) => {
        this.token = response.token
        const expiresInDuration = response.expiresIn;
        this.setAuthTimer(expiresInDuration);
        this.isAuthenticated = true;
        this.userId = response.userId;
        this.authStatusListener.next(true);
        const now = new Date();
        const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
        this.saveAuthData(this.token, expirationDate, response.userId);
    })
}
signUp(newUser: any) {
    this._http.post<{ token: string; expiresIn: number; userId: string }>('/api/signup', newUser).subscribe((response: any) => {
        const token = response.token;
        this.token = token;
        if (token) {
            const expiresInDuration = response.expiresIn;
            this.setAuthTimer(expiresInDuration);
            this.isAuthenticated = true;
            this.userId = response.userId;
            this.authStatusListener.next(true);
            const now = new Date();
            const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
            this.saveAuthData(token, expirationDate, response.userId);
            }
        })
    }
    addCoin(coinData: any ){
        console.log('COIN ID', coinData)
        let userId = localStorage.getItem('userId')
        const apiData = { coin: coinData, userId: userId }
        console.log('API DATA', apiData)
        return this._http.post('/api/addCoin', apiData)
    }
}