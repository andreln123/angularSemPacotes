import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, ContentChild, DoCheck, ElementRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.css']
})
export class ServerElementComponent implements 
  OnInit, 
  OnChanges, 
  DoCheck, 
  AfterContentInit, 
  AfterContentChecked,
  AfterViewInit,
  AfterViewChecked,
  OnDestroy {
  @Input() element: {name: string, type: string, content: string}
  @Input() name: string;
  @ViewChild('heading') header: ElementRef;
  @ContentChild('contentParagraph') paragraph: ElementRef;

  constructor() { 
    console.log('Construtor called');
  }
  
  ngOnChanges(changes: SimpleChanges) {
    console.log('ngOnChanges called');
    console.log(changes);
  }

  ngOnInit(): void {
    console.log('ngOnint called');
    /* console.log('Text content: ' + this.header.nativeElement.textContent); */
    //console.log('Text content of paragraph: ' + this.paragraph.nativeElement.textContent  );
  }

  ngDoCheck() {
    console.log("ngDoCheck called");
  }

  ngAfterContentInit() {
    console.log("ngAfterContentInit called");
    console.log('Text content of paragraph: ' + this.paragraph.nativeElement.textContent  );
  }

  ngAfterContentChecked() {
    console.log("ngAfterContentChecked called");
  }
  
  ngAfterViewInit() {
    console.log("ngAfterViewInit called");
    console.log('Text content: ' + this.header.nativeElement.textContent);
  }

  ngAfterViewChecked() {
    console.log("AfterViewChecked called");
  }
  
  ngOnDestroy() {
    console.log("ngOnDestroy called");
  }
}
