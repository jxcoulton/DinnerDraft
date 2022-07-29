import { createContext, useState } from "react";
import IPublicContextState from "../interface/IPublicContextState";
import IAlertsState from "../interface/IAlertsState";
import { AlertColor } from "@mui/material";

const defaultPublicState = {
  loading: false,
  setLoading: () => {},
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
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState<IAlertsState>(
    defaultPublicState.showAlert
  );

  return (
    <PublicVariablesContext.Provider
      value={{
        loading,
        setLoading,
        showAlert,
        setShowAlert,
      }}
    >
      {children}
    </PublicVariablesContext.Provider>
  );
};
