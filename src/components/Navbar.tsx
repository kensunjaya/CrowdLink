import React, { useContext } from "react";
import Search from "./Search";
import { ClientContext } from "../context/Context";
import { Link } from "react-scroll";

const Navbar: React.FC = () => {
    const client = useContext(ClientContext);

    const handleLogOut = () => {
        localStorage.removeItem('auth');
        client?.setIsLoggedIn(false);
    };

    return (
        <nav className="bg-white shadow-md fixed top-5 left-20 right-20 z-50 rounded-lg">
            <div className="container mx-auto px-3 py-2 flex justify-between items-center">
                <Link to="Home" smooth={true} duration={1000}>
                    <button className="flex items-center space-x-2">
                        <img
                            src="../assets/crowdlink_logo.png"
                            alt="Logo"
                            className="h-6 w-6"
                        />
                        <span className="text-lg dm-serif-display-regular">CrowdLink</span>
                    </button>
                </Link>
                <div className="flex-grow flex max-w-md justify-center items-center">
                    <Search />
                </div>

                {/*{client?.isLoggedIn && (
                    <div className="flex-grow flex max-w-md justify-center items-center text-black">
                        {`Hello ${client?.user?.username}`}
                    </div>
                )}
              */}

                <div className="flex items-center space-x-4">
                    <div className="cursor-pointer px-3 py-1 border rounded-lg border-none text-black hover:text-gray-600 transition"
                        onClick={() => {
                            if (!client?.isLoggedIn) {
                                client?.setActivePage('login')
                            }
                            client?.setActivePage("wallet")
                        }
                        }>
                        Wallet
                    </div>
                    <button className="px-3 py-1 border rounded-lg transition border-black text-black hover:text-white hover:bg-black" onClick={() => {
                        if (!client?.isLoggedIn) {
                            client?.setActivePage('login')
                        }
                        client?.setActivePage("create-campaign")
                    }}>
                        Start a Campaign
                    </button>
                    {client?.isLoggedIn ? (
                        <button
                            className="px-3 py-1 bg-black text-white transition rounded-lg hover:bg-black hover:shadow-lg"
                            onClick={() => handleLogOut()}
                        >
                            Sign Out
                        </button>
                    ) : (
                        <button className="px-3 py-1 bg-black text-white transition rounded-lg hover:bg-black" onClick={() => client?.setActivePage("login")}>
                            Log In
                        </button>
                    )}

                </div>
            </div>
        </nav>
    );
};

export default Navbar;
