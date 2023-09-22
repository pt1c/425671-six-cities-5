import { FileReader } from './file-reader.interface.js';
import { readFileSync } from 'node:fs';
import { Estate } from '../../types/index.js';
import { City } from '../../types/city.type.js';
import { EstateType } from '../../types/estate-type.type.js';
import { EstateComfort } from '../../types/estate-comfort.type.js';
import { UserType } from '../../types/user-type.type.js';

export class TSVFileReader implements FileReader {
  private rawData = '';

  constructor(
    private readonly filename: string
  ) {}

  public read(): void {
    this.rawData = readFileSync(this.filename, { encoding: 'utf-8' });
  }

  public toArray(): Estate[] {
    if (!this.rawData) {
      throw new Error('File was not read');
    }

    return this.rawData
      .split('\n')
      .filter((row) => row.trim().length > 0)
      .map((line) => line.split('\t'))
      .map(([name, description, inputDate, city, imagePrev, photos, premium, favorite, rating, type, rooms, maxGuests, price, comfort, author, commentsNum, coords]) => ({
        name,
        description,
        date: new Date(inputDate),
        city: City[city as 'Paris'|'Cologne'|'Brussels'|'Amsterdam'|'Hamburg'|'Dusseldorf'],
        imagePrev,
        photos: photos.split(';'),
        premium: Boolean(premium),
        favorite: Boolean(favorite),
        rating: Number.parseFloat(rating),
        type: EstateType[(type.charAt(0).toUpperCase() + type.slice(1)) as 'Apartment'|'House'|'Room'|'Hotel'],
        rooms: Number.parseInt(rooms, 10),
        maxGuests: Number.parseInt(maxGuests, 10),
        price: Number.parseInt(price, 10),
        comfort: comfort.split(';').map((comfortName) => (EstateComfort[comfortName as 'Breakfast'|'AirConditioning'|'LaptopWS'|'BabySeat'|'Washer'|'Towels'|'Fridge'])),
        author: {
          username: author,
          email: 'test@test.local',
          password: '',
          avatarPath: '',
          type: UserType.Common,
        },
        commentsNum: Number.parseInt(commentsNum, 10),
        coords
      }));
  }
}
