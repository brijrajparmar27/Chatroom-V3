import { useEffect, useState } from "react";
import { auth, storage } from "../Firebase/config";

const useDP = () => {
  const [progress, setProgress] = useState();

  useEffect(() => {
    if (progress == 1) {
      setProgress(null);
    }
  }, [progress]);

  const updateProfilePic = async (imageFile, user, { onComplete }) => {
    console.log("update function");
    const uploadTask = storage
      .ref(`ProfilePictures/${user.uid}.png`)
      .put(imageFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog = snapshot.bytesTransferred / snapshot.totalBytes;
        setProgress(prog);
      },
      (error) => console.log(error),
      () => {
        storage
          .ref("ProfilePictures")
          .child(`${user.uid}.png`)
          .getDownloadURL()
          .then((url) => {
            if (onComplete) {
              onComplete(url);
            }
            user.updateProfile({ photoURL: url });
          });
      }
    );
  };
  return { updateProfilePic, progress };
};
export default useDP;
