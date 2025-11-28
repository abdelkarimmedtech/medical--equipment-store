<div className="bg-white shadow-md rounded-lg p-4 text-center hover:scale-105 transition">
  <h2 className="text-xl font-semibold">{product.name}</h2>
  <p className="text-gray-600">{product.description}</p>
  <p className="text-secondary font-bold mt-2">${product.price}</p>
  <p className="text-sm text-gray-500">Stock: {product.stock}</p>
  <button
    className="bg-primary text-white w-full py-2 mt-3 rounded-md hover:bg-green-700"
    onClick={() => addToCart(product)}
  >
    Add to Cart
  </button>
</div>
