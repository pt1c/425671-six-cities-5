import { City } from './city.type.js';
import { EstateOptions } from './estate-options.type.js';
import { EstateType } from './estate-type.type.js';
import { User } from './user.type.js';

export type Estate = {
  title: string;
  description: string;
  postDate: Date;
  city: City;
  photoPreview: string;
  photos: string[];
  isPremium: boolean;
  isFavorite: boolean;
  rating: number;
  type: EstateType
  roomsCount: number;
  guestsCount: number;
  price: number;
  options: EstateOptions[];
  author: User;
  commentsCount: number;
  location: number[];
}
