import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth/auth.service';
import { ThemeService, Theme } from 'src/services/theme/theme.service';

@Component({
  selector: 'app-up-nav',
  templateUrl: './up-nav.component.html',
  styleUrls: ['./up-nav.component.css']
})
export class UpNavComponent implements OnInit {
  constructor(
    private userService: AuthService,
    private themeService: ThemeService,
    private router: Router
  ) { }

  currentUser: any = null;
  currentTheme: Theme = 'dark';

  ngOnInit(): void {
    this.currentUser = this.userService.getCurrentUser();
    console.log("this.currentUser", this.currentUser);

    // Subscribe to theme changes
    this.themeService.theme$.subscribe(theme => {
      this.currentTheme = theme;
    });
  }

  logout(): void {
    this.userService.logout();
    this.router.navigate(['/login']);
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  get isDarkMode(): boolean {
    return this.currentTheme === 'dark';
  }
}
