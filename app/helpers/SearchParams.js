export const searchParams = (param) => {
  //const urlString = location.hash,
  const urlString = location.hash,
    re = new RegExp(`${param}=\\w+%?\\w*`, "i"),
    //results = urlString.match(/\w+=.+/);
    results = urlString.match(re);
  if (!results) {
    return false;
  }
  const [, value] = results[0].split("=");
  return value;
};
