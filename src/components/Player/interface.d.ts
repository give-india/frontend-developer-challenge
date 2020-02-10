export interface PlayerInterface {
  classes?: string;
  playing: any;
  drop2Play: (index: any) => void;
  isDragging?: boolean;
  onEnded: () => void;
  onProgress: (state: any) => void;
}
