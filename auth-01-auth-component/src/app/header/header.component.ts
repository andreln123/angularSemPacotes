import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {
  private userSub: Subscription;
  isAutenticated = false;

  constructor(private dataStorageService: DataStorageService, private authService: AuthService) {}

  ngOnInit() {
    this.userSub = this.authService.user.subscribe(user => {
      this.isAutenticated = !user ? false : true;
      console.log(user);
      console.log(!!user);
    });
  }

  onSaveData() {
    this.dataStorageService.storeRecipes();
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe();
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}