// Angular
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  NavigationEnd,
  NavigationStart,
  Router,
  RouterEvent,
  Scroll
} from '@angular/router';

// Material
import { MatSidenav } from '@angular/material/sidenav';
import { MenuItemModel } from '@core/models';

@Component({
  selector: 'cct-navigation',
  template: `
    <cct-toolbar (toggleMenu)="sidenav.toggle()">
    </cct-toolbar>

    <mat-progress-bar
      *ngIf="showProgress"
      class="navigation__progress"
      color="warn"
      [value]="progressValue">
    </mat-progress-bar>

    <mat-sidenav-container class="navigation__body">
      <mat-sidenav
        class="navigation__menu"
        mode="push"
        [autoFocus]="false">
        <mat-nav-list>
          <div mat-subheader>Pages</div>
          <ng-container *ngFor="let item of menuItems">
            <a
              *ngIf="item.enabled"
              mat-list-item
              routerLinkActive="active"
              [routerLinkActiveOptions]="{exact: true}"
              [routerLink]="'/' + item.url"
              (click)="sidenav.close()">
              <mat-icon mat-list-icon>{{item.icon}}</mat-icon>
              <div mat-line>{{item.name}}</div>
            </a>
          </ng-container>
        </mat-nav-list>
      </mat-sidenav>

      <mat-sidenav-content class="overflow-hidden">
        <div class="navigation__content">
          <!-- all page content renders here -->
          <router-outlet></router-outlet>
        </div>
        <div class="navigation__footer-holder">
          <div class="navigation__footer">
            <a class="navigation__footer-item remove-link-styles" href="https://nomics.com" target="_blank">
              Crypto Market Cap & Pricing Data Provided By Nomics
            </a>
            <span>
              © Alex Rayner
            </span>
          </div>
        </div>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  @ViewChild(MatSidenav) sidenav: MatSidenav;

  menuItems: MenuItemModel[] = [
    {
      name: 'Home',
      icon: 'home',
      enabled: true,
      url: 'app'
    },
    {
      name: 'Markets',
      icon: 'auto_graph',
      enabled: true,
      url: 'app/markets'
    }
  ];

  progressValue = 0;
  showProgress = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // handles faking a progress indicator whilst angular routing takes place
    this.router.events.subscribe((event: RouterEvent) => {
      if (event instanceof NavigationStart) {
        // reset the progress bar
        this.progressValue = 0;
        this.showProgress = true;
      } else if (event instanceof NavigationEnd) {
        // complete the bar and hide
        this.progressValue = 100;
        setTimeout(() => {
          this.showProgress = false;
        }, 250);
      } else if (!(event instanceof Scroll)) {
        // increment the bar by a given ratio
        this.progressValue += (100 - this.progressValue) * 0.2;
      }
    });
  }
}
