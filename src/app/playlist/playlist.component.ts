import { Component, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { moveItemInArray, CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent implements OnChanges {

  @Input() playlist: string[];
  @Output() playlistUpdated: EventEmitter<string[]> = new EventEmitter<string[]>();
  @Output() refresh: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor() { }


  ngOnChanges(changes: SimpleChanges): void {

  }
  drop(event: CdkDragDrop<string[]>) {
  moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    this.playlistUpdated.emit(event.container.data);

}
delete(index){
  this.playlist.splice(index,1);
  this.playlistUpdated.emit(this.playlist);
}
refreshPlaylist() {
  this.refresh.emit(true);
}

}
