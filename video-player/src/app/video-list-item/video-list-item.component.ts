import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";
import { VideoService } from "../services/video.service";

@Component({
  selector: "app-video-list-item",
  templateUrl: "./video-list-item.component.html",
  styleUrls: ["./video-list-item.component.scss"],
})
export class VideoListItemComponent implements OnInit {
  @Input() videoList: Array<string> = [];
  @Output() onRemoveItem = new EventEmitter<any>();

  constructor(private videoService: VideoService) {}

  ngOnInit() {}

  removeElementFromList(index) {
    this.onRemoveItem.emit(index);
  }

  drop(event: CdkDragDrop<string[]>) {
    // debugger;
    moveItemInArray(this.videoList, event.previousIndex, event.currentIndex);
    this.videoService.modifyVideoUrlList(this.videoList);
  }
}
