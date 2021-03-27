import { Component, ViewChild } from '@angular/core';
import { NavigationComponent } from '@core/components';

@Component({
  selector: 'cct-root',
  template: `
    <cct-toolbar (toggleMenu)="navComponent.sidenav.toggle()"></cct-toolbar>
    <cct-navigation></cct-navigation>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild(NavigationComponent) navComponent: NavigationComponent;
}
