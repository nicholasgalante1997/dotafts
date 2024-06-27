import { AuthorLike } from './Author';
import { Media } from './Media';
import { Motif } from './Motif';
import { ShowEnum } from './Show';

export interface PostData {
  readonly id: number | string;
  title: string;
  description: string;
  author: AuthorLike;
  releaseDate: string;
  estimatedReadingTime: string;
  show: ShowEnum;
  season: number;
  episode: number;
  synopsis: string;
  motifs: Motif[];
  media: Media[];
}
