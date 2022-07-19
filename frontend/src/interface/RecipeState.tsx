export default interface RecipeState {
  directions?: string[];
  ingredients?: string[];
  title?: string;
  favorite?: boolean;
  url?: URL | string;
}
