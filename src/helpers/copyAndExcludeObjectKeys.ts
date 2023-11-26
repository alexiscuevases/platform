export const copyObjectAndExcludeKeys = ({ object, keysToExclude }: { object: object; keysToExclude: string[] }) => {
  const objectCopied = object;

  keysToExclude.forEach(key => {
    delete objectCopied[key];
  });

  return objectCopied;
};
