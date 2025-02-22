function delay(miliSeconds) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, miliSeconds);
  });
}
export { delay };
