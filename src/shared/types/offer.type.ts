import { City } from './city.type.js';
import { OfferOptions } from './offer-options.type.js';
import { OfferType } from './offer-type.type.js';
import { User } from './user.type.js';

export type Offer = {
  title: string;
  description: string;
  postDate: Date;
  city: City;
  photoPreview: string;
  photos: string[];
  isPremium: boolean;
  isFavorite: boolean;
  rating: number;
  type: OfferType
  roomsCount: number;
  guestsCount: number;
  price: number;
  options: OfferOptions[];
  author: User;
  commentsCount: number;
  location: number[];
}
