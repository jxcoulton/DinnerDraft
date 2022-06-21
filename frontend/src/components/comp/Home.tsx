import Center from "../utils/Center";
import Planner from "./Planner";
import Banner from "./Banner";

const Home = () => {
  return (
    <>
      <Center height={"auto"}>
        <Banner />
        <Planner />
      </Center>
    </>
  );
};

export default Home;
