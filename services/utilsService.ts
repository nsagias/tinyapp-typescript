
import { v4 }from "uuid";
/**
 * Function to create shortURL identifier for database insertion
 * @returns {string} 6 character long string aplhanumeric identifier
 */
export const idGenerator = async(len: number = 6): Promise<string> => {
  return await v4().substring(0, len).toString();
};


/**
 * Campares two opbjects
 * @param object1 
 * @param object2 
 * @returns 
 */
export const isDeepEqual = (object1: any, object2: any): Boolean => {

  const objKeys1 = Object.keys(object1);
  const objKeys2 = Object.keys(object2);

  if (objKeys1.length !== objKeys2.length) return false;

  for (var key of objKeys1) {
    const value1 = object1[key];
    const value2 = object2[key];

    const isObjects = isObject(value1) && isObject(value2);

    if ((isObjects && !isDeepEqual(value1, value2)) ||
      (!isObjects && value1 !== value2)
    ) {
      return false;
    }
  }
  return true;
};

const isObject = (object: any) => {
  return object != null && typeof object === "object";
};