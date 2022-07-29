export default interface IRecipeState {
  directions?: string[];
  ingredients?: string[];
  title?: string;
  favorite?: boolean;
  id?: string;
  url?: URL | string;
}
