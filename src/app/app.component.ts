import { Component, ViewChild } from '@angular/core';
import { NavigationComponent } from '@core/components';

@Component({
  selector: 'app-root',
  template: `
    <cct-toolbar (toggleMenu)="navComponent.sidenav.toggle()"></cct-toolbar>
    <cct-navigation></cct-navigation>
  `
})
export class AppComponent {
  @ViewChild(NavigationComponent) navComponent: NavigationComponent;
}
