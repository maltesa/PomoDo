function calcWeekNumber() {
  const currentdate = new Date();
  const oneJan = new Date(currentdate.getFullYear(), 0, 1);
  const numberOfDays = Math.floor(
    (currentdate.getTime() - oneJan.getTime()) / (24 * 60 * 60 * 1000)
  );

  return Math.ceil((currentdate.getDay() + 1 + numberOfDays) / 7);
}

export function getWeekType() {
  return calcWeekNumber() % 2 === 0 ? "coding" : "marketing";
}

export function useWeekType() {
  return getWeekType();
}
