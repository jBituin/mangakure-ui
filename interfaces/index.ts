export interface Manga {
  readonly title: string;
  readonly coverImageUrl: string;
  readonly synopsis: string;
  readonly author: string;
  readonly tags: string[];
  readonly slug: string;
  readonly url?: string;
  readonly created_at?: Date;
  readonly latestChapter?: [];
  readonly chapters?: Chapter[];
}

export interface Chapter {
  readonly label: string;
  readonly slug: string;
  readonly url?: string;
  readonly sequence?: number;
  readonly mangaId?: string;
  readonly mangaSlug?: string;
}

export interface Params {
  readonly search?: string;
  readonly page?: number;
  readonly limit?: number;
}
