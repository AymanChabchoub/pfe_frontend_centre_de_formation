import { Component, OnInit } from '@angular/core';
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
    private themeService: ThemeService
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
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  get isDarkMode(): boolean {
    return this.currentTheme === 'dark';
  }
}
