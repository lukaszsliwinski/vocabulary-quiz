import { ICategory } from './category';
import { IPhrase } from './phrase';

// categories
export interface ICategoriesHttpResponse {
  status: number;
  message: string;
  categories: ICategory[];
}

// phrases
export interface IPhrasesHttpResponse {
  status: number;
  message: string;
  phrases: IPhrase[];
}
