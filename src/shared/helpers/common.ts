import { ClassConstructor, plainToInstance } from 'class-transformer';
import { ValidationErrorField } from '../libs/rest/types/validation-error-field.type.js';
import { ValidationError } from 'class-validator';

export function generateRandomValue(min:number, max: number, numAfterDigit = 0) {
  return +((Math.random() * (max - min)) + min).toFixed(numAfterDigit);
}

export function getRandomItems<T>(items: T[], count = 0):T[] {
  const retArray = [];
  let loopTimes = 0;

  if(count === 0){
    loopTimes = generateRandomValue(0, items.length);
  } else if (count > items.length) {
    loopTimes = items.length;
  } else {
    loopTimes = count;
  }

  for(let i = 0; i < loopTimes; i++){
    const pushIndex = generateRandomValue(0, items.length - 1);
    retArray.push(items[pushIndex]);
    items = items.slice(0, pushIndex - 1).concat(items.slice(pushIndex));
  }

  return retArray;
}

export function getRandomItem<T>(items: T[]):T {
  return items[generateRandomValue(0, items.length - 1)];
}

export function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : '';
}

export function fillDTO<T, V>(someDto: ClassConstructor<T>, plainObject: V) {
  return plainToInstance(someDto, plainObject, { excludeExtraneousValues: true });
}

export function createErrorObject(message: string) {
  return {
    error: message,
  };
}

export function reduceValidationErrors(errors: ValidationError[]): ValidationErrorField[] {
  return errors.map(({ property, value, constraints}) => ({
    property,
    value,
    messages: constraints ? Object.values(constraints) : []
  }));
}

export function getFullServerPath(host: string, port: number) {
  return `http://${host}:${port}`;
}
