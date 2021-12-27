import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-window',
  templateUrl: './modal-window.component.html',
  styleUrls: ['./modal-window.component.css']
})
export class ModalWindowComponent implements OnInit {

  public hideshow = false;

  constructor() { }

  ngOnInit(): void {
  }

  public modalOpen() {
    this.hideshow = true;
  }
  public modalClose() {
    this.hideshow = false;
  }
}
