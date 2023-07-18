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

export const getAllUsers = async () => {
  try {
    const response = await fetch(`${BASE_URL}/users`);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const getAllGames = async () => {
  try {
    const response = await fetch(`${BASE_URL}/games`);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const postGames = async (
  title,
  genre,
  price,
  platform,
  release_date,
  image_path
) => {
  try {
    const response = await fetch(`${BASE_URL}/games`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        genre: genre,
        price: price,
        platform: platform,
        release_date: release_date,
        image_path: image_path,
      }),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const getMyShoppingCart = async () => {
  // if (!token) {
  //   return;
  // }
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");
  let response;
  try {
    console.log(token);
    if (token) {
      response = await fetch(`${BASE_URL}/cart`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await response.json();
      return result;
    } else {
      const notLoggedInCart = localStorage.getItem("cart");
      return JSON.parse(notLoggedInCart);
    }
  } catch (error) {
    console.log(error);
  }
};

export const updateGame = async (
  id,
  title,
  genre,
  price,
  platform,
  release_date,
  image_path
) => {
  try {
    const response = await fetch(`${BASE_URL}/games/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        genre: genre,
        price: price,
        platform: platform,
        release_date: release_date,
        image_path: image_path,
      }),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const postGameToShoppingCart = async (cartId, gameId) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return;
  }
  try {
    response = await fetch(`${BASE_URL}/cart/${cartId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        cartId: cartId,
        gameId: gameId,
      }),
    });
    const result = await response.json();

    return result;
  } catch (error) {
    console.log(error);
  }
};
