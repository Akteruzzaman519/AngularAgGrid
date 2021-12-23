import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-uifeature',
  templateUrl: './uifeature.component.html',
  styleUrls: ['./uifeature.component.css']
})
export class UIFeatureComponent implements OnInit {

  acc = document.getElementsByClassName("accordion");

  constructor() { }

  ngOnInit(): void {
    document.getElementById("defaultOpen").click();
  }
  public accordion(acc: any, i) {
    for (i = 0; i < acc.length; i++) {
      acc[i].addEventListener("click", function () {
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if (panel.style.maxHeight) {
          panel.style.maxHeight = null;
        } else {
          panel.style.maxHeight = panel.scrollHeight + "px";
        }
      });
    }
  }

  public Acc() {
    this.accordion(this.acc, 0);
  }


  public openCity(evt, cityName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
  }

}
