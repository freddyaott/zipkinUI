import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatToolbarModule,
  MatMenuModule,
  MatIconModule,
  MatInputModule,
  MatSelectModule,
  MatDatepickerModule,
  MatListModule,
  MatCardModule,
  MatFormFieldModule,
  MatNativeDateModule, MatChipsModule, MatDialogModule
} from '@angular/material';
import { AppComponent } from './app.component';
import { HomeComponent } from './component/home/home.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ZipkinApiService} from './service/zipkin-api.service';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule, HttpHandler} from '@angular/common/http';
import { LoginComponent } from './component/login/login.component';
import {AuthGuardGuard} from './guard/auth-guard.guard';
import {LoginPageGuard} from './guard/login-page.guard';
import {JwtInterceptor} from './util/JwtInterceptor';
import { TraceComponent } from './component/trace/trace.component';
import {ChartsModule} from 'ng2-charts';
import {DxChartModule} from 'devextreme-angular';
import { HelpDialogComponent } from './component/help-dialog/help-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    TraceComponent,
    HelpDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    DxChartModule,
    MatDialogModule,
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatChipsModule,
    MatMenuModule,
    MatIconModule,
    MatInputModule,
    MatCardModule,
    MatListModule,
    MatDatepickerModule,
    MatSelectModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    MatFormFieldModule,
    MatNativeDateModule,
    RouterModule.forRoot([
      { path: 'login', component: LoginComponent, canActivate: [LoginPageGuard]},
      { path: 'home', component: HomeComponent, canActivate: [AuthGuardGuard]},
      { path: 'trace/:id', component: TraceComponent, canActivate: [AuthGuardGuard]},
      { path: '', redirectTo: 'home', pathMatch: 'full'}
    ], { useHash : false })
  ],
  providers: [HttpClient,
    ZipkinApiService,
    AuthGuardGuard,
    LoginPageGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent],
  entryComponents: [HelpDialogComponent]
})
export class AppModule { }
