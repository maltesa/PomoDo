function calcWeekNumber() {
  const currentDate = new Date();
  const startDate = new Date(currentDate.getFullYear(), 0, 1);
  const days = Math.floor(
    (currentDate.getTime() - startDate.getTime()) / (24 * 60 * 60 * 1000)
  );

  return Math.ceil(days / 7);
}

export function getWeekType() {
  return calcWeekNumber() % 2 === 0 ? "coding" : "marketing";
}

export function useWeekType() {
  return getWeekType();
}
