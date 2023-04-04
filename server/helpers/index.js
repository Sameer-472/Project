exports.getPath = (value) => {
  if (process.env.NODE_ENV === "development") {
    if (value) {
      return `${process.env.BASE_URL}:${process.env.PORT}/${value}`;
    }
    return value;
  } else {
    return `https://dev74.onlinetestingserver.com:${process.env.PORT}/${value}`;
  }
};
