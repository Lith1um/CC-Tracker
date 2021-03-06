// Angular
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

// Firebase
import firebase from 'firebase/app';

@Component({
  selector: 'cct-toolbar-user',
  template: `
    <ng-container *ngIf="user">
      <button mat-button [matMenuTriggerFor]="userMenu">
        {{ user.displayName || 'You' }}
      </button>
      <mat-menu #userMenu="matMenu" xPosition="before">
        <button mat-menu-item>
          <mat-icon>manage_accounts</mat-icon>
          <span>Profile</span>
        </button>
        <button mat-menu-item (click)="logOut.emit()">
          <mat-icon>logout</mat-icon>
          <span>Log out</span>
        </button>
      </mat-menu>
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarUserComponent {

  @Input()
  user: firebase.User;

  @Output()
  logOut: EventEmitter<void> = new EventEmitter<void>();

}
