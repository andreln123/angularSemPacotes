import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
  id: number;
  private activatedSub: Subscription;

  constructor(private route: ActivatedRoute, private userService: UserService) {  }

  ngOnInit() {
    this.activatedSub = this.route.params.subscribe((params: Params) => {
      this.id = +params.id;
    });
  }

  onActivate() {
    /* this.userService.activatedEmitter.emit(true); */
    this.userService.activatedEmitter.next(true);
  }

  ngOnDestroy() {
    this.activatedSub.unsubscribe();
  }
}
