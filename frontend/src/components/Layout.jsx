import React, {useEffect, useState} from "react";
import Navbar from "./Navbar";
import Searchbar from "./Searchbar";
import SearchResults from "./Searchresults";
import {useNavigate} from "react-router-dom";


function Layout() {
    const [query, setQuery] = useState("");
    const navigate = useNavigate()
    const token = localStorage.getItem("token")
    useEffect(() => {
        if (token === null) {
            navigate("/")
        }
    }, [navigate, token]);

    const handleInputChange = (event) => {
        setQuery(event.target.value);
    };
    return (
        <div>
            <div className="flex flex-col ">
                <Navbar/>
                <Searchbar onInputChange={handleInputChange}/>
            </div>
            <SearchResults query={query}/>
        </div>
    );
}

export default Layout;
