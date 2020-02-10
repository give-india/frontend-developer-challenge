export interface PlayListInterface {
  classes: string;
  playlist: any;
  onDrop: any;
  disableButton: boolean;
  playNext: () => void;
  onDrag: (isDragging: boolean) => void;
}
