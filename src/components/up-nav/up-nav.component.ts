import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/services/auth/auth.service';

@Component({
  selector: 'app-up-nav',
  templateUrl: './up-nav.component.html',
  styleUrls: ['./up-nav.component.css']
})
export class UpNavComponent implements OnInit {
  constructor(private userService: AuthService) {}

  currentUser: any = null;

  ngOnInit(): void {
  
    this.currentUser = this.userService.getCurrentUser();  // Fetch the current user
    console.log("this.currentUser",this.currentUser)
  }

  logout(): void {
    this.userService.logout();  // Call logout method to remove user data and token
  }
}
