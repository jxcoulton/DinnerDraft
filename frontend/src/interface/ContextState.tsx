import MainState from "./MainState";
import InputValueState from "./InputValueState";
import OpenState from "./OpenState";
import RecipeState from "./RecipeState";
import React from "react";
import DatabaseState from "./DatabaseState";

export default interface IContextState {
  activeUser: MainState;
  setActiveUser: React.Dispatch<React.SetStateAction<MainState>>;
  startDate: Date;
  setStartDate: React.Dispatch<React.SetStateAction<Date>>;
  databaseData: DatabaseState;
  setDatabaseData: React.Dispatch<React.SetStateAction<DatabaseState>>;
  value: InputValueState;
  setValue: React.Dispatch<React.SetStateAction<InputValueState>>;
  trigger: boolean;
  setTrigger: React.Dispatch<React.SetStateAction<boolean>>;
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  addMealItemOpen: OpenState;
  setAddMealItemOpen: React.Dispatch<React.SetStateAction<OpenState>>;
  currentRecipe: RecipeState;
  setCurrentRecipe: React.Dispatch<React.SetStateAction<RecipeState>>;
  userFavorites: RecipeState;
  setUserFavorites: React.Dispatch<React.SetStateAction<RecipeState>>;
}
