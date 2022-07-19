import MainState from "./MainState";
import MealState from "./MealState";
import InputValueState from "./InputValueState";
import OpenState from "./OpenState";
import RecipeState from "./RecipeState";
import React from "react";

export default interface IContextState {
  activeUser: MainState;
  setActiveUser: React.Dispatch<React.SetStateAction<MainState>>;
  startDate: Date;
  setStartDate: React.Dispatch<React.SetStateAction<Date>>;
  databaseData: MealState;
  setDatabaseData: React.Dispatch<React.SetStateAction<MealState>>;
  value: InputValueState;
  setValue: React.Dispatch<React.SetStateAction<InputValueState>>;
  trigger: boolean;
  setTrigger: React.Dispatch<React.SetStateAction<boolean>>;
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  addMealItemOpen: OpenState;
  setAddMealItemOpen: React.Dispatch<React.SetStateAction<OpenState>>;
  dateMeal: MealState;
  setDateMeal: React.Dispatch<React.SetStateAction<MealState>>;
  currentRecipe: RecipeState;
  setCurrentRecipe: React.Dispatch<React.SetStateAction<RecipeState>>;
  allData: RecipeState;
  setAllData: React.Dispatch<React.SetStateAction<RecipeState>>;
}
