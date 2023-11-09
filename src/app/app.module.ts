import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HomePageComponent } from './home-page/home-page.component';
// import { BuyingPageComponent } from './buying-page/buying-page.component';
// import { LoginPageComponent } from './login-page/login-page.component';
// import { MyVideoPageComponent } from './my-video-page/my-video-page.component';
// import { QrPageComponent } from './qr-page/qr-page.component';
// import { SearchPageComponent } from './search-page/search-page.component';
// import { PostPageComponent } from './post-page/post-page.component';
// import { WatchingPageComponent } from './watching-page/watching-page.component';
import { InboxPageComponent } from './inbox-page/inbox-page.component';
// import { RegisterPageComponent } from './register-page/register-page.component';
// import { ProfilePageComponent } from './profile-page/profile-page.component'

import { SearchPageModule } from './search-page/search-page.module';
import { RegisterPageModule } from './register-page/register-page.module';
import { LoginPageModule } from './login-page/login-page.module';
import { PostPageModule } from './post-page/post-page.module';
import { WatchingPageModule } from './watching-page/watching-page.module';
import { MyVideoPageModule } from './my-video-page/my-video-page.module';
import { BuyingPageModule } from './buying-page/buying-page.module';
import { QrPagePageModule as QrPageModule } from './qr-page/qr-page.module';
import { ProfilePageModule } from './profile-page/profile-page.module';
import { RouterModule } from '@angular/router';
import { ChatPageComponent } from './chat-page/chat-page.component';
import { InboxPageModule } from './inbox-page/inbox-page.module';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomePageComponent,
    // BuyingPageComponent,
    // LoginPageComponent,
    // MyVideoPageComponent,
    // QrPageComponent,
    // SearchPageComponent,
    // PostPageComponent,
    // WatchingPageComponent,
    // InboxPageComponent,
    ChatPageComponent,
    //EditVideoPageComponent,
    // ProfilePageComponent,
    // RegisterPageComponent
  ],
  imports: [
    BrowserModule,
    SearchPageModule,
    RegisterPageModule,
    LoginPageModule,
    PostPageModule,
    WatchingPageModule,
    MyVideoPageModule,
    BuyingPageModule,
    QrPageModule,
    ProfilePageModule,
    InboxPageModule,
    AppRoutingModule,
    FormsModule,
    RouterModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
