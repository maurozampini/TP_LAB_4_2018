import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public imageSources: string[] = [
    'https://www.cronista.com/__export/1512394972732/sites/diarioelcronista/img/2017/12/04/buenos_aires_hd_2_2.jpg_258117318.jpg',
    'https://www.tangol.com/Fotos/Destinos/buenos-aires_201608180851170.JPG',
    'https://www.cronista.com/__export/1518656820250/sites/diarioelcronista/img/2018/02/14/cc150218c020f10_crop1518656820032.jpg_258117318.jpg'
 ];

  constructor() { }

  ngOnInit() {
  }

}
