import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../componentCss/Home.css";
import logo from '../logo/logo.svg';

let userName;
const newUser = () => {
    userName = document.getElementById('room_input').value;
}

const enterToJoin = (event) => {
    if (event.key === "Enter")
    {
        newUser();
        document.getElementById('joinButton').click();
    }
    else return;
}
const Home = () => {
    const [name, setName] = useState("");
    return (
        <div className="home">
            <div className="main_container text-center">
                <div className="login_container ">
                <img src={logo} alt="logo" className="text-center display-1" id="logo" />
                    <h1 className="text-center display-1">Star Chat </h1>
                    <div className="container input_container text-center">
                        <input onChange={e => { setName(e.target.value) }} onKeyPress={enterToJoin} type="text" className="form-control my-2 p-2 mg_input" id="room_input" placeholder="Enter Your Name" />
                        <Link onClick={e => !name ? e.preventDefault() : null} to="/chat"> <button onClick={newUser} type="submit" className="btn mt-2 btn-danger text-center" id="joinButton">Join Room</button> </Link>
                    </div>
                </div>
            </div>
        </div>


    );
};

export default Home;
export { userName };
