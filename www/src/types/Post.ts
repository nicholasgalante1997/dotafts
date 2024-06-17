import { AuthorLike } from './Author';
import { Motif } from './Motif';
import { ShowEnum } from './Show';

export interface PostData {
  readonly key: number | string;
  title: string;
  description: string;
  author: AuthorLike;
  show: ShowEnum;
  season: number;
  episode: number;
  synopsis: string;
  motifs: Motif[];
}
