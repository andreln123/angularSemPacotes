import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() featureSelected = new EventEmitter<string>();

  constructor(private dataStorageService: DataStorageService) { }

  ngOnInit(): void {
  }

  onSelect(feature: string) {
    this.featureSelected.emit(feature);
  }

  public onSaveData(): void {
    this.dataStorageService.storeRecipes();
  }

  public onFetchData(): void {
    this.dataStorageService.fetchRecipes().subscribe();
  }

  /* public onFetchData(): void {
    this.dataStorageService.fetchRecipes();
  } */

}
