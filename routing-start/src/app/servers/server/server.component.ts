import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, DoCheck, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { ServersService } from '../servers.service';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
  server: {id: number, name: string, status: string};
  paramsSubscription: Subscription;
  id: number = 0;

  constructor(private serversService: ServersService, 
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.route.data.subscribe(
      (data: Data) => {
        this.server = data['server'];
      }
    )

    /* this.id = +this.route.snapshot.params['id'];
    this.server = this.serversService.getServer(this.id); */

   /*  this.user = {
      id: this.route.snapshot.params['id'],
      name: this.route.snapshot.params['name']
    }

    this.paramsSubscription = this.route.params
      .subscribe(
        (params: Params) => {
          this.user.id = params['id'];
          this.user.name = params['name'];
        }
      ); */

    /* this.paramsSubscription = this.route.params
      .subscribe(
        (params: Params) => {
          this.server = this.serversService.getServer(+params[this.id]);
        }
      ); */
  }

  onEdit() {
    /* this.router.navigate(['/servers', this.server.id, 'edit']); */
    this.router.navigate(['edit'], {relativeTo: this.route, queryParamsHandling: 'preserve'});
  }

}
