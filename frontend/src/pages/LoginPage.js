//react-router
import { useNavigate, Link } from "react-router-dom";

// react-form-package
import { Form, Button, Field } from "react-form-package";

//axios
import axios from "axios";

import Header from "../components/Header";
import Logo from "../assets/Logo.png";
import FacebookIcon from "@mui/icons-material/Facebook";
import EmailIcon from "@mui/icons-material/Email";
import "./LoginPage.css";

//Pages
import App from "../App";

const LoginPage = () => {
  //useNavigate
  let navigate = useNavigate();

  //handleSubmit login
  const handleSubmit = async (state) => {
    try {
      const emailLogin = await axios.post(
        "http://localhost:8088/api/v1/auth/loginWithEmail",
        state.data
      );
      const numberLogin = await axios.post(
        "http://localhost:8088/api/v1/auth/loginWithNumber",
        state.data
      );
      console.log(emailLogin.data);
      console.log(numberLogin.data.status);

      if (
        emailLogin.data.status === "valid credentials" ||
        numberLogin.data.status === "valid credentials"
      ) {
        // alert('User login')

        //Save Local Storage
        if (emailLogin.data.status === "valid credentials") {
          localStorage.setItem(
            "loginUser",
            JSON.stringify(emailLogin.data.user)
          );
        } else {
          localStorage.setItem(
            "loginUser",
            JSON.stringify(numberLogin.data.user)
          );
        }
        //Navigate to Hompage
        navigate("/");
      } else {
        alert("Wrong credentials");
      }
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div className="login">
      <Header />
      <div className="login__container">
        <Form validate>
          <div className="login__page">
            <div className="login__left">
              {/* email or number */}
              <label htmlFor="email" className="sr-only">
                Phone Number or Email address*
              </label>
              {/* <input type="email" id="inputEmail" class="form-control" placeholder="Email address" required="" autofocus=""/> */}
              <Field
                type="text"
                className="form-control"
                placeholder="Email Address"
                id="email"
                required
              />

              <br />
              <br />

              {/* password  */}
              <label htmlFor="password" className="sr-only">
                Password*
              </label>
              {/* <input type="password" id="inputPassword" class="form-control" placeholder="Password" required=""/> */}
              <Field
                type="password"
                id="password"
                className="form-control"
                placeholder="Password"
                required
              />
            </div>

            <div className="login__right">
              {/* <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button> */}
              <div className="log__sign">
                <Button
                  className="btn btn-md btn-primary btn-block"
                  type="submit"
                  onClick={(state) => {
                    handleSubmit(state);
                  }}
                >
                  Sign in
                </Button>
                <Link to="/signup">
                  <button
                    className="btn btn-lg btn-primary btn-block"
                    type="submit"
                  >
                    Sign up
                  </button>
                </Link>
              </div>
              <div className="socials">
                <span>Or Login With</span>
                <button
                  className="btn btn-lg btn-primary btn-block"
                  type="submit"
                >
                  <FacebookIcon /> Facebook
                </button>
                <button
                  className="btn btn-lg btn-primary btn-block"
                  type="submit"
                >
                  <EmailIcon /> Gmail
                </button>
              </div>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
