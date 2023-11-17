import { City, OfferOptions, OfferType } from '../../../types/index.js';

export class UpdateOfferDto {
  public title?: string;
  public description?: string;
  public postDate?: Date;
  public city?: City;
  public preview?: string;
  public pictures?: string[];
  public isPremium?: boolean;
  public isFavorite?: boolean;
  public rating?: number;
  public type?: OfferType;
  public roomsAmount?: number;
  public guestsAmount?: number;
  public price?: number;
  public options?: OfferOptions[];
  public user?: string;
  public commentsAmount?: number;
  public coordinates?: number[];
}
