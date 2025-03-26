import { Category } from './category';
import { Comment } from './comment';

export interface Article {
  id: number;
  title: string;
  content: string;
  slug: string;
  auteur: string;
  photo: string;
  created_at: string;
  nb_comment: number;
  comment: Comment[];
  category: Category[];
}
export interface ArticleStore {
  title: string;
  content: string;

  auteur: string;
  photo: string;

  category: number[];
}
