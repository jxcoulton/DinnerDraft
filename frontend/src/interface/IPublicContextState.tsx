import AlertsState from "./IAlertsState";

export default interface IPublicContextState {
  loadingBar: boolean;
  setLoadingBar: React.Dispatch<React.SetStateAction<boolean>>;
  loadingCircle: boolean;
  setLoadingCircle: React.Dispatch<React.SetStateAction<boolean>>;
  showAlert: AlertsState;
  setShowAlert: React.Dispatch<React.SetStateAction<AlertsState>>;
}
