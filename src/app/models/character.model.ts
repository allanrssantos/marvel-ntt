export interface CharacterDataWrapper {
  code: number;
  status: string;
  copyright: string;
  attributionText: string;
  attributionHTML: string;
  etag: string;
  data: CharacterDataContainer;
}

export interface CharacterDataContainer{
  offset: number;
  limit: number;
  total: number;
  count: number;
  results: Character[];
}

export interface Character {
  id: number;
  name: string;
  description: string;
  modified: string;
  thumbnail: Image;
  resourceURI: string;
  comics: ComicList;
  series: SeriesList;
  stories: StoryList;
  events: EventList;
  urls: Url[];
}

export interface Image {
  path: string;
  extension: string;
}

export interface ComicList {
  available: number;
  collectionURI: string;
  items: ComicSummary[];
  returned: number;
}

export interface SeriesList {
  available: number;
  collectionURI: string;
  items: SeriesSummary[];
  returned: number;
}

export interface StoryList {
  available: number;
  collectionURI: string;
  items: StorySummary[];
  returned: number;
}

export interface EventList {
  available: number;
  collectionURI: string;
  items: EventSummary[];
  returned: number;
}

export interface ComicSummary {
  resourceURI: string;
  name: string;
}

export interface SeriesSummary {
  resourceURI: string;
  name: string;
}

export interface StorySummary {
  resourceURI: string;
  name: string;
  type: string;
}

export interface EventSummary {
  resourceURI: string;
  name: string;
}

export interface Url {
  type: string;
  url: string;
}
