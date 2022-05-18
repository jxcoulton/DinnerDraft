import { useState } from "react";
import { subDays, addDays } from "date-fns";
import MealType from "./MealType";

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

  const handlePrevDate = () => {
    startDate > subDays(today, 13) && setStartDate(subDays(startDate, 1));
  };

  const handleNextDate = () => {
    startDate < addDays(today, 12) && setStartDate(addDays(startDate, 1));
  };

  const handleToday = () => {
    setStartDate(today);
  };

  return (
    <div>
      <button onClick={handlePrevDate}>prev day</button>
      <button onClick={handleToday}>today</button>
      <button onClick={handleNextDate}>next day</button>
      <MealType startDate={startDate} activeUser={activeUser} />
    </div>
  );
};

export default DatePicker;
