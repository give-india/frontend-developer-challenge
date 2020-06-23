import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { SearchbarComponent } from './searchbar/searchbar.component';
import { HttpClientModule } from '@angular/common/http';
import { PlaylistComponent } from './playlist/playlist.component';
import {YouTubePlayerModule} from '@angular/youtube-player';
import { MaterialModule } from './material.module';


@NgModule({
  declarations: [
    AppComponent,
    SearchbarComponent,
    PlaylistComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    HttpClientModule,
    YouTubePlayerModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
