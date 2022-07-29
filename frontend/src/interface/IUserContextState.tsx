import IMainState from "./IMainState";
import IInputValueState from "./IInputValueState";
import IOpenState from "./IOpenState";
import IRecipeState from "./IRecipeState";
import React from "react";
import IDatabaseState from "./IDatabaseState";

export default interface IUserContextState {
  activeUser: IMainState;
  setActiveUser: React.Dispatch<React.SetStateAction<IMainState>>;
  startDate: Date;
  setStartDate: React.Dispatch<React.SetStateAction<Date>>;
  databaseData: IDatabaseState;
  setDatabaseData: React.Dispatch<React.SetStateAction<IDatabaseState>>;
  value: IInputValueState;
  setValue: React.Dispatch<React.SetStateAction<IInputValueState>>;
  trigger: boolean;
  setTrigger: React.Dispatch<React.SetStateAction<boolean>>;
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  addMealItemOpen: IOpenState;
  setAddMealItemOpen: React.Dispatch<React.SetStateAction<IOpenState>>;
  currentRecipe: IRecipeState;
  setCurrentRecipe: React.Dispatch<React.SetStateAction<IRecipeState>>;
  userFavorites: IRecipeState;
  setUserFavorites: React.Dispatch<React.SetStateAction<IRecipeState>>;
}
