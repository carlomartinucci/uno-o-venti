export const wonEggForDay = (day) => 20 * 2 ** (day - 1);
export const wonChickenForDay = (day) => 2 ** (day - 1);

export const wonChickenSinceDay = (day) => {
  day = Number(day)
  if (day <= 0 || isNaN(day)) return 0;
  return wonChickenForDay(day) + wonChickenSinceDay(day - 1);
};
