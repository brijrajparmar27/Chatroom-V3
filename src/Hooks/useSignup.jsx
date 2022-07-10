import { useEffect, useState } from "react";
import { auth } from "../Firebase/config";

const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // const [cancelled, isCancelled] = useState(false);

  // useEffect(() => {
  //   return () => {
  //     console.log("cancelled");
  //     isCancelled(true);
  //   };
  // }, []);
  
  const signup = async ({email, pass, uname}) => {
    try {
      setLoading(true);
      let res = await auth.createUserWithEmailAndPassword(email, pass);

      if (!res) {
        throw new Error("Could not complete signup");
      }

      await res.user.updateProfile({ displayName:uname });

      // !cancelled && setLoading(false);
      // !cancelled && setError(null);
      setLoading(false);
      setError(null);
      return res.user;
    } catch (e) {
      // console.log(e);
      // !cancelled && setError(e);
      // !cancelled && console.log("setError set");
      // !cancelled && setLoading(false);
      setError(e);
      setLoading(false);
    }
  };

  return { loading, error, signup };
};

export default useSignup;
