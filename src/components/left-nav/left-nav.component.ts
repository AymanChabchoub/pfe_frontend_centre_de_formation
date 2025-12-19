import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/services/auth/auth.service';

@Component({
  selector: 'app-left-nav',
  templateUrl: './left-nav.component.html',
  styleUrls: ['./left-nav.component.css']
})
export class LeftNavComponent implements OnInit {
  constructor(private userService: AuthService) {}

  currentUser: any = null;
  FormateurId!:number

  ngOnInit(): void {
    
    this.currentUser = this.userService.getCurrentUser();  // Fetch the current user
    this.FormateurId=this.currentUser.id
    console.log("this.currentUser",this.currentUser)
  }          


  logout(): void {
    this.userService.logout();  // Call logout method to remove user data and token
  }
}
