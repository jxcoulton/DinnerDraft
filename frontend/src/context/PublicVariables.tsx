import { createContext, useState } from "react";
import IPublicContextState from "../interface/IPublicContextState";
import IAlertsState from "../interface/IAlertsState";
import { AlertColor } from "@mui/material";

const defaultPublicState = {
  loadingBar: false,
  setLoadingBar: () => {},
  loadingCircle: false,
  setLoadingCircle: () => {},
  showAlert: {
    show: false,
    severity: "success" as AlertColor,
    message: "",
  },
  setShowAlert: () => {},
};

export const PublicVariablesContext =
  createContext<IPublicContextState>(defaultPublicState);

export const PublicVariablesProvider: React.FC = ({ children }) => {
  const [loadingBar, setLoadingBar] = useState(false);
  const [loadingCircle, setLoadingCircle] = useState(false);
  const [showAlert, setShowAlert] = useState<IAlertsState>(
    defaultPublicState.showAlert
  );

  return (
    <PublicVariablesContext.Provider
      value={{
        loadingBar,
        setLoadingBar,
        loadingCircle,
        setLoadingCircle,
        showAlert,
        setShowAlert,
      }}
    >
      {children}
    </PublicVariablesContext.Provider>
  );
};
