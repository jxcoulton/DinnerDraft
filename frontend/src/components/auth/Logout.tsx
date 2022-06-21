import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../config/firebase";
import { IconButton } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";

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

  return (
    <IconButton
      onClick={logout}
    >
      <LogoutIcon/>
    </IconButton>
  );
};

export default Logout;
