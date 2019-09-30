import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  menuItems: any = [];

  realMenu: any = [];

  constructor(private route: ActivatedRoute, private apiService: ApiService,
              private location: Location) { }

  ngOnInit() {
    this.getMenuItems();  // step 1
  }

  getMenuItems() { // step 2
    const id = +this.route.snapshot.paramMap.get('id'); // getting that id as string, + converts to number
    this.apiService.getMenu(id).subscribe(data => {
      console.log(data);
      this.menuItems = data;
      this.getRealMenu();

    });
  }

  getRealMenu(){
    for(var i = 0; i < this.menuItems.all_menu_items.length; i++){
      this.apiService.getMenuItem(this.menuItems.all_menu_items[i]).subscribe(data => {
        this.realMenu.push(data);
      });
    }
    console.log(this.realMenu);
  }

  goBack(): void {
    this.location.back();
  }

}
