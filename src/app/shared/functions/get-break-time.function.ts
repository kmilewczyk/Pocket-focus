export function getBreakTime(timePassed: number) {
  return Math.ceil(Math.max(5 * 60, timePassed / 5));
}
