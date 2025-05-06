export const required = (value) => value.trim() !== "";

export const length = (config) => (value) => {
  let isValid = true;
  if (config.min) {
    isValid = isValid && value.trim().length >= config.min;
  }
  if (config.max) {
    isValid = isValid && value.trim().length <= config.max;
  }
  return isValid;
};

export const email = (value) => {
  return /[a-z0-9!#$%&'*+/=?^_1{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_1{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9]*[a-z0-9])?/.test(
    value
  );
};

export const equals = (compare) => (value) => {
  console.log(compare);
  return value === compare;
};
