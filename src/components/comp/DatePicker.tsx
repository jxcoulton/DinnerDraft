import { useState } from "react";
import { subDays, addDays, format, eachDayOfInterval } from "date-fns";
import MealType from "./MealType";
import { Tabs, Tab } from "@mui/material";

type Props = {
  activeUser: {
    uid?: string | null;
    email?: string | null;
    displayName?: string | null;
  };
};

const DatePicker = ({ activeUser }: Props) => {
  const today = new Date();
  const [startDate, setStartDate] = useState(today);
  const [value, setValue] = useState(7);

  const handleChange = (event: any, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeDay = (day: Date, e: any) => {
    setStartDate(day);
    console.log(e);
  };

  let dateList = eachDayOfInterval({
    start: subDays(today, 7),
    end: addDays(today, 6),
  });

  return (
    <div style={{ width: "90vw", padding: "5vw 0" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          width: "100%",
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons
          allowScrollButtonsMobile
        >
          {dateList.map((day) => {
            return (
              <Tab
                label={`${format(day, "eee, LLL d")}`}
                onClick={(e) => handleChangeDay(day, e)}
                sx={{ width: "33%" }}
              />
            );
          })}
        </Tabs>
      </div>
      <MealType startDate={startDate} activeUser={activeUser} />
    </div>
  );
};

export default DatePicker;
