import React from "react";
import { useNavigate } from "react-router-dom";

export default function Profile({ user }) {
    const nav = useNavigate();

    const container = {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: 'linear-gradient(to bottom, #7e5bef, #ffffff)',
        fontFamily: "cursive",
    };

    const btn = {
        padding: "12px 25px",
        margin: "10px",
        borderRadius: "10px",
        border: "none",
        fontWeight: "bold",
        background: "#7e5bef",
        color: "white",
        cursor: "pointer",
        fontSize: "18px",
    };

    return (
        <div style={container}>
            {user ? (
                <>
                    <h1>Welcome, {user.name || "User"} </h1>
                    <p>Your profile page is here.</p>
                </>
            ) : (
                <>
                    <h1>Welcome to Todo App </h1>
                    <p>Please Login or Register to continue</p>
                    <div>
                        <button style={btn} onClick={() => nav("/login")}>
                            Login
                        </button>
                        <button style={btn} onClick={() => nav("/register")}>
                            Register
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}
