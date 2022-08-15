import { List, ListItem, useTheme } from "@mui/material";
import { useContext } from "react";
import { UserDataContext } from "../../context/userData";

type Props = {
  mealType?: string;
  autoComplete: (input: string) => any[];
  inputRef?: React.MutableRefObject<any>;
};

const AutoCompleteCard: React.FC<Props> = ({
  mealType,
  autoComplete,
  inputRef,
}: Props) => {
  const { value, setValue } = useContext(UserDataContext);
  const theme = useTheme();

  //set the input to the clicked autocomplete
  function handleSetValue(e: React.MouseEvent) {
    e.preventDefault();
    setValue({
      ...value,
      [(e.target as HTMLDivElement).getAttribute("data-name") as string]: (
        e.target as HTMLDivElement
      ).innerHTML,
    });
    if (inputRef?.current !== undefined) {
      inputRef.current.firstChild.focus();
    }
  }

  return (
    <List
      style={{
        position: "absolute",
        zIndex: "2",
      }}
    >
      {autoComplete(`${value[mealType as keyof typeof value]}`)?.map((each) => (
        <ListItem
          key={each.id}
          onClick={handleSetValue}
          data-name={mealType}
          data-value={each}
          style={{
            backgroundColor: theme.palette.grey[50],
            cursor: "pointer",
          }}
        >
          {each.title}
        </ListItem>
      ))}
    </List>
  );
};
export default AutoCompleteCard;
