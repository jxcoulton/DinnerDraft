import { useContext, useState } from "react";
import { UserDataContext } from "../../context/userData";
import {
  format,
  eachDayOfInterval,
  startOfWeek,
  endOfWeek,
  add,
} from "date-fns";
import {
  Box,
  Button,
  Typography,
  useTheme,
  IconButton,
  lighten,
} from "@mui/material";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

//list of current weeks dates
const thisWeek = eachDayOfInterval({
  start: startOfWeek(new Date()),
  end: endOfWeek(new Date()),
});

const nextWeek = eachDayOfInterval({
  start: startOfWeek(add(new Date(), { days: 7 })),
  end: endOfWeek(add(new Date(), { days: 7 })),
});

const DateButtons: React.FC = () => {
  const { startDate, setStartDate } = useContext(UserDataContext);
  const theme = useTheme();
  const [week, setWeek] = useState(thisWeek);

  // thisWeek.some(new Date(new Date().setHours(0, 0, 0, 0)));

  return (
    <Box
      style={{
        display: "flex",
        justifyContent: "space-around",
      }}
    >
      <IconButton
        color={"secondary"}
        onClick={() => setWeek(thisWeek)}
        disabled={week === thisWeek}
      >
        <NavigateBeforeIcon />
      </IconButton>
      {week.map((day: Date) => {
        return (
          <Button
            variant="contained"
            key={day.getDate()}
            onClick={() => setStartDate(day)}
            disableElevation
            sx={{
              backgroundColor:
                day.setHours(0, 0, 0, 0) === startDate.setHours(0, 0, 0, 0)
                  ? `${theme.palette.primary.main}`
                  : `${theme.palette.background.default}`,
              minWidth: "2.5rem",
              minHeight: "4rem",
              borderRadius: "50px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              padding: "0.75rem 0 0 0",
              margin: "0 0.25rem",
            }}
          >
            <Typography variant="caption">{`${format(day, "eee")}`}</Typography>
            <Box
              sx={{
                color: `${theme.palette.text.primary}`,
                border:
                  day.setHours(0, 0, 0, 0) === startDate.setHours(0, 0, 0, 0)
                    ? `${theme.palette.primary.main} solid`
                    : day.setHours(0, 0, 0, 0) ===
                      new Date().setHours(0, 0, 0, 0)
                    ? `${lighten(`${theme.palette.primary.main}`, 0.8)} solid`
                    : `${theme.palette.background.default} solid`,
                backgroundColor: theme.palette.grey[50],
                width: "100%",
                minHeight: "2.5rem",
                borderRadius: "50px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography variant="h5">{`${format(day, "d")}`}</Typography>
            </Box>
          </Button>
        );
      })}
      <IconButton
        color={"secondary"}
        onClick={() => setWeek(nextWeek)}
        disabled={week === nextWeek}
      >
        <NavigateNextIcon />
      </IconButton>
    </Box>
  );
};

export default DateButtons;
