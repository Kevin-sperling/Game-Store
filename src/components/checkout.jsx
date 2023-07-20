import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BASE_URL } from "../api";
import { useNavigate } from "react-router-dom";

const Checkout = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");

  const [creditCard, setCreditCard] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [cvv, setCvv] = useState("");

  const {
    user,
    setUser,
    username,
    setUsername,
    password,
    setPassword,
    shoppingCart,
    setShoppingCart,
  } = props;

  useEffect(() => {
    (async () => {
      const username = await localStorage.getItem("username");
      console.log("username:", username);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      // let newCart = await fetchCart();

      // if (!newCart.length) {
      //   newCart = JSON.parse(localStorage.getItem("cart"));
      // }

      console.log(shoppingCart);
      setShoppingCart(shoppingCart);
    })();
  }, []);

  console.log("outside of useeffect", shoppingCart[0]);

  const taxRate = (price) => {
    return price * 0.2;
  };

  const handleFirstName = (e) => {
    e.preventDefault();
    setFirstName(e.target.value);
  };

  const handleLastName = (e) => {
    e.preventDefault();
    setLastName(e.target.value);
  };

  const handleEmail = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  };

  const handlePhoneNumber = (e) => {
    e.preventDefault();
    setPhoneNumber(e.target.value);
  };

  const handleAddress = (e) => {
    e.preventDefault();
    setAddress(e.target.value);
  };

  const handleCity = (e) => {
    e.preventDefault();
    setCity(e.target.value);
  };

  const handleState = (e) => {
    e.preventDefault();
    setState(e.target.value);
  };

  const handleZipCode = (e) => {
    e.preventDefault();
    setZipCode(e.target.value);
  };

  const handleCreditCardChange = (e) => {
    e.preventDefault();
    setCreditCard(e.target.value);
  };

  const handleCvvChange = (e) => {
    e.preventDefault();
    setCvv(e.target.value);
  };

  const handleExpirationDateChange = (e) => {
    e.preventDefault();
    setExpirationDate(e.target.value);
  };

  const handleCreditCardSubmit = async (e) => {
    e.preventDefault();
    setCreditCard("");
    setCvv("");
    setExpirationDate("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhoneNumber("");
    setAddress("");
    setCity("");
    setState("");
    setZipCode("");

    console.log("clicked submit");
    if (!firstName) {
      alert("Please enter your first name");
      setConfirm(false);
    } else {
      localStorage.setItem("firstName", firstName);
    }
    if (!lastName) {
      alert("Please enter your last name");
      setConfirm(false);
    } else {
      localStorage.setItem("lastName", lastName);
    }
    if (!email) {
      alert("Please enter your email");
      setConfirm(false);
    } else {
      localStorage.setItem("email", email);
    }
    if (!phoneNumber) {
      alert("Please enter your phone number");
      setConfirm(false);
    } else {
      localStorage.setItem("phoneNumber", phoneNumber);
    }
    if (!address) {
      alert("Please enter your address");
      setConfirm(false);
    } else {
      localStorage.setItem("address", address);
    }
    if (!city) {
      alert("Please enter your city");
      setConfirm(false);
    } else {
      localStorage.setItem("city", city);
    }
    if (!state) {
      alert("Please enter your state");
      setConfirm(false);
    } else {
      localStorage.setItem("state", state);
    }
    if (!zipCode) {
      alert("Please enter your zip code");
      setConfirm(false);
    } else {
      localStorage.setItem("zipCode", zipCode);
    }
    setConfirm(true);
  };

  return (
    <div>
      <h1 className="card-title">
        <b>Checkout</b>
      </h1>

      <button onClick={() => fetchCart()}>
        Click here to view cart in console
      </button>

      <form onSubmit={handleSubmit}>
        <p>Please enter your shipping and billing information.</p>
        <input
          type="text"
          placeholder="First Name"
          onChange={handleFirstName}
        />
        <input type="text" placeholder="Last Name" onChange={handleLastName} />
        <input type="text" placeholder="Email" onChange={handleEmail} />
        <input
          type="text"
          placeholder="Phone Number"
          onChange={handlePhoneNumber}
        />
        <input type="text" placeholder="Address" onChange={handleAddress} />
        <input type="text" placeholder="City" onChange={handleCity} />
        <input type="text" placeholder="State" onChange={handleState} />
        <input type="text" placeholder="Zip Code" onChange={handleZipCode} />
        <button type="submit" onClick={handleSubmit}>
          Submit
        </button>

        {confirm === true}

        <div>
          <h2>Please enter your payment information</h2>
          <p>Shipping to:</p>

          <div>
            {localStorage.getItem("firstName")}{" "}
            {localStorage.getItem("lastName")}
          </div>
          <div>
            {localStorage.getItem("address")} {localStorage.getItem("zipCode")}
          </div>
        </div>

        <div>
          <h2>Payment Information</h2>
          <p>Card Number</p>
          <input
            type="text"
            placeholder="Card Number"
            value={creditCard}
            onChange={handleCreditCardChange}
          />
          <p>Expiration Date</p>
          <input
            type="text"
            placeholder="Expiration Date"
            value={expirationDate}
            onChange={handleExpirationDateChange}
          />
          <p>CVV</p>
          <input
            type="text"
            placeholder="CVV"
            value={cvv}
            onChange={handleCvvChange}
          />
          <button type="submit" onClick={handleCreditCardSubmit}>
            Confirm Payment
          </button>
        </div>

        <span>
          {shoppingCart.map((item, index) => {
            console.log("item", item);
            return (
              <div className="content" key={`${index}, ${item.id}`}>
                {/* <h2>
                  {item} {item.}
                </h2> */}
                <h2>Price: ${item.price} USD</h2>
                <h2>Item Tax: ${Math.round(taxRate(item.price))} USD</h2>
                <h2>
                  Total: ${Math.round(taxRate(item.price))} + {item.price} ={" "}
                  {Math.round(taxRate(item.price)) + +item.price}{" "}
                </h2>
                {/* {cartTotal += item.cost} */}
                {/* {console.log('cartTotal', cartTotal)} */}
              </div>
            );
          })}
        </span>
        <button>
          <Link to="/cart">Back to Cart</Link>
        </button>
      </form>

      {/* {games.length > 0 ? (
        <>
          {games.map((game) => (
            <div
              className="card card-compact w-96 bg-base-100 shadow-xl"
              key={game.id}
            >
              <h2 className="card-title">{game.title}</h2>
              <div>
                <img src={game.image_path} alt={game.title} />
              </div>

              <div>{game.price}</div>
              <div>
                <button onClick={() => increaseQuantity(game.title)}>
                  Add another to the cart
                </button>{" "}
                <br />
                <button onClick={() => deleteGameFromCart(game.cart_id)}>
                  Delete from cart
                </button>
              </div>
              <br />
              <br />
            </div>
          ))}

          <h1>
            <b>
              Total Price:{" "}
              {games.reduce((total, game) => total + parseFloat(game.price), 0)}
            </b>
          </h1>
          <button>Checkout</button>
        </>
      ) : (
        <>
          <div>Loading...</div>
          <button onClick={() => fetchCart()}>view cart</button>
        </>
      )} */}
    </div>
  );
};

export default Checkout;
