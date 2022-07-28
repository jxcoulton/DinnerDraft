import React, { useState, createContext, useEffect } from "react";
import MainState from "../interface/MainState";
import InputValueState from "../interface/InputValueState";
import IContextState from "../interface/ContextState";
import OpenState from "../interface/OpenState";
import { auth } from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { ref, get, child } from "firebase/database";
import { database } from "../config/firebase";
import RecipeState from "../interface/RecipeState";
import DatabaseState from "../interface/DatabaseState";

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
  currentRecipe: {},
  setCurrentRecipe: () => {},
  userFavorites: {},
  setUserFavorites: () => {},
};

const defaultOpenState = {
  breakfast: false,
  lunch: false,
  dinner: false,
  snack: false,
};

export const UserDataContext = createContext<IContextState>(defaultState);

export const UserDataProvider: React.FC = ({ children }) => {
  const dbRef = ref(database);

  const [activeUser, setActiveUser] = useState<MainState>(
    defaultState.activeUser
  );
  const [startDate, setStartDate] = useState(defaultState.startDate);
  const [databaseData, setDatabaseData] = useState<DatabaseState>({});
  const [value, setValue] = useState<InputValueState>(defaultState.value);
  const [trigger, setTrigger] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [addMealItemOpen, setAddMealItemOpen] = useState<OpenState>(
    defaultState.addMealItemOpen
  );
  const [currentRecipe, setCurrentRecipe] = useState(
    defaultState.currentRecipe
  );
  const [userFavorites, setUserFavorites] = useState<RecipeState>({});

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
    if (activeUser.uid) {
      const getFavorites = async () => {
        await get(child(dbRef, `users/${activeUser.uid}/favorites`))
          .then((snapshot) => {
            if (snapshot.exists()) {
              setUserFavorites(snapshot.val());
            } else {
              setUserFavorites({});
            }
          })
          .catch((error) => {
            console.error(error);
          });
      };

      const getData = async () => {
        await get(child(dbRef, `users/${activeUser.uid}/meals/`))
          .then((snapshot) => {
            if (snapshot.exists()) {
              setDatabaseData(snapshot.val());
            } else {
              setDatabaseData({});
            }
          })
          .catch((error) => {
            console.error(error);
          });
      };

      setAddMealItemOpen(defaultOpenState);
      getData();
      getFavorites();
    }
  }, [
    activeUser.uid,
    dbRef,
    setUserFavorites,
    trigger,
    setDatabaseData,
    setAddMealItemOpen,
  ]);

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
        currentRecipe,
        setCurrentRecipe,
        userFavorites,
        setUserFavorites,
      }}
    >
      {children}
    </UserDataContext.Provider>
  );
};
