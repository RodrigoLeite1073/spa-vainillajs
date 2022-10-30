export const searchParams = (param) => {
  const urlString = location.hash,
    results = urlString.match(/\w+=.+/);

  if (!results) {
    return false;
  }
  const splitResult = results[0].split("&"),
    resultObj = {};
  splitResult.forEach((el) => {
    let [key, value] = el.split("=");
    resultObj[key] = value;
  });
  if (!param in resultObj) {
    return false;
  }
  return resultObj[param];
};
