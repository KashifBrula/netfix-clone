import React, { useState, useEffect, useCallback } from "react";

import MobileMenu from "./MobileMenu";
import NavbarItem from "./NavbarItem";

import AccountMenu from "./AccountMenu";
import { BsBell, BsChevronDown, BsSearch } from "react-icons/bs";

const TOP_OFFSET = 66;

const Navbar = () => {
    const [showMenu, setShowMenu] = useState(false);
    const [showAccount, setShowAccount] = useState(false);
    const [showBg, setShowBg] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.screenY >= TOP_OFFSET) {
                setShowBg(true);
            } else {
                setShowBg(false);
            }

            window.addEventListener('scroll', handleScroll);
        }

        return () => {
            window.removeEventListener('scroll', handleScroll);
        }

    }, []);

    const toggleMenu = useCallback(() => {
        setShowMenu((current) => !current)
    }, []);

    const toggleAccount = useCallback(() => {
        setShowAccount((current) => !current)
    }, []);

    return (
        <nav className="w-full fixed z-40">
            <div
                className={`
                px-4
                md:px-16
                py-6
                flex
                flex-row
                items-center
                transition
                duration-500
            ${showBg ? ' bg-zinc-900bg-opacity-90' : ''}`}>
                <img className="h-7 lg:h-10" src="/images/logo.png" alt="logo" />
                <div
                    className="flex ml-8 gap-7 hidden lg:flex">
                    <NavbarItem label="Home" />
                    <NavbarItem label="Series" />
                    <NavbarItem label="Films" />
                    <NavbarItem label="New & Popular" />
                    <NavbarItem label="My List" />
                    <NavbarItem label="Browse by Language" />
                </div>
                <div onClick={toggleMenu} className="lg:hidden flex items-center gap-2 ml-8 cursor-pointer relative">
                    <p className="text-white text-sm">Browse</p>
                    <BsChevronDown className={`text-white transition ${showMenu ? 'rotate-180' : 'rotate-0'}`} />
                    <MobileMenu visible={showMenu} />
                </div>
                <div className="flex ml-auto gap-7 items-center">
                    <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
                        <BsSearch />
                    </div>
                    <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
                        <BsBell />
                    </div>
                    <div onClick={toggleAccount} className="flex cursor-pointer items-center gap-2 relative">
                        <div className="w-10 h-10 rounded-md overflow-hidden">
                            <img className="w-full h-full object-cover" src="/images/blue.jpeg" alt="user" />
                        </div>
                        <BsChevronDown className={`text-white transition ${showAccount ? "rotate-180" : 'rotate-0'}`} />
                        <AccountMenu visible={showAccount} />
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;
