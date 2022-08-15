import { useContext } from "react";
import { UserDataContext } from "../../context/userData";
import { format, eachDayOfInterval, startOfWeek, endOfWeek } from "date-fns";
import { Box, Button, Typography, useTheme } from "@mui/material";

const DateButtons: React.FC = () => {
  const { startDate, setStartDate } = useContext(UserDataContext);
  const theme = useTheme();

  //list of current weeks dates
  const dateList = eachDayOfInterval({
    start: startOfWeek(new Date()),
    end: endOfWeek(new Date()),
  });

  return (
    <Box
      style={{
        display: "flex",
        justifyContent: "space-around",
      }}
    >
      {dateList.map((day: Date) => {
        return (
          <Button
            color={
              day.setHours(0, 0, 0, 0) === startDate.setHours(0, 0, 0, 0)
                ? "primary"
                : "inherit"
            }
            variant="contained"
            key={day.getDate()}
            onClick={() => setStartDate(day)}
            disableElevation
            sx={{
              backgroundColor:
                day.setHours(0, 0, 0, 0) === startDate.setHours(0, 0, 0, 0)
                  ? "primary"
                  : "inherit",
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
              color={theme.palette.text.primary}
              borderRadius={50}
              width={"100%"}
              minHeight={"2.5rem"}
              sx={{
                border:
                  day.setHours(0, 0, 0, 0) === startDate.setHours(0, 0, 0, 0)
                    ? `${theme.palette.primary.main} solid`
                    : `${theme.palette.grey[100]} solid`,
                backgroundColor: theme.palette.grey[50],
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
    </Box>
  );
};

export default DateButtons;
