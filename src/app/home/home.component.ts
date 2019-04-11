import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from "../auth.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
  }

  onServerLoad(id: number) {
    // After complex calculations
    // this.router.navigate(['/servers']);
    this.router.navigate(['servers', id, 'edit'], {queryParams: {'allowEdit': true}, fragment: "Loading"})
  }

  login() {
    this.authService.login();
    Swal.fire(
      'Good job!',
      'You are logged in!',
      'success'
    )
  }

  logout() {
    this.authService.logout();
    Swal.fire(
      'Good job!',
      'You are logged out!',
      'success'
    );
  }
}
