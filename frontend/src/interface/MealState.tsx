export default interface MealState {
  breakfast?: [
    { [directions: string]: string[] }?,
    { [instructions: string]: string[] }?,
    { [title: string]: string }?,
    { [url: string]: string }?
  ];
  lunch?: [
    { [directions: string]: string[] }?,
    { [instructions: string]: string[] }?,
    { [title: string]: string }?,
    { [url: string]: string }?
  ];
  dinner?: [
    { [directions: string]: string[] }?,
    { [instructions: string]: string[] }?,
    { [title: string]: string }?,
    { [url: string]: string }?
  ];
  snack?: [
    { [directions: string]: string[] }?,
    { [instructions: string]: string[] }?,
    { [title: string]: string }?,
    { [url: string]: string }?
  ];
}
