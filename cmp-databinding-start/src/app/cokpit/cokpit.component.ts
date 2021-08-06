import { Component, ElementRef, EventEmitter, OnInit, Output, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-cokpit',
  templateUrl: './cokpit.component.html',
  styleUrls: ['./cokpit.component.css']
})
export class CokpitComponent implements OnInit {
  @Output() serverCreated = new EventEmitter<{serverName: string, serverContent: string}>();
  @Output() bluePrintCreated = new EventEmitter<{serverName: string, serverContent: string}>();
  /* newServerName = ''; */
  //newServerContent = '';
  @ViewChild('serverContentInput') serverContentInput: ElementRef;
  @Input() testeEntrada;

  constructor() { }

  ngOnInit(): void {
  }

 /*  onAddServer() {
    this.serverCreated.emit({serverName: this.newServerName, serverContent: this.newServerContent});
  } */
  onAddServer(nameInput: HTMLInputElement) {
    this.serverCreated.emit({serverName: nameInput.value, serverContent: this.serverContentInput.nativeElement.value});
  }

  /* onAddBlueprint() {
    this.bluePrintCreated.emit({serverName: this.newServerName, serverContent: this.newServerContent});
  } */
  onAddBlueprint(nameInput: HTMLInputElement) {
    //this.serverContentInput.nativeElement.value = "Test";
    this.bluePrintCreated.emit({serverName: nameInput.value, serverContent: this.serverContentInput.nativeElement.value});
  }

}
