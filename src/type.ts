
function sumArray(numbers: number[]): number {
  return numbers.reduce((sum, current) => sum + current, 0);
}
console.log("Import file type.ts ==>" + sumArray([1, 2, 3, 4])) // Повинно вивести 10