// Angular
import { Component, EventEmitter, Input, Output } from '@angular/core';

// Models
import { User } from '@auth/models';

@Component({
  selector: 'cct-toolbar',
  template: `
    <mat-toolbar
      class="p-relative z-999 mat-elevation-z8"
      color="primary">
      <button mat-icon-button (click)="toggleMenu.emit()">
        <mat-icon>menu</mat-icon>
      </button>
      <span class="flex-1 toolbar__title">CC Tracker</span>

      <ng-container *ngIf="isLoggedIn; else login">
        <cct-toolbar-user
          [user]="user"
          (logOut)="logOut.emit()">
        </cct-toolbar-user>
      </ng-container>

      <ng-template #login>
        <a mat-button routerLink="/app/login">Log in</a>
      </ng-template>
    </mat-toolbar>
  `,
  styleUrls: ['./toolbar.component.scss']
})
export  class ToolbarComponent {

  @Input()
  isLoggedIn = false;

  @Input()
  user: User;

  @Output()
  toggleMenu: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  logOut: EventEmitter<void> = new EventEmitter<void>();

}
