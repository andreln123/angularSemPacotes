import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { User } from './user';
import { Post } from './post';
import { PostServiceService } from './post-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  loadedPosts: Post[] = [];
  user = new User('Título1', 'conteúdo1');
  obj = {"title": this.user.title, "content": this.user.content};
  isFetching = false;
  error = null;
  private errorSub: Subscription;

  constructor(private http: HttpClient, private postServiceService: PostServiceService) {}

  ngOnInit() {
    this.fetchPosts();
    /* this.fetchPosts2(); */
    /* this.onCreateGet(); */
    /* this.onCreatePost(this.obj); */

    this.errorSub = this.postServiceService.error.subscribe(messageError => {
      this.error = messageError; 
    });
  }

  onCreatePost(postData: Post) {
    /* this.postServiceService.createAndStorePost(postData).
    subscribe(responseData => {
      console.log(responseData);
    }); */
    this.postServiceService.createAndStorePost(postData);
  }

  public onHandleError(): void {
    this.error = null;
  }

  onCreatePost2(postData: Post) {
    this.http.post(
      "http://localhost:8080/Rest/servicos/gravar", 
      postData).subscribe(responseData => {
        console.log(responseData);
    });
  }

  onCreateGet() {
    let searchParams = new HttpParams(); //Fazendo dessa forma evita-se uma string longa concatenada à URL.
    searchParams = searchParams.append('print', 'pretty');
    searchParams = searchParams.append('custom', 'key');

    this.http.get(
      "http://localhost:8080/Rest/servicos/tacaFogo",
      {
        /* params: new HttpParams().set('print', 'pretty') */
        params: searchParams
      })
        .subscribe(responseData => {
          console.log(responseData);
    });
  }

  onFetchPosts() {
   this.fetchPosts();
  }

  private fetchPosts() { //É possível inscrever vários observadores
      this.isFetching = true;
      this.postServiceService.fectchPost().
      subscribe(posts => {
        this.isFetching = false;
        this.loadedPosts = posts;
        console.log(this.loadedPosts);
    }, error => {
      this.isFetching = false;
      this.error = error.message;
    });
  }

  private fetchPosts2() {
    this.isFetching = true;
    this.http.get<{[key: string]: Post}>(
      "http://localhost:8080/Rest/servicos/tacaFogo")
        .pipe(
          map(responseData => {
          const postArray: Post[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              postArray.push({...responseData[key], id: key});
              /* postArray.push(responseData[key]); */
            }
          }
          return postArray;
        }))
        .subscribe(posts => {
          this.isFetching = false;
          this.loadedPosts = posts;
          /* console.log(posts); */
          console.log(this.loadedPosts);
    });
  }

  onClearPosts() {
    this.postServiceService.deletePost().
      subscribe(() => {
        this.loadedPosts = [];
      });
  }

  ngOnDestroy() {
    this.errorSub.unsubscribe();
  }  
}
