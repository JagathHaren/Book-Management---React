import { NavLink } from 'react-router-dom';
import { X, BookOpenText, SquarePlus, ShoppingCart } from 'lucide-react';

export default function Sidebar({ isOpen, setIsOpen }) {
  const baseStyle = "block px-4 py-2 rounded hover:bg-blue-700";
  const activeStyle = "bg-blue-700";

  return (
    <>
      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-full w-64 bg-blue-800 text-white p-4 transform transition-transform duration-300 ease-in-out z-50
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0 md:static md:h-auto
      `}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold flex gap-1 items-center"><img src="/logo.svg" alt="logo" />Book Library</h2>
          <button onClick={() => setIsOpen(false)} className="md:hidden">
            <X />
          </button>
        </div>
        <nav className="space-y-2">
          <NavLink to="/" className={({ isActive }) => baseStyle + (isActive ? ` ${activeStyle}` : '')}>
            <span className='flex gap-1.5 items-center'><BookOpenText />Books</span>
          </NavLink>
          <NavLink to="/add" className={({ isActive }) => baseStyle + (isActive ? ` ${activeStyle}` : '')}>
            <span className='flex gap-1.5 items-center'><SquarePlus />Add Books</span>
          </NavLink>
          <NavLink to="/cart" className={({ isActive }) => baseStyle + (isActive ? ` ${activeStyle}` : '')}>
            <span className='flex gap-1.5 items-center'><ShoppingCart />Cart</span>
          </NavLink>
        </nav>
      </div>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-40 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
