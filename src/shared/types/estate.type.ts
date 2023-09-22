import { City } from './city.type.js';
import { EstateComfort } from './estate-comfort.type.js';
import { EstateType } from './estate-type.type.js';
import { User } from './user.type.js';

export type Comment = {
  name: string;
  description: string;
  date: Date;
  city: City;
  imagePrev: string;
  photos: [string];
  premium: boolean;
  favorite: boolean;
  rating: number;
  type: EstateType
  rooms: number;
  maxGuests: number;
  price: number;
  comfort: EstateComfort;
  author: User;
  commentsNum: number;
  coords: string;
}
