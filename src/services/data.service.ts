import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private dataSource = new BehaviorSubject<{ datetime: string, temperature: number }[]>([]);
  currentData = this.dataSource.asObservable();

  constructor() { }

  updateData(newData: { datetime: string, temperature: number }[]) {
    this.dataSource.next(newData);
  }
}
