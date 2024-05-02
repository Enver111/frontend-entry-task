import { encoded, translations } from './data.js';

console.log("Let's rock");
console.log(encoded, translations);

function decode(encoded, translations) {
  const excludeFields = ['groupId', 'service', 'formatSize', 'ca'];
  const decoded = encoded.map((item) => {
    return Object.keys(item).reduce((acc, key) => {
      if (key.endsWith('Id') && !excludeFields.includes(key)) {
        acc[key] = translations[item[key]];
      } else {
        acc[key] = item[key];
      }
      return acc;
    }, {});
  });
  const uniqueIds = [
    ...new Set(encoded.flatMap((item) => Object.values(item))),
  ];
  return { decoded, uniqueIds };
}

const { decoded, uniqueIds } = decode(encoded, translations);

console.log(decoded);
console.log(uniqueIds);

// console.log(decoded)
