export type Post = {
  id: string;
  title: string;
  summary: string;
  publishDate: string;
  author: Author;
  categories: Category[];
}

export type Author = {
  name: string;
  avatar: string;
}

export type Category = {
  id: string;
  name: string;
}