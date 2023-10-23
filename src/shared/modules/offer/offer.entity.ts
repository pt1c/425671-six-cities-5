import { defaultClasses, getModelForClass, modelOptions, prop, Ref } from '@typegoose/typegoose';
import { City, OfferType, OfferOptions } from '../../types/index.js';
import { UserEntity } from '../user/index.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface OfferEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'offers'
  }
})

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class OfferEntity extends defaultClasses.TimeStamps {
  @prop({ trim: true, required: true })
  public title!: string;

  @prop({ trim: true, required: true })
  public description!: string;

  @prop({ required: true })
  public postDate!: Date;

  @prop({ required: true, type: () => String, enum: City })
  public city!: City;

  @prop({ required: true })
  public photoPreview!: string;

  @prop({ required: true, type: () => [String], default: []})
  public photos!: string[];

  @prop({ required: true })
  public isPremium!: boolean;

  @prop({ required: true })
  public isFavorite!: boolean;

  @prop({ required: true })
  public rating!: string;

  @prop({ required: true, type: () => String, enum: OfferType })
  public type!: OfferType;

  @prop({ required: true, default: 1 })
  public roomsCount!: number;

  @prop({ required: true, default: 1 })
  public guestsCount!: number;

  @prop({ required: true, default: 100 })
  public price!: number;

  @prop({ required: true, type: () => String, enum: OfferOptions, default: [] })
  public options!: OfferOptions[];

  @prop({ required: true, ref: UserEntity, _id: false })
  public authorId!: Ref<UserEntity>;

  @prop({ required: true, default: 0 })
  public commentsCount!: number;

  @prop({ required: true, type: () => [Number] })
  public location!: number[];
}

export const OfferModel = getModelForClass(OfferEntity);
