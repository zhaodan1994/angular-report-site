import { Injectable, Inject } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { Model } from '../../models/model';
import { UseCaseModel } from '../../models/use-case.model';
import { catchError } from 'rxjs/operators';
import { ReportModel } from '../../models/report.model';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};

interface IDataStatus {
  data: string
}

interface IReportData {
  svg : any[],
  canvas: any[]
}


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(
    @Inject(APP_BASE_HREF) private baseHref: string,
    private http: HttpClient
  ) { }


  updateCases(cases: string[][]): Observable<object> {
    return this.http.post<string[][]>('api/' + this.version() + '/' + this.render() +  '/updateCases', cases, httpOptions)
      .pipe(
        catchError(this.handleError('updateCases', cases))
      );
  }

  createReport(report: ReportModel): Observable<object> {
    return this.http.post<string[][]>('api/' + this.version() + '/createReport', report, httpOptions)
      .pipe(
        catchError(this.handleError('createReport', report))
      );
  }

  caseRelation(render: string): Observable<[]> {
    if (render == null) {
      render = this.render();
    }
    return this.http.get<[]>('api/' + this.version() + '/' + render + '/relation');
  }

  reportDetails(path: string): Observable<object> {
    return this.http.get<object>('api/' + this.version() + '/reportDetails/' + path);
  }

  reportList(): Observable<IReportData> {
    return this.http.get<IReportData>('api/' + this.version() + '/reportList');
  }

  deleteReport(): Observable<IDataStatus> {
    return this.http.get<IDataStatus>('api/' + this.version() + '/deleteReport');
  }

  comparedReportList(): Observable<IReportData> {
    return this.http.get<IReportData>('api/' + this.version() + '/comparedReportList');
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

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
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

  render(): string {
    const urlArray = window.location.href.split('/');
    const render = urlArray[urlArray.indexOf('report')+1];
    return render;
  }
}
