export let API_KEY = "AIzaSyA86WkJsYmPpU9BaT73Ym_1Fj-d281g6Fw";

export function valueConverter(value) {
  if (value >= 1000000) {
    return Math.floor(value / 1000000) + "M";
  } else if (value >= 1000) {
    return Math.floor(value / 1000) + "K";
  } else {
    return value;
  }
}
