import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-video-list-item",
  templateUrl: "./video-list-item.component.html",
  styleUrls: ["./video-list-item.component.scss"],
})
export class VideoListItemComponent implements OnInit {
  @Input() videoList: Array<string> = [];
  @Output() onRemoveItem = new EventEmitter<any>();

  ngOnInit() {}

  removeElementFromList(index) {
    this.onRemoveItem.emit(index);
  }
}
