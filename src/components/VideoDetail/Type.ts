export interface IVideoDetail {
  thumbnail_url: string;
  title: string;
  author_url: string;
  author_name: string;
}

export interface IProps {
  videoDetail: IVideoDetail;
  remove?: boolean;
  onRemove?: () => void;
}
