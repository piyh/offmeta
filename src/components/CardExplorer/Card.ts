// src/types/Card.ts

export interface Legalities {
  standard: string;
  future: string;
  historic: string;
  pioneer: string;
  modern: string;
  legacy: string;
  pauper: string;
  vintage: string;
  penny: string;
  commander: string;
  brawl: string;
  duel: string;
  oldschool: string;
}

export interface Ruling {
  object: string;
  source: string;
  published_at: string;
  comment: string;
}

export interface Prices {
  usd?: string;
  usd_foil?: string;
  eur?: string;
  eur_foil?: string;
  tix?: string;
  usd_etched?: string;
}

export interface Card {
  id: string;
  name: string;
  image_uris?: {
    normal: string;
    large?: string;
    small?: string;
    png?: string;
    art_crop?: string;
    border_crop?: string;
  };
  legalities?: Legalities;
  rulings?: Ruling[];
  prices?: Prices;
  oracle_text?: string;
  type_line?: string;
  edhrec_rank?: number;

  flavor_text?: string;
  power?: string;
  toughness?: string;
  cmc?: number;
  released_at?: string;
  // Add other relevant properties as needed
}
