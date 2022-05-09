import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../config/firebase";

const Logout = () => {
  const navigate = useNavigate();

  const logout = () => {
    signOut(auth)
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return <button onClick={logout}>Logout</button>;
};

export default Logout;
