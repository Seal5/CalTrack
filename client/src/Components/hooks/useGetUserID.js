export const useGetUserID = () => {
  // store user ID in local storage
  return window.localStorage.getItem("userID");
};
