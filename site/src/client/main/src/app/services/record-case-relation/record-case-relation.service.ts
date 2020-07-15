import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class RecordCaseRelationService {

  relationData = [];
  constructor(
    private apiService: ApiService
  ) { }

  loadRelationData(render: string = null) {
    this.apiService.caseRelation(render)
    .subscribe((data) => {
      this.relationData = data;
     // return this.relationData;
    });

  }

  getDateFromKeys(keys: string[]): string {
    const key = keys.join('-');
    let date = 'empty';
    if (this.relationData !== null) {
      for (const relation of this.relationData) {
        if (key === relation.keys.join('-')) {
          date = relation.date;
          break;
        }
      }
    }

    return date;
  }
}
