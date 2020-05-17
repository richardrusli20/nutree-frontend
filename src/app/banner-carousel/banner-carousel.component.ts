import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-banner-carousel',
  templateUrl: './banner-carousel.component.html',
  styleUrls: ['./banner-carousel.component.scss']
})
export class BannerCarouselComponent implements OnInit {

  customOptions: OwlOptions = {
    items: 1,
    autoWidth:true,
    autoplay: true,
    loop:true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    nav: false
  }
  slidesStore = [
    {
      id:1,
      src:'https://i.picsum.photos/id/976/400/250.jpg',
      alt:'Image_1',
      title:'Image_1'
    },
    {
      id:2,
      src:'https://i.picsum.photos/id/996/400/250.jpg',
      alt:'Image_2',
      title:'Image_3'
    },
    {
      id:3,
      src:'https://i.picsum.photos/id/400/400/250.jpg',
      alt:'Image_3',
      title:'Image_3'
    }
  ]

  startDragging(event){
    console.log(event);
  }

  constructor() { }

  ngOnInit(): void {
  }

}
