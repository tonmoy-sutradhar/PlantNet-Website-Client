import axios from "axios";

export const imageUpload = async (imageData) => {
  const formData = new FormData();
  formData.append("image", imageData);
  const { data } = await axios.post(
    `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
    formData
  );
  return data.data.display_url;
};

// export const saveUser = async (user) => {
//   axios.post(`${import.meta.env.VITE_API_URL}/users/${currentUser?.email}`, {
//     name: currentUser?.displayName,
//     image: currentUser?.photoURL,
//     email: currentUser?.email,
//   });
// };

// help chatgpt
export const saveUser = async (user) => {
  try {
    await axios.post(`${import.meta.env.VITE_API_URL}/users/${user.email}`, {
      name: user.displayName,
      image: user.photoURL,
      email: user.email,
    });
    console.log("User saved successfully!");
  } catch (error) {
    console.error("Error saving user:", error);
    throw error; // Re-throw the error to be handled by the caller
  }
};
