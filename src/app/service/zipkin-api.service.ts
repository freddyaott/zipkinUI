import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import {Trace} from '../model/Trace';
import {RequestTrace} from '../model/RequestTrace';
import {Span} from '../model/Span';
import {JwtHelper} from 'angular2-jwt';

@Injectable()
export class ZipkinApiService {

  private baseUrl = 'http://localhost:9411/api/v1';
  private loginEndpoint = '/oauth/token';
  private serviceEndpoint = '/services';
  private spanEndpoint = '/spans';
  private tracesEndpoint = '/traces'
  private traceEndpoint = '/trace/';


  constructor(public http: HttpClient) { }

  public getServices(): Promise<any> {

    return this.http.get(this.baseUrl + this.serviceEndpoint, { })
      .toPromise()
      .then( data => {
          return data;
        })
      .catch(
        reason => {
          return reason;
        }
      );
  }

  public getSpans(serviceName: string): Promise<any> {

    return this.http.get(this.baseUrl + this.spanEndpoint + '?serviceName=' + serviceName, { })
      .toPromise()
      .then( data => {
        return data;
      })
      .catch(
        reason => {
          return reason;
        }
      );
  }

  public getTraces(request: any): Promise<any>{
    let req = JSON.parse(request.toString())
    let url = this.baseUrl + this.tracesEndpoint +'?';

    if(req.serviceName && req.serviceName != 'all'){
      url +=  'serviceName=' + req.serviceName
    }
    if(req.spanName && req.spanName != 'all'){
      url += '&spanName='+ req.spanName
    }
    if(!req.limit){
      url += '&limit=' + '10'
    }else{
      url += '&limit=' + req.limit;
    }
    if(req.sort){
      url += '&sortOrder=' + req.sort
    }
    if(req.duration){
      url += '&minDuration=' + req.duration
    }

    url+= '&lookback=604980084';

    let endDate = new Date(req.endDate);
    return this.http.get(
      url
      // + '&endTs=' + endDate.getMilliseconds()
      , { })
      .toPromise()
      .then( data => {
        return data;
      })
      .catch(
        reason => {
          return reason;
        }
      );
  }


  public getTrace(request:string): Promise<Array<Span>> {

    if(!this.isLoggedIn()){

    }

    let url = this.baseUrl + this.traceEndpoint + request;

    return this.http.get(
      url, { })
      .toPromise()
        .then( data => {
          return data;
        })
        .catch(reason => {
          return reason;
        });

  }

  public login(username: string, password: string) {
    return this.http.post<any>(
      'http://localhost:8080/oauth/token?grant_type=password&scope=read write&username=' + username + '&password=' + password,
      {},
      {headers: { 'Authorization': 'Basic Y2xpZW50YXBwOjEyMzQ1Ng==' }}
    ).toPromise().then(user => {
        // login successful if there's a jwt token in the response
        if (user && user.access_token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
        }
        return user;
      });
  }

  private handleError(res: Response | any) {
    console.error('Entering handleError');
    console.dir(res.status);

    return res.status;
  }


  public logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }

  isLoggedIn() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let jwtHelper: JwtHelper = new JwtHelper();
    if (currentUser && currentUser.access_token) {
      if(jwtHelper.isTokenExpired(currentUser.access_token)){
        return false;
      }else{
        return true;
      }
    } else{
        return false;
    }
  }
}
