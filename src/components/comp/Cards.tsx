import React from "react";
import {
  format,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  // startOfDay,
} from "date-fns";
import { auth } from "../../config/firebase";
import { onAuthStateChanged } from "firebase/auth";

const Card: React.FC = () => {
  const today = new Date();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      // console.log(user);
      // ...
    } else {
      // User is signed out
      // ...
    }
  });
  // console.log(new Date(2022, 3, 4, 10, 32, 0));

  // const handleOpen = (e: React.MouseEvent<HTMLHeadingElement>): void => {
  //   const target = e.target as Element;
  //   const prevSibling = target.previousElementSibling as HTMLElement;

  //   if (prevSibling.style.display === "block") {
  //     prevSibling.style.display = "none";

  //   } else {
  //     prevSibling.style.display = "block";
  //   }
  // };

  const thisWeek: Date[] = eachDayOfInterval({
    start: startOfWeek(today),
    end: endOfWeek(today),
  });

  const weekCards: JSX.Element[] = thisWeek.map((item, index) => {
    // const isToday =
    //   item.toString() === startOfDay(today).toString() ? "block" : "none";
    return (
      <div
        style={{ backgroundColor: "red", width: "auto", height: "auto" }}
        key={index}
      >
        <h1>
          {format(item, "eeee")} - {format(item, "PPP")}
        </h1>
        <div>
          <h2>breakfast</h2>
          <input />
          <button>add</button>
          {/*add item to list and database*/}
          <button>add another item</button>
          {/*function to add more items to the list*/}
          <h2>lunch</h2>
          <input />
          <button>add</button>
          <button>add another item</button>
          <h2>dinner</h2>
          <input />
          <button>add</button>
          <button>add another item</button>
          <h2>snacks</h2>
          <input />
          <button>add</button>
          <button>add another item</button>
        </div>
        {/* <h2 onClick={(e) => handleOpen(e)}>edit</h2> */}
      </div>
    );
  });

  //create a return for each day of the week sunday to saturday
  //create next and previous week
  //collapsed card for not todays date
  //click item to expand for recipe ++
  //default empty, click to add meal

  return (
    <div>
      <div>last week</div>
      {weekCards}
      <div>next week</div>
    </div>
  );
};

export default Card;
