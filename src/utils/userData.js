export const storeUserDataToLocalStorage = (data) => {
  localStorage.setItem("Token", data.accessToken);
  localStorage.setItem("Email", data.email);
  localStorage.setItem("Name", data.name);
  localStorage.setItem("User Id", data.userId);
  localStorage.setItem("User Status", data.userStatus);
  localStorage.setItem("User Type", data.userTypes);
};
