import Logout from "../auth/Logout";
import Center from "../utils/Center";
import Cards from "./Cards";

const Home = () => {
  return (
    <>
      <Center height={"auto"}>
        <Logout />
        <Cards />
      </Center>
    </>
  );
};

export default Home;
