import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  menuItems: any = [];
  closeResult: string;
  realMenu: any = [];
  newMenuItem;
  id = +this.route.snapshot.paramMap.get('id');

  constructor(private route: ActivatedRoute, private apiService: ApiService,
              private location: Location, private modalService: NgbModal, private router: Router) { }

  ngOnInit() {
    this.getMenuItems();  // step 1

    this.newMenuItem = {
      kitchen: '',
      name: '',
      is_veg: false,
      price: '',
      description: '',
    };
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

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      console.log(reason);
    });
  }

  createMenuItem(kid) {
    console.log(kid);
    this.newMenuItem.kitchen = 'http://localhost:8000/api/kitchens/' + kid + '/';
    this.apiService.createMenuItem(this.newMenuItem).subscribe(
      response => {
        alert('Menu Item Created!');
        // this.router.navigate(['/menu/' + kid]);
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
        this.router.navigate(['/menu/' + kid]));
      },
      error => alert('error' + error)
    );
  }

  goBack(): void {
    this.location.back();
  }

}
