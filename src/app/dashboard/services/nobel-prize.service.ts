import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { NobelPrize, PersonalInfo } from '../models/internals/nobel-prize';
import { Category } from '../models/internals/category';
import { NobelPrizeResponse } from '../models/externals/nobel-prize-response';
@Injectable({
  providedIn: 'root',
})
export class NobelPrizeService {
  private baseUrl = 'https://api.nobelprize.org/2.1';
  private _currentNobelPrize: NobelPrize;
  constructor(private http: HttpClient) {}

  public get currentNobelPrize(): NobelPrize {
    return this._currentNobelPrize;
  }
  public set currentNobelPrize(value: NobelPrize) {
    this._currentNobelPrize = value;
  }
  /**
   * Funcion que obtiene las categorias para el premio nobel
   *  NOTA: No he encontrada ninguna llamada para obtener las categorias en el swagger,
   * y las obtenemos del JSON creado
   * @returns
   */
  getCategories(): Observable<Category[]> {
    const url = '../../assets/categories.json';
    return this.http.get<Category[]>(url);
  }

  /**
   * Función que obtiene premios nobel por año y categoria
   * @param category categoria para los premios
   * @param year año para los premios
   * @returns un objeto de tipo NobelPrize
   */
  getNobelPrize(category: string, year: number): Observable<NobelPrize> {
    const url = `${this.baseUrl}/nobelPrize/${category}/${year}`;
    return this.http.get<NobelPrizeResponse[]>(url).pipe(
      map((response: NobelPrizeResponse[]) => {
        let laureates: PersonalInfo[] = [];
        response[0].laureates.map((laureate) => {
          let personalInfo:PersonalInfo={
            motivation:"",
            portion:"",
            knownName:""
          };
          personalInfo.motivation=laureate.motivation.en;
          personalInfo.portion=laureate.portion;
          if (laureate.knownName) {
            personalInfo.knownName=laureate.knownName.en;
          } else if (laureate.orgName) {
            personalInfo.knownName=laureate.orgName.en;

          }
          laureates.push(personalInfo);
        });
        return {
          awardYear: parseInt(response[0].awardYear),
          laureates: laureates,
        };
      })
    );
  }
}
