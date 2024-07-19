export interface Article {
  url: string;
  id: number;
  published_date: string;
  updated: string;
  byline: string;
  type: string;
  title: string;
  abstract: string;
  image: string;
  des_facet: string[];
  media: {
    'media-metadata': { url: string }[];
  }[];
}

export interface ApiResponse {
  results: Article[];
}

export {};
