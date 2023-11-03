import { IPhrase } from "./phrase"

// categories
export interface ICategoriesHttpResponse {
  status: number,
  message: string,
  categories: string[]
}

// phrases
export interface IPhrasesHttpResponse {
  status: number,
  message: string,
  phrases: IPhrase[]
}
