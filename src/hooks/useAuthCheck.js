import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
//import { userLoggedIn } from "../features/auth/authSlice";
import { setUser } from "../store/api/auth/authSlice";

export default function useAuthCheck() {
  const dispatch = useDispatch();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const localAuth = localStorage?.getItem("auth");

    if (localAuth) {
      const auth = JSON.parse(localAuth);
      if (auth?.accessToken && auth?.user_id) {
        dispatch(
          setUser({
            accessToken: auth.accessToken,
            user: auth.user_id,
          })
        );
      }
    }
    setAuthChecked(true);
  }, [dispatch, setAuthChecked]);

  return authChecked;
}
