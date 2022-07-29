import AlertsState from "./IAlertsState";

export default interface IPublicContextState {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  showAlert: AlertsState;
  setShowAlert: React.Dispatch<React.SetStateAction<AlertsState>>;
}
