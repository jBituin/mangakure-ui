export interface Manga {
  readonly title: string;
  readonly coverImageUrl: string;
  readonly url: string;
  readonly created_at: Date;
  readonly synopsis: string;
  readonly author: string;
  readonly tags: string[];
  readonly slug: string;
  readonly latestChapter: [];
}

export interface Params {
  readonly search?: string;
  readonly page?: number;
  readonly limit?: number;
}
