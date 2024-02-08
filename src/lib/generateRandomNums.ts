export function randomNums(len: number) {
  const randomNumber: number[] = [];
  for (let i = 0; i < len; i++) {
    randomNumber.push(Math.floor(Math.random() * 10));
  }
  return randomNumber.join("");
}
