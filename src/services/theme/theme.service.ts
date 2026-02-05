import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type Theme = 'dark' | 'light';

@Injectable({
    providedIn: 'root'
})
export class ThemeService {
    private readonly THEME_KEY = 'app-theme';
    private themeSubject = new BehaviorSubject<Theme>(this.getStoredTheme());

    /** Observable for components to subscribe to theme changes */
    theme$ = this.themeSubject.asObservable();

    /** Get the current theme value */
    get currentTheme(): Theme {
        return this.themeSubject.value;
    }

    /** Check if current theme is dark */
    get isDarkMode(): boolean {
        return this.currentTheme === 'dark';
    }

    constructor() {
        // Apply theme on service initialization
        this.applyTheme(this.currentTheme);
    }

    /**
     * Get the stored theme from localStorage or default to 'dark'
     */
    private getStoredTheme(): Theme {
        if (typeof localStorage !== 'undefined') {
            const stored = localStorage.getItem(this.THEME_KEY);
            if (stored === 'light' || stored === 'dark') {
                return stored;
            }
        }
        return 'dark'; // Default theme
    }

    /**
     * Toggle between dark and light themes
     */
    toggleTheme(): void {
        const newTheme: Theme = this.currentTheme === 'dark' ? 'light' : 'dark';
        this.setTheme(newTheme);
    }

    /**
     * Set the theme explicitly
     */
    setTheme(theme: Theme): void {
        if (typeof localStorage !== 'undefined') {
            localStorage.setItem(this.THEME_KEY, theme);
        }
        this.applyTheme(theme);
        this.themeSubject.next(theme);
    }

    /**
     * Apply theme by setting data-theme attribute on document root
     */
    private applyTheme(theme: Theme): void {
        if (typeof document !== 'undefined') {
            document.documentElement.setAttribute('data-theme', theme);
        }
    }
}
