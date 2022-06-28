import { useState } from "react";
import { format, eachDayOfInterval, startOfWeek, endOfWeek } from "date-fns";
import MealType from "./MealType";
import { Tabs, Tab, Box, Typography } from "@mui/material";
import uuid from "react-uuid";

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
  };

  let dateList = eachDayOfInterval({
    start: startOfWeek(today),
    end: endOfWeek(today),
  });

  return (
    <div style={{ width: "90vw", padding: "5vh 0" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        {dateList.map((day) => {
          return (
            <Box
              style={{
                backgroundColor: "lightblue",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-end",
                borderRadius: "50%/30%",
                border: "solid grey 1px",
                // minWidth: '2rem',
                minHeight: "4rem",
                marginBottom: '5vh'
              }}
              key={uuid()}
            >
              <Typography>{`${format(day, "eee")}`}</Typography>
              <button
                key={uuid()}
                onClick={(e) => handleChangeDay(day, e)}
                style={{
                  borderRadius: "100px",
                  minWidth: "2.5rem",
                  minHeight: "2.5rem",
                }}
              >{`${format(day, "d")}`}</button>
            </Box>
          );
        })}
      </div>
      <MealType startDate={startDate} activeUser={activeUser} />
    </div>
  );
};

export default DatePicker;
