import { useDispatch, useSelector } from "react-redux";
import { BookOpenText, ShoppingCart, Trash } from "lucide-react";
import { Link, useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import { deleteBook } from "../slices/bookSlice";
import { addToCart } from "../slices/cartSlice";

export default function Home() {
  const { search } = useOutletContext(); // Correct usage to get parent search state
  const [selectedCategory, setSelectedCategory] = useState("All");
  const dispatch = useDispatch();
  const books = useSelector((state) => state.books);
  const [localBooks, setLocalBooks] = useState([]);

  // Load local books on first render
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("localBooks")) || [];
    setLocalBooks(stored);
  }, []);

  const mergeBooks = [...books, ...localBooks];

  const filteredBooks = mergeBooks.filter((book) => {
    const matchesCategory =
      selectedCategory === "All" ||
      book.category?.toLowerCase().includes(selectedCategory?.toLowerCase());
    const matchesSearch =
      book.title?.toLowerCase().includes(search?.toLowerCase()) ||
      book.author?.toLowerCase().includes(search?.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Book deletion logic
  function handleDelete(id) {
    const isPredefinedBook = books.some((book) => book.id === id);
    if (isPredefinedBook) {
      dispatch(deleteBook(id));
    } else {
      const updated = localBooks.filter((book) => book.id !== id);
      setLocalBooks(updated);
      localStorage.setItem("localBooks", JSON.stringify(updated));
    }
  }

  function handleAddToCart(book) {
    dispatch(addToCart(book));
  }

  return (
    <div className="max-w-7xl mx-auto p-4 bg-gray-100 min-h-screen">
      {/* Category Buttons */}
      <div className="flex justify-center items-center gap-4 mb-4">
        {["All", "Fantasy", "Fiction", "Adventure"].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-lg transition ${
              selectedCategory === cat
                ? "bg-indigo-600 text-white"
                : "bg-gray-200 text-black hover:bg-gray-300"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Book Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((b, id) => (
            <div
              key={b.id || id}
              className="relative bg-white p-5 rounded-xl shadow-md hover:shadow-xl transition duration-300 group"
            >
              {/* Hover Buttons */}
              <div className="absolute top-4 right-4 flex flex-col gap-4 md:hidden group-hover:block">
                <Link to={`/S_details/${b.id}`}>
                  <button
                    className="w-9 mb-2 h-9 rounded-full bg-indigo-100 text-indigo-700 hover:bg-indigo-200 flex items-center justify-center shadow"
                    title="View Details"
                  >
                    <BookOpenText size={18} />
                  </button>
                </Link>
                <button
                  onClick={() => handleAddToCart(b)}
                  className="w-9 mb-2 h-9 rounded-full bg-green-100 text-green-700 hover:bg-green-200 flex items-center justify-center shadow"
                  title="Add to Cart"
                >
                  <ShoppingCart size={18} />
                </button>
                <button
                  onClick={() => handleDelete(b.id)}
                  className="w-9 h-9 rounded-full bg-red-100 text-green-700 hover:bg-red-200 flex items-center justify-center shadow"
                  title="Delete"
                >
                  <Trash size={18} />
                </button>
              </div>

              {/* Book Content */}
              <img
                src={b.img || "https://via.placeholder.com/150x220?text=No+Image"}
                alt={b.title}
                className="w-full h-60 object-cover rounded-lg mb-4 border border-gray-200"
              />
              <h3 className="text-xl font-bold text-indigo-800 mb-2">
                {b.title}
              </h3>
              <p className="text-sm text-gray-600 mb-1">
                <span className="font-semibold text-indigo-600">Author:</span>{" "}
                {b.author}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                <span className="font-semibold text-indigo-600">Category:</span>{" "}
                {b.category}
              </p>
              <p className="text-sm text-gray-700 line-clamp-3">
                <span className="font-semibold text-indigo-600">
                  Description:
                </span>{" "}
                {b.description}
              </p>
            </div>
          ))
        ) : (
          <h2 className="text-center text-gray-500 text-lg font-semibold col-span-full">
            No books found.
          </h2>
        )}
      </div>
    </div>
  );
}