import { AlertColor } from "@mui/material";

export default interface IAlertState {
  show: boolean;
  severity?: AlertColor;
  message?: string;
}
