import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { VideoContainerComponent } from "./video-container/video-container.component";

const routes: Routes = [
  {
    path: "",
    component: VideoContainerComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
