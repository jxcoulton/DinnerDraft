import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../config/firebase";
import { onAuthStateChanged } from "firebase/auth";

const AuthChecker = ({ children }: { children: JSX.Element }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //listen for changes to auth state
    const unsubscribeAuthChange = onAuthStateChanged(auth, () => {
      if (auth.currentUser) {
        setLoading(false);
      } else {
        navigate("/login");
        setLoading(true);
      }
    });

    //cleanup listeners
    return () => {
      unsubscribeAuthChange();
    };
  }, [navigate]);

  return <>{!loading && children}</>;
};

export default AuthChecker;
