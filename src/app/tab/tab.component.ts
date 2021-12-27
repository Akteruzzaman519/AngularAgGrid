import { Component, HostListener, OnInit, Renderer2, ViewChild, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.css']
})
export class TabComponent implements OnInit {

  @ViewChild('london', { read: ViewContainerRef }) private eLondon;
  @ViewChild('paris', { read: ViewContainerRef }) private eParis;
  @ViewChild('tokyo', { read: ViewContainerRef }) private eTokyo;
  @ViewChild('divLondon', { read: ViewContainerRef }) private eDivLondon;
  @ViewChild('divParis', { read: ViewContainerRef }) private eDivParis;
  @ViewChild('divTokyo', { read: ViewContainerRef }) private eDivTokyo;

  constructor(private rend: Renderer2) { }

  ngOnInit(): void {
  }

  @HostListener('click', ['$event'])
  private itemClick(event): void {
    const itemID = event.target.id;
    debugger
    if (this.eLondon) {
      if (this.eLondon.element.nativeElement.id == itemID) {
        this.rend.removeClass(this.eParis.element.nativeElement, "active");
        this.rend.removeClass(this.eTokyo.element.nativeElement, "active");
        this.rend.addClass(this.eLondon.element.nativeElement, "active");

        this.rend.removeClass(this.eDivParis.element.nativeElement, "d-block");
        this.rend.removeClass(this.eDivTokyo.element.nativeElement, "d-block");
        this.rend.removeClass(this.eDivLondon.element.nativeElement, "d-none");

        this.rend.addClass(this.eDivParis.element.nativeElement, "d-none");
        this.rend.addClass(this.eDivTokyo.element.nativeElement, "d-none");
        this.rend.addClass(this.eDivLondon.element.nativeElement, "d-block");
      }
    }
    if (this.eParis) {
      if (this.eParis.element.nativeElement.id == itemID) {
        this.rend.removeClass(this.eLondon.element.nativeElement, "active");
        this.rend.removeClass(this.eTokyo.element.nativeElement, "active");
        this.rend.addClass(this.eParis.element.nativeElement, "active");

        this.rend.removeClass(this.eDivLondon.element.nativeElement, "d-block");
        this.rend.removeClass(this.eDivTokyo.element.nativeElement, "d-block");
        this.rend.removeClass(this.eDivParis.element.nativeElement, "d-none");

        this.rend.addClass(this.eDivLondon.element.nativeElement, "d-none");
        this.rend.addClass(this.eDivTokyo.element.nativeElement, "d-none");
        this.rend.addClass(this.eDivParis.element.nativeElement, "d-block");
      }
    }
    if (this.eTokyo) {
      if (this.eTokyo.element.nativeElement.id == itemID) {
        this.rend.removeClass(this.eLondon.element.nativeElement, "active");
        this.rend.removeClass(this.eParis.element.nativeElement, "active");
        this.rend.addClass(this.eTokyo.element.nativeElement, "active");

        this.rend.removeClass(this.eDivLondon.element.nativeElement, "d-block");
        this.rend.removeClass(this.eDivParis.element.nativeElement, "d-block");
        this.rend.removeClass(this.eDivTokyo.element.nativeElement, "d-none");

        this.rend.addClass(this.eDivLondon.element.nativeElement, "d-none");
        this.rend.addClass(this.eDivParis.element.nativeElement, "d-none");
        this.rend.addClass(this.eDivTokyo.element.nativeElement, "d-block");

      }
    }

  }


}
