import React, { useState, createContext, useEffect } from "react";
import IMainState from "../interface/IMainState";
import IInputValueState from "../interface/IInputValueState";
import IUserContextState from "../interface/IUserContextState";
import IOpenState from "../interface/IOpenState";
import { auth } from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { ref, get, child, remove } from "firebase/database";
import { database } from "../config/firebase";
import IRecipeState from "../interface/IRecipeState";
import IDatabaseState from "../interface/IDatabaseState";
import IAlertsState from "../interface/IAlertsState";
import { AlertColor } from "@mui/material";

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
  edit: false,
  setEdit: () => {},
  loadingBar: false,
  setLoadingBar: () => {},
  showAlert: {
    show: false,
    severity: "success" as AlertColor,
    message: "",
  },
  setShowAlert: () => {},
};

const defaultOpenState = {
  breakfast: false,
  lunch: false,
  dinner: false,
  snack: false,
};

export const UserDataContext = createContext<IUserContextState>(defaultState);

export const UserDataProvider: React.FC = ({ children }) => {
  const dbRef = ref(database);

  const [activeUser, setActiveUser] = useState<IMainState>(
    defaultState.activeUser
  );
  const [startDate, setStartDate] = useState(defaultState.startDate);
  const [databaseData, setDatabaseData] = useState<IDatabaseState>({});
  const [value, setValue] = useState<IInputValueState>(defaultState.value);
  const [trigger, setTrigger] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [addMealItemOpen, setAddMealItemOpen] = useState<IOpenState>(
    defaultState.addMealItemOpen
  );
  const [currentRecipe, setCurrentRecipe] = useState(
    defaultState.currentRecipe
  );
  const [userFavorites, setUserFavorites] = useState<IRecipeState>({});
  const [edit, setEdit] = useState(false);
  const [loadingBar, setLoadingBar] = useState(false);
  const [showAlert, setShowAlert] = useState<IAlertsState>(
    defaultState.showAlert
  );

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
      setDatabaseData((state) => {
        return state;
      });
    }
  }, [
    activeUser.uid,
    dbRef,
    setUserFavorites,
    trigger,
    setDatabaseData,
    setAddMealItemOpen,
  ]);

  function convertDate(date: string) {
    let converted = date.split(" ");
    let mapped = converted
      .map((s, i) => {
        if (i === 1) {
          return s.slice(0, -3);
        }
        return s;
      })
      .join(" ");

    return mapped;
  }

  // console.log(Date.parse(convertDate("september 11th, 2022")) - 2629746000); //a month before date

  useEffect(() => {
    for (var date in databaseData) {
      if (Date.parse(convertDate(date)) < Date.now() - 1814400000) {
        remove(ref(database, `users/${activeUser.uid}/meals/${date}`));
      }
    }
  }, [activeUser, databaseData]);

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
        edit,
        setEdit,
        loadingBar,
        setLoadingBar,
        showAlert,
        setShowAlert,
      }}
    >
      {children}
    </UserDataContext.Provider>
  );
};
