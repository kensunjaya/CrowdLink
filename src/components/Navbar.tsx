import React, { useContext } from "react";
import Search from "./Search";
import { ClientContext } from "../context/Context";

const Navbar: React.FC = () => {
    const client = useContext(ClientContext);
    return (
        <nav className="bg-white shadow-md fixed top-5 left-20 right-20 z-50 rounded-lg">
            <div className="container mx-auto px-3 py-2 flex justify-between items-center">
                <div className="flex items-center space-x-2">
                    <img
                        src="../assets/crowdlink_logo.png"
                        alt="Logo"
                        className="h-6 w-6"
                    />
                    <span className="text-lg font-bold">CrowdLink</span>
                </div>

                <div className="hidden md:flex space-x-2">
                    <a href="#" className="text-gray-700 hover:text-gray-300">
                        Explore
                    </a>
                </div>

                <div className="flex-grow flex max-w-md justify-center">
                    <Search />
                </div>

                <div className="hidden md:flex space-x-8">
                    <button className="text-gray-700 hover:text-gray-300" onClick={() => client?.setActivePage("create-campaign")}>
                        Start a Campaign
                    </button>
                </div>

                <div className="flex items-center space-x-4">
                    <button className="px-3 py-1 bg-gray-600 text-white rounded-lg hover:bg-gray-700">
                        Sign Up
                    </button>
                    <button className="px-3 py-1 border rounded-lg border-gray-600 text-gray-600 hover:bg-gray-100">
                        Log In
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
