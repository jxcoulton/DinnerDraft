import { useContext } from "react";
import { UserDataContext } from "../../context/userData";
import MealCategoryCard from "../cards/MealCategoryCard";
import { format, eachDayOfInterval, startOfWeek, endOfWeek } from "date-fns";
import { Button } from "@mui/material";

const DateButtons: React.FC = () => {
  const { startDate, setStartDate } = useContext(UserDataContext);

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
            <Button
              className="date-picker__button"
              variant="contained"
              sx={{ margin: "5px" }}
              key={day.getDate()}
              aria-current={
                day.setHours(0, 0, 0, 0) === startDate.setHours(0, 0, 0, 0)
                  ? "true"
                  : "false"
              }
              onClick={() => setStartDate(day)}
            >
              {`${format(day, "eee d")}`}
            </Button>
          );
        })}
      </div>
      <MealCategoryCard />
    </div>
  );
};

export default DateButtons;
