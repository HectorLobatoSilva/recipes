import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing.module';
import { ErrorPageComponent } from './components/error-page/error-page.component';

import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { SharedModule } from './modules/shared.module';
import { HeaderComponent } from './components/header/header.component';
import { AuthModule } from './modules/auth.module';

@NgModule({
  declarations: [HeaderComponent, AppComponent, ErrorPageComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    // HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
  ],
  providers: [
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: AuthInterseptorService,
    //   multi: true,
    // },
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: LogginInterseptorService,
    //   multi: true,
    // },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
