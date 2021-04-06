// Angular
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

// Models
import { User } from '@auth/models';

@Component({
  selector: 'cct-toolbar-user',
  template: `
    <ng-container *ngIf="user">
      <button mat-button [matMenuTriggerFor]="userMenu">
        <span class="user__name">{{ user.displayName || 'You' }}</span>
        <img
          *ngIf="user.photoURL; else icon"
          class="user__profile"
          [src]="user.photoURL"/>
        <ng-template #icon>
          <mat-icon>account_circle</mat-icon>
        </ng-template>
      </button>

      <mat-menu #userMenu="matMenu" xPosition="before">
        <a mat-menu-item routerLink="/app/profile">
          <mat-icon>manage_accounts</mat-icon>
          <span>Profile</span>
        </a>
        <button mat-menu-item (click)="logOut.emit()">
          <mat-icon>logout</mat-icon>
          <span>Log out</span>
        </button>
      </mat-menu>
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./toolbar-user.component.scss']
})
export class ToolbarUserComponent {

  @Input()
  user: User;

  @Output()
  logOut: EventEmitter<void> = new EventEmitter<void>();

}
