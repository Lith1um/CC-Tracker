import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { CurrencyModel } from '@core/models';

@Injectable()
export class NomicsService {

  private apiKey = '08c6bab2d3aa00a11058f0b64c931eeb';

  private baseUrl = 'https://api.nomics.com/v1';

  constructor(private http: HttpClient) {}

  getAuthParam(): { key: string } {
    return { key: this.apiKey };
  }

  getCurrencies(page: number = 0): Observable<CurrencyModel[]> {
    return this.http.get<CurrencyModel[]>(`${this.baseUrl}/currencies/ticker`, {
      params: {
        ...this.getAuthParam(),
        convert: 'GBP',
        sort: 'rank',
        status: 'active',
        'per-page': '100',
        page: page.toString()
      }
    });
  }
}
