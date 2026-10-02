import React from "react";

export const Navbar = () =>{
    return (
        <>
        <nav className="flex justify-between bg-fuchsia-700">
                <div className="logo">
                    <span className="text-white font-semibold text-xl mx-8">iTask</span>
                </div>
                <ul className="flex gap-4 text-white font-semibold mx-8">
                    <li className="cursor-pointer hover:font-bold transition-all duration-50">Home</li>
                    <li className="cursor-pointer hover:font-bold transition-all duration-50">Your Tasks</li>
                </ul>
        </nav>
        </>
    )
}