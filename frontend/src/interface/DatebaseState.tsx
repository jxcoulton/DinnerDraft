import MealState from "./MealState";

export default interface DatabaseState {
  [key: string]: MealState;
}
