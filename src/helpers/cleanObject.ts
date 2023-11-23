export const cleanObject = (object: any): typeof object => {
  const cleanedObject = {};
  for (const key in object) {
    if (object[key] !== null && object[key].length !== 0) {
      cleanedObject[key] = object[key];
    }
  }
  return cleanedObject;
};
