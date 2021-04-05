// Angular
import { Component, EventEmitter, Input, Output } from '@angular/core';

// Firebase
import firebase from 'firebase/app';

@Component({
  selector: 'cct-toolbar',
  template: `
    <mat-toolbar
      class="p-relative z-999 mat-elevation-z8"
      color="primary">
      <button mat-icon-button (click)="toggleMenu.emit()">
        <mat-icon>menu</mat-icon>
      </button>
      <span class="flex-1">CC Tracker</span>

      <button
        *ngIf="!auth"
        mat-button>
        Log in
      </button>
    </mat-toolbar>
  `,
  styleUrls: ['./toolbar.component.scss']
})
export  class ToolbarComponent {

  @Input()
  auth: firebase.User;

  @Output()
  toggleMenu: EventEmitter<void> = new EventEmitter<void>();

}
