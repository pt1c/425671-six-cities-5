import { Expose, Type } from 'class-transformer';
import { City, OfferOptions, OfferType } from '../../../types/index.js';
import { UserRdo } from '../../user/rdo/user.rdo.js';

export class OfferRdo {
  @Expose()
  public title: string;

  @Expose()
  public description: string;

  @Expose()
  public postDate: Date;

  @Expose()
  public city: City;

  @Expose()
  public photoPreview: string;

  @Expose()
  public photos: string[];

  @Expose()
  public isPremium: boolean;

  @Expose()
  public isFavorite: boolean;

  @Expose()
  public rating: number;

  @Expose()
  public type: OfferType;

  @Expose()
  public roomsCount: number;

  @Expose()
  public guestsCount: number;

  @Expose()
  public price: number;

  @Expose()
  public options: OfferOptions[];

  @Expose({ name: 'authorId'})
  @Type(() => UserRdo)
  public author: UserRdo;

  @Expose()
  public commentsAmount:number[];

  @Expose()
  public location: number[];
}
