import { UserType, City, Offer, OfferType, OfferOptions } from '../types/index.js';

export function createOffer(inputData: string): Offer {
  const [
    title,
    description,
    postDate,
    city,
    photoPreview,
    photos,
    isPremium,
    isFavorite,
    rating,
    type,
    roomsCount,
    guestsCount,
    price,
    options,
    userName,
    email,
    password,
    avatarPath,
    userType,
    location
  ] = inputData.replace('\n', '').split('\t');

  const author = {
    username: userName,
    email,
    password,
    avatarPath,
    type: UserType[userType as keyof typeof UserType]
  };

  return {
    title,
    description,
    postDate: new Date(postDate),
    city: City[city as keyof typeof City],
    photoPreview,
    photos: photos.split(';'),
    isPremium: isPremium === 'true',
    isFavorite: isFavorite === 'true',
    rating: Number.parseFloat(rating),
    type: OfferType[type as keyof typeof OfferType],
    roomsCount: Number.parseInt(roomsCount, 10),
    guestsCount: Number.parseInt(guestsCount, 10),
    price: Number.parseInt(price, 10),
    options: options.split(';').map((option) => OfferOptions[option as keyof typeof OfferOptions]),
    author,
    commentsCount: 0,
    location: location.split(';').map((coord) => Number(coord)),
  };
}
