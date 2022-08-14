import { useContext } from "react";
import { UserDataContext } from "../../context/userData";
import MealCategoryCard from "../cards/MealCategoryCard";
import { format, eachDayOfInterval, startOfWeek, endOfWeek } from "date-fns";
import { Button, useTheme, styled, Theme } from "@mui/material";

type StyleProps = {
  theme: Theme;
};

const StyledDateButton = styled(Button)(({ theme }: StyleProps) => ({
  background: theme.palette.primary.main,
  margin: "5px",
  "&:hover": {
    background: theme.palette.secondary.main,
  },
}));

const DateButtons: React.FC = () => {
  const { startDate, setStartDate } = useContext(UserDataContext);
  const theme = useTheme();

  //list of current weeks dates
  const dateList = eachDayOfInterval({
    start: startOfWeek(new Date()),
    end: endOfWeek(new Date()),
  });

  return (
    <div style={{ width: "90vw", padding: "5vh 0" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          padding: "5%",
        }}
      >
        {dateList.map((day: Date) => {
          return (
            <StyledDateButton
              theme={theme}
              variant="contained"
              key={day.getDate()}
              onClick={() => setStartDate(day)}
              disabled={
                day.setHours(0, 0, 0, 0) === startDate.setHours(0, 0, 0, 0)
              }
            >
              {`${format(day, "eee d")}`}
            </StyledDateButton>
          );
        })}
      </div>
      <MealCategoryCard />
    </div>
  );
};

export default DateButtons;
