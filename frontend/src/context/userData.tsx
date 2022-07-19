import React, { useState, createContext, useEffect } from "react";
import MainState from "../interface/MainState";
import MealState from "../interface/MealState";
import InputValueState from "../interface/InputValueState";
import IContextState from "../interface/ContextState";
import OpenState from "../interface/OpenState";
import { auth } from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { ref, get, child } from "firebase/database";
import { database } from "../config/firebase";
import RecipeState from "../interface/RecipeState";

const defaultState = {
  activeUser: {
    uid: null,
    email: null,
    displayName: null,
  },
  setActiveUser: () => {},
  startDate: new Date(),
  setStartDate: () => {},
  databaseData: {},
  setDatabaseData: () => {},
  value: {
    breakfast: "",
    lunch: "",
    dinner: "",
    snack: "",
  },
  setValue: () => {},
  trigger: false,
  setTrigger: () => {},
  modalOpen: false,
  setModalOpen: () => {},
  addMealItemOpen: {
    breakfast: false,
    lunch: false,
    dinner: false,
    snack: false,
  },
  setAddMealItemOpen: () => {},
  dateMeal: {},
  setDateMeal: () => {},
  currentRecipe: {},
  setCurrentRecipe: () => {},
  allData: {},
  setAllData: () => {},
};

export const UserDataContext = createContext<IContextState>(defaultState);

export const UserDataProvider: React.FC = ({ children }) => {
  const dbRef = ref(database);

  const [activeUser, setActiveUser] = useState<MainState>(
    defaultState.activeUser
  );
  const [startDate, setStartDate] = useState(defaultState.startDate);
  const [databaseData, setDatabaseData] = useState<MealState>({});
  const [value, setValue] = useState<InputValueState>(defaultState.value);
  const [trigger, setTrigger] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [addMealItemOpen, setAddMealItemOpen] = useState<OpenState>(
    defaultState.addMealItemOpen
  );
  const [dateMeal, setDateMeal] = useState<MealState>({});
  const [currentRecipe, setCurrentRecipe] = useState(
    defaultState.currentRecipe
  );
  const [allData, setAllData] = useState<RecipeState>({});

  useEffect(() => {
    const unsubscribeAuthChange = onAuthStateChanged(auth, () => {
      if (auth.currentUser) {
        setActiveUser({
          uid: auth.currentUser.uid,
          email: auth.currentUser.email,
          displayName: auth.currentUser.displayName,
        });
      } else {
        setActiveUser(defaultState.activeUser);
      }
    });

    return () => {
      unsubscribeAuthChange();
    };
  }, [activeUser.uid, setActiveUser]);

  useEffect(() => {
    const getData = async () => {
      await get(child(dbRef, `users/${activeUser.uid}/favorites`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            setAllData(snapshot.val());
          }
        })
        .catch((error) => {
          console.error(error);
        });
    };
    getData();
  }, [activeUser.uid, dbRef, setAllData, trigger]);

  return (
    <UserDataContext.Provider
      value={{
        activeUser,
        setActiveUser,
        startDate,
        setStartDate,
        databaseData,
        setDatabaseData,
        value,
        setValue,
        trigger,
        setTrigger,
        modalOpen,
        setModalOpen,
        addMealItemOpen,
        setAddMealItemOpen,
        dateMeal,
        setDateMeal,
        currentRecipe,
        setCurrentRecipe,
        allData,
        setAllData,
      }}
    >
      {children}
    </UserDataContext.Provider>
  );
};
