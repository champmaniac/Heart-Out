import React, { useState } from "react";
import "./Login.css";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import { auth, provider } from "../../firebase";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const signIn = () => {
        auth.signInWithPopup(provider).catch((e) => {
            alert(e.message);
        });
    };

    const handleSignIn = (e) => {
        e.preventDefault();

        auth
            .signInWithEmailAndPassword(email, password)
            .then((auth) => {
                console.log(auth);
            })
            .catch((e) => alert(e.message));
    };

    const registerSignIn = (e) => {
        e.preventDefault();

        auth
            .createUserWithEmailAndPassword(email, password)
            .then((auth) => {
                if (auth) {
                    console.log(auth);
                }
            })
            .catch((e) => alert(e.message));
    };
    return (
        <div className="login">
            <div className="login__container">
                <div className="login__logo">
                    <img
                        src="https://qphs.fs.quoracdn.net/main-qimg-a2acef8d1334020f0153f839261f9f74"
                        alt=""
                    />
                </div>
                <div className="login__desc">
                    <p>Here you HEAR your HEART, and pour it OUT with your ART without fear, because, people are always willing to help each other.</p>
                    <p style={{ color: "#b92b27", fontSize: "25px" }}>
                        Handcrafted with ❤️ by {" "}
                    </p>
                    <h3>Prantik Mukherjee</h3>
                </div>
                <div className="login__auth">
                    <div className="login__authOptions">
                        <div className="login__authOption">
                            <img
                                className="login__googleAuth"
                                src="https://media-public.canva.com/MADnBiAubGA/3/screen.svg"
                                alt=""
                            />
                            <p onClick={signIn}>Continue With Google</p>
                        </div>
                        {/* <div className="login__authOption">
                            <img
                                className="login__googleAuth"
                                src="https://1000logos.net/wp-content/uploads/2016/11/Facebook-logo-500x350.png"
                                alt=""
                            />
                            <span>Continue With Facebook</span>
                        </div> */}
                        <div className="login__authDesc">
                            <p>
                                <span style={{ color: "blue", cursor: "pointer" }}>
                                    Sign Up With Email
                                </span>
                                . By continuing you indicate that you have read and agree to
                                Quora's
                                <span style={{ color: "blue", cursor: "pointer" }}>
                                    Terms of Service{" "}
                                </span>
                                and{" "}
                                <span style={{ color: "blue", cursor: "pointer" }}>
                                    Privacy Policy
                                </span>
                                .
                            </p>
                        </div>
                    </div>
                    <div className="login__emailPass">
                        <div className="login__label">
                            <h4>Login</h4>
                        </div>
                        <div className="login__inputFields">
                            <div className="login__inputField">
                                <input
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    type="text"
                                    placeholder="Email"
                                />
                            </div>
                            <div className="login__inputField">
                                <input
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    type="password"
                                    placeholder="Password"
                                />
                            </div>
                        </div>
                        <div className="login__forgButt">
                            <small>Forgot Password?</small>
                            <button onClick={handleSignIn}>Login</button>
                        </div>
                        <button onClick={registerSignIn}>Register</button>
                    </div>
                </div>
                <div className="login__lang">
                    <p>हिन्दी</p>
                    <ArrowForwardIosIcon fontSize="small" />
                </div>
                <div className="login__footer">
                    <p>About</p>
                    <p>Languages</p>
                    <p>Careers</p>
                    <p>Businesses</p>
                    <p>Privacy</p>
                    <p>Terms</p>
                    <p>Contact</p>
                    <p>&copy; HeartOut Inc. 2022</p>
                </div>
            </div>
        </div>
    );
}

export default Login;
