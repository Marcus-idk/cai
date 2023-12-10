import React from "react";

const Home = () => {

    localStorage.setItem('userRole', 'admin');
    return (
        <div className="home">
            <h2>Home</h2>
        </div>
    )
}

export default Home;