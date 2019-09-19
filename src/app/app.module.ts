import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { PlaylistComponent } from "./components/playlist/playlist.component";
import { YoutubePlayerComponent } from "./components/youtube-player/youtube-player.component";
import { AddLinkComponent } from "./components/add-link/add-link.component";
import { LinkBoxComponent } from "./components/link-box/link-box.component";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { YoutubeValidatorDirective } from "./validators/youtube-validator.directive";
import { ToastrModule, ToastNoAnimation, ToastNoAnimationModule } from "ngx-toastr";
import { NgxYoutubePlayerModule } from "ngx-youtube-player";

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    PlaylistComponent,
    YoutubePlayerComponent,
    AddLinkComponent,
    LinkBoxComponent,
    YoutubeValidatorDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    HttpClientModule,
    ToastrModule.forRoot(),
    ToastNoAnimationModule.forRoot(),
    NgxYoutubePlayerModule.forRoot()
  ],
  providers: [HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule {}
