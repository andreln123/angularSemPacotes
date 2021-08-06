import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from './post';
import { map, catchError, tap } from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostServiceService {
  isFetching = false;
  loadedPosts: Post[] = [];
  error = new Subject<string>();

  constructor(private http: HttpClient) { }

  public createAndStorePost(postData: Post) {
    this.http.post(
      "http://localhost:8080/Rest/servicos/gravar", 
      postData,
        {
          observe: 'response'
        }).
      subscribe(responseData => {
        console.log(responseData.body);
      }, error => {
        this.error.next(error.message + " teste de erro ...");
      });
    /* return this.http.post(
      "http://localhost:8080/Rest/servicos/gravar", 
      postData); */
  }

  public fectchPost() {
    return this.http.
      get<{[key: string]: Post}>(
      "http://localhost:8080/Rest/servicos/tacaFogo")
        .pipe(
          map((responseData: {[Key: string]: Post}) => {
          const postArray: Post[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              postArray.push({...responseData[key], id: key});
            }
          }
          return postArray;
        }),
        catchError(errorResp => {
          return throwError(errorResp);
        })
        );
  }

  public deletePost() {
    return this.http.delete("http://localhost:8080/Rest/servicos/remover",
    {
      observe: 'events',
      /* responseType: 'text', */ //Por padrão a resposta é json (99% das vezes)
      /* responseType: 'blob', */
      /* headers: new HttpHeaders({'Custom-Header': 'Hello'}), */ //Cabeçalhos customizados
      responseType: 'json' //Não é necessário sobrescrever
    }).
    pipe(tap(event => {
      console.log(event);
    })); 
  }

}
