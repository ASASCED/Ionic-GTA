import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

// NATIVE
import { Camera } from '@ionic-native/camera/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';

// FIREBASE - ANGULAR
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule, AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';

export const firebaseConfig = {
  apiKey: 'AIzaSyCpJZH3LVkx0amxPOe_ftbbAX1eEJny0Qo',
  authDomain: 'comida-ad9d7.firebaseapp.com',
  databaseURL: 'https://comida-ad9d7.firebaseio.com',
  projectId: 'comida-ad9d7',
  storageBucket: 'comida-ad9d7.appspot.com',
  messagingSenderId: '145314079975',
  appId: '1:145314079975:web:94dd6e5ad8b4d39f'
};
// --------------------------

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CargaPostService } from './services/carga-post.service';
import { PlaceholderPipe } from './pipes/placeholder.pipe';

@NgModule({
  declarations: [AppComponent, PlaceholderPipe],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    CargaPostService,
    AngularFireDatabase,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Camera,
    ImagePicker
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
