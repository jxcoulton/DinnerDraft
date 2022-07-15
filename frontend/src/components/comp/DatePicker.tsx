import { useContext } from "react";
import { UserDataContext } from "../context/userData";
import MealType from "./MealType";
import { format, eachDayOfInterval, startOfWeek, endOfWeek } from "date-fns";
import { Box, Button, Typography } from "@mui/material";
import uuid from "react-uuid";

const DatePicker: React.FC = () => {
  const { startDate, setStartDate } = useContext(UserDataContext);

  function handleChangeDay(day: Date, e: any) {
    setStartDate(day);
  }

  let dateList = eachDayOfInterval({
    start: startOfWeek(new Date()),
    end: endOfWeek(new Date()),
  });

  //edit aria-current for current selected date
  //change some state names to make more sense

  return (
    <div style={{ width: "90vw", padding: "5vh 0" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          padding: "5%",
        }}
      >
        {dateList.map((day) => {
          return (
            <Button
              className="date-picker__button"
              variant="contained"
              sx={{ margin: "5px" }}
              key={uuid()}
              aria-current={
                day.setHours(0, 0, 0, 0) === startDate.setHours(0, 0, 0, 0)
                  ? "true"
                  : "false"
              }
              onClick={(e) => handleChangeDay(day, e)}
            >
              {`${format(day, "eee d")}`}
            </Button>
          );
        })}
      </div>
      <MealType />
    </div>
  );
};

export default DatePicker;
