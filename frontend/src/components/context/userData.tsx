import React, { useState, createContext, useEffect } from "react";
import MainState from "../interface/MainState";
import MealState from "../interface/MealState";
import InputValueState from "../interface/InputValueState";
import IContextState from "../interface/ContextState";
import OpenState from "../interface/OpenState";
import { auth } from "../../config/firebase";
import { onAuthStateChanged } from "firebase/auth";

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
};

export const UserDataContext = createContext<IContextState>(defaultState);

export const UserDataProvider: React.FC = ({ children }) => {
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
      }}
    >
      {children}
    </UserDataContext.Provider>
  );
};
