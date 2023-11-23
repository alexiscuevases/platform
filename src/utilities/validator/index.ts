export class Validator {
  constructor() {}

  minLength(string, minLength): boolean {
    return string.length < minLength;
  }

  maxLength(string, maxLength): boolean {
    return string.length > maxLength;
  }

  isEnum(item, validItems): boolean {
    return validItems.includes(item);
  }

  isEqualTo(first_item, second_item): boolean {
    return first_item === second_item;
  }

  isRegex(string, regex): boolean {
    return regex.test(string);
  }

  isObjectId(objectId): boolean {
    return /^[0-9a-fA-F]{24}$/.test(objectId);
  }

  isEmpty(item): boolean {
    return item === null || item === undefined || item === "";
  }

  isEmail(email): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
  }

  isPassword(password): boolean {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,}$/.test(password);
  }
}
