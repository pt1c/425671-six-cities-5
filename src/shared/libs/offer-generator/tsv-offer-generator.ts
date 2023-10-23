import dayjs from 'dayjs';
import { OfferGenerator } from './offer-generator.interface.js';
import { MockServerData, City, OfferType, UserType } from '../../types/index.js';
import { generateRandomValue, getRandomItem, getRandomItems } from '../../helpers/index.js';

const FIRST_WEEK_DAY = 1;
const LAST_WEEK_DAY = 7;
const PICTURES_COUNT = 5;
const MIN_RATING = 1;
const MAX_RATING = 5;
const MIN_ROOMS_COUNT = 1;
const MAX_ROOMS_COUNT = 8;
const MIN_GUESTS_COUNT = 1;
const MAX_GUESTS_COUNT = 10;
const MIN_PRICE = 100;
const MAX_PRICE = 100000;
const LOCATION = {
  'Paris': {
    'latitude': 48.85661,
    'longitude': 2.351499
  },
  'Cologne': {
    'latitude': 50.938361,
    'longitude': 6.959974
  },
  'Brussels': {
    'latitude': 50.846557,
    'longitude': 4.351697
  },
  'Amsterdam': {
    'latitude': 52.370216,
    'longitude': 4.895168
  },
  'Hamburg': {
    'latitude': 53.550341,
    'longitude': 10.000654
  },
  'Dusseldorf': {
    'latitude': 51.225402,
    'longitude': 6.776314
  }
};

export class TSVOfferGenerator implements OfferGenerator {
  constructor(private readonly mockData: MockServerData) {}

  public generate(): string {
    const title = getRandomItem<string>(this.mockData.titles);
    const description = getRandomItem<string>(this.mockData.descriptions);
    const postDate = dayjs().subtract(generateRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day').toISOString();
    const city = getRandomItem(this.mockData.cities) as keyof typeof City;
    const photoPreview = getRandomItem<string>(this.mockData.photoPreview);
    const photos = getRandomItems<string>(this.mockData.photos, PICTURES_COUNT).join(';');
    const isPremium = getRandomItem(['true', 'false']);
    const isFavorite = getRandomItem(['true', 'false']);
    const rating = generateRandomValue(MIN_RATING, MAX_RATING, 1).toString();
    const type = getRandomItem(this.mockData.types) as keyof typeof OfferType;
    const roomsCount = generateRandomValue(MIN_ROOMS_COUNT, MAX_ROOMS_COUNT).toString();
    const guestsCount = generateRandomValue(MIN_GUESTS_COUNT, MAX_GUESTS_COUNT).toString();
    const price = generateRandomValue(MIN_PRICE, MAX_PRICE).toString();
    const options = getRandomItems<string>(this.mockData.options).join(';');
    const userName = getRandomItem<string>(this.mockData.users);
    const email = getRandomItem<string>(this.mockData.emails);
    const avatarPath = getRandomItem<string>(this.mockData.avatars);
    const password = 'Qwerty12345';
    const userType = getRandomItem(this.mockData.userType) as keyof typeof UserType;
    const location = `${LOCATION[city].longitude};${LOCATION[city].latitude}`;

    return [
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
      location,
    ].join('\t');
  }
}
