
import './App.css';
import React from "react";
import axios from "axios";
import Dashboard from "./Dashboard";


class LoginAndSignUp extends React.Component {

    state = {
        username: "",
        password: "",
        repeatPassword: "",
        token: "",
        errorCode : null,
        signUpPage : false
    }

    SERVER_URL = "http://localhost:9030"

    changeValueByKey = (key, value) => {
        this.setState({
            [key]: value
        })
    }

    getFromServer = (path,keyFromState) => {
        axios.get(path)
            .then(response => {
                let key, value;
                if (response.data.success) {
                    key = keyFromState;
                    value = response.data.token;

                }else {
                    key = "errorCode";
                    value = response.data.errorCode;
                }

                this.changeValueByKey(key,value);

            })
    }

    login = () => {

        this.getFromServer(this.SERVER_URL+"/login?username="
            + this.state.username + "&password=" + this.state.password,
            "token");
    }


    signup = () => {

        this.getFromServer(this.SERVER_URL+"/signUp?username=" + this.state.username +
            "&password=" + this.state.password
            + "&repeat=" + this.state.repeatPassword,
            "token");
        this.setState({
            username: "",
            password: "",
            repeatPassword: ""
        })
    }

    showErrorCode = () => {

        let errorMessage = "";
        switch (this.state.errorCode){

            case -1 : errorMessage = "Please fill in all fields"; break;
            case 104 : errorMessage = "Not exist, SIGN-UP 😁";break;
            case  103 :errorMessage = "Username not available";break;
            case 102 : errorMessage ="Invalid repeat password ";break;
            case 101 : errorMessage ="Error missing password";break;
            case 100: errorMessage = "Error missing username";break;
        }
        return errorMessage;
    }


    render() {
        return (
            <div className="App">
                {
                    this.state.token.length > 0 ?
                        <div>

                            <Dashboard token={this.state.token}/>

                        </div>
                        :
                        <div>

                            <input
                                placeholder={"Enter username: "}
                                value={this.state.username}
                                onChange={(event) => this.changeValueByKey("username", event.target.value)}
                            />
                            <input placeholder={"Enter password: "} value={this.state.password}
                                   onChange={(event) => this.changeValueByKey("password", event.target.value)}

                            />

                            {this.state.signUpPage && (
                                <input
                                    placeholder={"Repeat password: "}
                                    value={this.state.repeatPassword}
                                    onChange={(event) => this.changeValueByKey("repeatPassword", event.target.value)}
                                />
                            )}

                            <div>
                                <button onClick={this.state.signUpPage ? this.signup : this.login}>
                                    {this.state.signUpPage ? "SIGNUP" : "LOGIN"}
                                </button>
                            </div>

                            <div>
                                <button onClick={() => {
                                    this.changeValueByKey("signUpPage", !this.state.signUpPage)
                                    this.changeValueByKey("errorCode", null)
                                }}>
                                    MOVE TO {this.state.signUpPage ? "LOGIN" : "SIGNUP"} PAGE
                                </button>
                            </div>


                            <div>{this.showErrorCode()}</div>

                        </div>
                }

            </div>
        );

    }
}

export default LoginAndSignUp;
