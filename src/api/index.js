export const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://gamestahhhp.render.com"
    : "http://localhost:4000/api";

export const loginUser = async (username, password) => {
  try {
    const response = await fetch(`${BASE_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });
    const result = await response.json();
    console.log("TEST!:", result);
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const fetchUserData = async (token) => {
  try {
    const response = await fetch(`${BASE_URL}/users/login`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
};
