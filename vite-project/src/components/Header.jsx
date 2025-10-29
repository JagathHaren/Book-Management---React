import { ShoppingCart, Menu } from "lucide-react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Header({ setIsSidebarOpen, search, setSearch }) {
  const cart = useSelector((state) => state.cart);
  const totalItems = cart.length;

  return (
    <header className="bg-white shadow-md px-4 py-3 flex items-center justify-between sticky top-0">
      {/* Left: Logo */}
      <div className="flex items-center gap-3">
        <h1 className="text-xl font-bold text-indigo-700 sm:hidden"><img src="/logo.svg" alt="logo" /></h1>
      </div>

      {/* Center: Search bar */}
      <div className="flex-1 mx-4 max-w-md w-full">
        <div className="flex items-center bg-white  px-3 py-2 rounded-lg shadow">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="Search by author or title"
            className="w-full bg-transparent outline-none text-sm text-gray-800 placeholder-gray-500"
          />
        </div>
      </div>

      {/* Right: Cart and Hamburger */}
      <div className="flex items-center gap-4">
        <Link to="/cart" className="relative group">
          <ShoppingCart className="text-gray-700 hover:text-indigo-600 transition" />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 text-xs bg-red-500 text-white w-5 h-5 flex items-center justify-center rounded-full">
              {totalItems}
            </span>
          )}
        </Link>

        {/* Hamburger menu (mobile only) */}
        <button
          onClick={() => setIsSidebarOpen((prev) => !prev)}
          className="md:hidden text-gray-600 hover:text-indigo-700 transition"
        >
          <Menu />
        </button>
      </div>
    </header>
  );
}
