// Angular
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// Modules
import { AuthModule } from '@auth/auth.module';
import { CoreModule } from '@core/core.module';
import { AppRoutingModule } from './app-routing.module';

// Components
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    // Routing
    AppRoutingModule,

    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,

    // Custom Modules
    CoreModule,
    AuthModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'en-GB'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
