export default interface IMealState {
  breakfast?: [
    { [title: string]: string },
    { [favorite: string]: boolean },
    { [id: string]: string },
    { [directions: string]: string[] }?,
    { [instructions: string]: string[] }?,
    { [url: string]: string }?
  ];
  lunch?: [
    { [title: string]: string },
    { [favorite: string]: boolean },
    { [id: string]: string },
    { [directions: string]: string[] }?,
    { [instructions: string]: string[] }?,
    { [url: string]: string }?
  ];
  dinner?: [
    { [title: string]: string },
    { [favorite: string]: boolean },
    { [id: string]: string },
    { [directions: string]: string[] }?,
    { [instructions: string]: string[] }?,
    { [url: string]: string }?
  ];
  snack?: [
    { [title: string]: string },
    { [favorite: string]: boolean },
    { [id: string]: string },
    { [directions: string]: string[] }?,
    { [instructions: string]: string[] }?,
    { [url: string]: string }?
  ];
}
