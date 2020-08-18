import { Injectable, Inject } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Model } from '../../models/model';
import { UseCaseModel } from '../../models/use-case.model';




@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(
    @Inject(APP_BASE_HREF) private baseHref: string,
    private http: HttpClient
  ) { }

  caseRelation(): Observable<any> {
    return this.http.get<any>('api/' + this.version() + '/relation');
  }

  reportList(): Observable<any> {
    return this.http.get<any>('api/' + this.version() + '/reportList');
  }

  model(keys: string[]): Observable<Model> {
    return this.http.get<Model>('api/' + this.version() + '/model/' + keys?.join('/'));
  }


  useCase(keys: string[]): Observable<UseCaseModel> {
    return this.http.get<UseCaseModel>('api/' + this.version() + '/usecase/' + keys.join('/'));
  }

  data(keys: string[]): Observable<object> {
    return this.http.get<object>('api/' + this.version() + '/data/' + keys.slice(1).join('/'));
  }

  geojson(keys: string[]): Observable<object> {
    return this.http.get<object>('api/' + this.version() + '/geojson/' + keys.slice(1).join('/'));
  }

  version(): string {
    switch (this.baseHref) {
      case '/':
        return 'develop';
      case '/ar':
        return 'ar';
      case '/sjs':
        return 'sjs';
      case '/gces':
        return 'gces';
      default:
        return 'develop';
    }
  }
}
