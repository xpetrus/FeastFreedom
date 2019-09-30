import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from '../user.service';
import { ApiService } from '../api.service';
import { NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

import { Router } from '@angular/router';
import { Time } from '@angular/common';

@Component({
  selector: 'app-kitchen',
  templateUrl: './kitchen.component.html',
  styleUrls: ['./kitchen.component.css']
})
export class KitchenComponent implements OnInit {

  tempKitchens: any = [];
  closeResult: string;
  createdKitchen;
  startTime: Time;
  endTime: Time;
  meridian = true;



  constructor(private userService: UserService, private cookieService: CookieService, private router: Router,
              private apiService: ApiService, private modalService: NgbModal) { }

  ngOnInit() {
    const usrToken = this.cookieService.get('usr-token');
    if (!usrToken) {
      this.router.navigate(['/login']);
    }

    this.apiService.getKitchens().subscribe(
      data => {
        this.tempKitchens = data;
        console.log(this.tempKitchens);
      },
      error => console.log(error)
    );

    this.createdKitchen = {
      name: '',
      work_mon: false,
      work_tue: false,
      work_wed: false,
      work_thu: false,
      work_fri: false,
      work_sat: false,
      work_sun: false,
      start_time: '',
      end_time: '',
      image: ''
    };

  }
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      console.log(reason);
    });
  }

  createKitchen() {
    console.log(this.startTime);
    this.createdKitchen.start_time = this.startTime.hour + ':' + this.startTime.minute;
    this.createdKitchen.end_time = this.endTime.hour + ':' + this.endTime.minute;
    console.log(this.createdKitchen.start_time);
    this.apiService.createKitchen(this.createdKitchen).subscribe(
      response => {
        alert('Kitchen has been created!');
        this.router.navigate(['/kitchens']);
      },
      error => alert('error' + error)  // console.log('error', error)
    );
  }



  logout() {
    this.cookieService.delete('usr-token');
    this.router.navigate(['/login']);
  }

}
