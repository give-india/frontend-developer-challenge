export interface VideoInterface {
  video: any;
  onDrop: (item: any, index: any) => void;
  index: number;
  onDrag: (index: boolean) => void;
}
