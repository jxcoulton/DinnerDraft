import Banner from "../common/Banner";
import DateButtons from "../buttons/DateButtons";
import MealCategoryCard from "../cards/MealCategoryCard";
import { useTheme, Card } from "@mui/material";

const Home = () => {
  const theme = useTheme();

  return (
    <>
      <Banner />
      <Card
        sx={{
          backgroundColor: theme.palette.background.default,
          width: "90%",
          maxWidth: "1200px",
          margin: "1rem auto",
          padding: "1.5rem",
        }}
      >
        <DateButtons />
      </Card>
      <MealCategoryCard />
    </>
  );
};

export default Home;
