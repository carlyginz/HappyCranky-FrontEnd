import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { FeelingtodayComponent } from './feelingtoday/feelingtoday.component';

const config = {
  apiKey: "AIzaSyB70_QuTshwii3W5Yb-YpBEahVSaCLG2Uo",
  authDomain: "happycranky-483d5.firebaseapp.com",
  projectId: "happycranky-483d5",
  storageBucket: "happycranky-483d5.appspot.com",
  messagingSenderId: "987622101214",
  appId: "1:987622101214:web:509179646f15269103b24f",
  measurementId: "G-S0TK243C3P"
};

@NgModule({
  declarations: [
    AppComponent,
    FeelingtodayComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
