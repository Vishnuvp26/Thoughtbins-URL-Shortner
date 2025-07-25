import { useSelector, useDispatch } from "react-redux";
import { useState, useRef, useEffect } from "react";
import { ChevronDown, LogOut } from "lucide-react";
import type { NavbarProps } from "@/types/types";
import type { RootState } from "@/redux/store/store";
import { removeUser } from "@/redux/slice/auth.slice";

const Navbar = ({ title, navItems }: NavbarProps) => {
    const user = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleDropdown = () => {
        setDropdownOpen((prev) => !prev);
    };

    const handleLogout = () => {
        dispatch(removeUser());
        setDropdownOpen(false);
    };

    useEffect(() => {
        const handler = (e: MouseEvent) =>
            dropdownRef.current && !dropdownRef.current.contains(e.target as Node) && setDropdownOpen(false);

        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);


    return (
        <nav className="sticky top-0 z-50 w-full h-16 shadow-sm bg-white">
            <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between h-full">
                <h1 className="text-xl font-semibold text-black">{title}</h1>

                <div className="relative space-x-4 h-full flex items-center">
                    {user?.name ? (
                        <div ref={dropdownRef} className="relative">
                            <button
                                onClick={toggleDropdown}
                                className="flex items-center space-x-1 text-sm font-medium text-gray-700 hover:text-black focus:outline-none"
                            >
                                <span>Welcome, {user.name}</span>
                                <ChevronDown
                                    className={`w-4 h-4 transition-transform duration-200 ${
                                        dropdownOpen ? "rotate-180" : ""
                                    }`}
                                />
                            </button>

                            {dropdownOpen && (
                                <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                                    <button
                                        onClick={handleLogout}
                                        className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        <LogOut className="w-4 h-4" />
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        navItems.map((item, idx) => (
                            <a
                                key={idx}
                                href={item.href}
                                className="text-sm font-medium text-gray-700 hover:text-black"
                            >
                                {item.label}
                            </a>
                        ))
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar; 