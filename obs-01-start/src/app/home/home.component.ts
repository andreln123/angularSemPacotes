import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription, Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  private firstObsSubscrition: Subscription;

  constructor() { }

  ngOnInit() {
    /* this.firstObsSubscrition = interval( 1000 ).subscribe(
      count => {
        console.log(count);
      }
    ) */

    const customIntervalOnservable = Observable.create(
      observer => {
        let count = 0;
        setInterval(() => {
          observer.next(count);
          
          if (count === 5)
            observer.complete();
          if (count > 3)
            observer.error(new Error('Count is greater 3 !'));
            

          count++;
        }, 1000);
      }
    );
    
    /* customIntervalOnservable.pipe(map((data: number) => {
      return 'Round ' + (data + 5);
    })); */

    this.firstObsSubscrition = customIntervalOnservable.pipe(filter(data => {
      return (data > 1);
    }), map((data: number) => {
      return 'Round ' + (data + 5);
    })).subscribe(data => {
      console.log(data);
    }, error => {
      console.log(error);
    }, () => {
      console.log('Complete !');
    });
    
    /* this.firstObsSubscrition = customIntervalOnservable.subscribe(data => {
      console.log(data);
    }, error => {
      console.log(error);
    }, () => {
      console.log('Complete !');
    }); */
  }

  ngOnDestroy(): void {
    this.firstObsSubscrition.unsubscribe();
  }

}
