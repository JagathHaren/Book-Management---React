import { useSelector, useDispatch } from "react-redux";
import { Trash2, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { removeFromCart, clearCart } from "../slices/cartSlice";

export default function Cart() {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const totalItems = cart.length;

  function handleRemoveCart(id) {
    dispatch(removeFromCart(id));
  }

  return (
    <>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6 flex items-center gap-2 text-indigo-700">
          <ArrowLeft />
          <Link to="/" className="font-medium hover:underline">
            Back to Home
          </Link>
        </div>

        <h2 className="text-3xl font-bold mb-6 text-indigo-700">🛒 Your Cart</h2>

        {cart.length === 0 ? (
          <p className="text-gray-600">Your cart is empty.</p>
        ) : (
          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 items-center bg-white shadow p-4 rounded-lg"
              >
                <img
                  src={item.img || "https://via.placeholder.com/80x100?text=No+Image"}
                  alt={item.title}
                  className="w-20 h-28 object-cover rounded border border-gray-200"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-indigo-800">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600">{item.author}</p>
                </div>
                <button
                  onClick={() => handleRemoveCart(item.id)}
                  className="p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}

            <div className="flex justify-between items-center mt-6">
              <p className="text-lg font-bold">Total Items: {totalItems}</p>
              <button
                onClick={() => dispatch(clearCart())}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Clear Cart
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
