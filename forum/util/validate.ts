export const isObjectWithEmptyString = (obj: Object) => {
  if (obj && Object.values(obj).indexOf("") >= 0) return true;
  return false;
};
