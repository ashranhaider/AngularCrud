import { Component, OnInit } from '@angular/core';
import { HomeModel } from '../../Models/Home';
import { HomeService } from '../../Services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  homeData: HomeModel[];

  constructor(private homeService: HomeService) { }

  ngOnInit() {
    this.homeService.getHomeData().subscribe(x => {
      this.homeData = x;
    });
  }

}
