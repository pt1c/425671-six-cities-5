import { UserType, City, Estate, EstateType, EstateOptions } from '../types/index.js';

export function createOffer(inputData: string): Estate {
  const [
    title,
    description,
    createdDate,
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
    postDate: new Date(createdDate),
    city: City[city as keyof typeof City],
    photoPreview,
    photos: photos.split(';'),
    isPremium: isPremium === 'true',
    isFavorite: isFavorite === 'true',
    rating: Number.parseFloat(rating),
    type: EstateType[type as keyof typeof EstateType],
    roomsCount: Number.parseInt(roomsCount, 10),
    guestsCount: Number.parseInt(guestsCount, 10),
    price: Number.parseInt(price, 10),
    options: options.split(';').map((option) => EstateOptions[option as keyof typeof EstateOptions]),
    author,
    commentsCount: 0,
    location: location.split(';').map((coord) => Number(coord)),
  };
}
