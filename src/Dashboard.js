import './App.css';
import React from "react";
import axios from "axios";
import App from "./App";
import MyProfile from "./MyProfile";
import {BrowserRouter, Route, Routes, NavLink} from "react-router-dom";
import LoginAndSignUp from "./LoginAndSignUp";
import PrintList from "./PrintList";
import Search from "./Search";
class Dashboard extends React.Component{

    state = {
        token:null
    }

    componentDidMount() {
        this.setState({
            token: this.props.token
        })
    }

    render() {
        return(
            <div>
                {this.state.token != null ?
                    <BrowserRouter>
                        <div className={"menu-bar"}>
                            <NavLink className={"nav-item"} to={"/MyProfile"}>My Profile </NavLink>
                            <NavLink className={"nav-item"} to={"/Home"}> Home </NavLink>
                            <NavLink className={"nav-item"} to={"/Search"}> Search </NavLink>
                        </div>

                        <Routes>
                            <Route path="/MyProfile" element={<MyProfile token={this.state.token}/>}/>
                            <Route path="/Home" element={<PrintList path={"http://localhost:9030/get-last-posts?token="+ this.state.token}
                                                                    backButton={false}
                                                                    funcGoBack={()=>{}}/>}/>
                            <Route path="/Search" element={<Search token={this.state.token}/>}/>
                        </Routes>
                    </BrowserRouter>
                    :

                    <LoginAndSignUp/>
                }


            </div>
        )
    }
}
export default Dashboard;