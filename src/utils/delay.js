// src/utils/delay.js

export async function delay(
  min = 1000,
  max = 3000
) {

  const time =
    Math.floor(
      Math.random() * (max - min + 1)
    ) + min;

  return new Promise((resolve) =>
    setTimeout(resolve, time)
  );
}