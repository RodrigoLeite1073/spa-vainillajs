export const searchParams = (param) => {
  //const urlString = location.hash,
  const urlString = "#/search?search=mujer%20blanca&page=2",
    re = new RegExp(`${param}=\\w+%?\\w*`, "i"),
    //results = urlString.match(/\w+=.+/);
    results = urlString.match(re);
  if (!results) {
    return false;
  }
  const [, value] = el.split("=");
  return value;
};
