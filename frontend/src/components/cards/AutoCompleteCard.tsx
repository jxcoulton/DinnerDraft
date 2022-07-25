import { useContext } from "react";
import { UserDataContext } from "../../context/userData";
import uuid from "react-uuid";

type Props = {
  mealType?: string;
  autoComplete: (input: string) => any[];
};

const AutoCompleteCard: React.FC<Props> = ({
  mealType,
  autoComplete,
}: Props) => {
  const { value, setValue } = useContext(UserDataContext);

  //set the input to the clicked autocomplete
  function handleSetValue(e: React.MouseEvent) {
    e.preventDefault();
    setValue({
      ...value,
      [(e.target as HTMLDivElement).getAttribute("data-name") as string]: (
        e.target as HTMLDivElement
      ).innerHTML,
    });
  }

  return (
    <ul
      style={{
        position: "absolute",
        width: "400px",
        margin: "0",
        padding: "0",
        zIndex: "2",
      }}
    >
      {autoComplete(`${value[mealType as keyof typeof value]}`)?.map((each) => (
        <div
          key={uuid()}
          onClick={handleSetValue}
          data-name={mealType}
          data-value={each}
          style={{
            backgroundColor: "#e9e6e6",
            padding: "15px 20%",
            width: "auto",
            border: "solid 0.5px lightgrey",
            borderBottom: "none",
          }}
        >
          {each.title}
        </div>
      ))}
    </ul>
  );
};
export default AutoCompleteCard;
