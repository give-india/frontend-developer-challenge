import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { YouTubePlayerModule } from "@angular/youtube-player";
import { FormsModule } from "@angular/forms";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { VideoComponent } from "./video/video.component";
import { VideoLinkInputComponent } from "./video-link-input/video-link-input.component";
import { VideoListComponent } from "./video-list/video-list.component";
import { VideoContainerComponent } from "./video-container/video-container.component";
import { VideoListItemComponent } from "./video-list-item/video-list-item.component";

@NgModule({
  declarations: [
    AppComponent,
    VideoComponent,
    VideoLinkInputComponent,
    VideoListComponent,
    VideoContainerComponent,
    VideoListItemComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, YouTubePlayerModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
