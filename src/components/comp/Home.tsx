import Logout from "../auth/Logout";
import Center from "../utils/Center";
import Planner from "./Planner";

const Home = () => {
  return (
    <>
      <Center height={"auto"}>
        <Logout />
        <Planner />
      </Center>
    </>
  );
};

export default Home;
