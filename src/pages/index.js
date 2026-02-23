export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
      <div className="text-center max-w-2xl">
        <h1 className="text-5xl font-bold text-indigo-800 mb-6">
          Tailwind is Working! 🎉
        </h1>

        <p className="text-gray-500 text-xl mb-8">
          If you see styled elements, Tailwind CSS is configured correctly.
        </p>

        {/* Standard Tailwind Color Boxes */}
        <div className="flex justify-center gap-4 mb-8">
          <div className="w-20 h-20 bg-indigo-700 rounded-2xl flex items-center justify-center text-white font-bold shadow-lg">
            Indigo
          </div>
          <div className="w-20 h-20 bg-yellow-300 rounded-2xl flex items-center justify-center text-indigo-900 font-bold shadow-lg">
            Yellow
          </div>
          <div className="w-20 h-20 bg-green-500 rounded-2xl flex items-center justify-center text-white font-bold shadow-lg">
            Green
          </div>
          <div className="w-20 h-20 bg-red-500 rounded-2xl flex items-center justify-center text-white font-bold shadow-lg">
            Red
          </div>
        </div>

        {/* Card Test */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            Card Component Test
          </h2>
          <p className="text-gray-500">
            This white card with shadow proves Tailwind utilities are working.
          </p>
        </div>

        {/* Button Test */}
        <div className="flex justify-center gap-4">
          <button className="bg-indigo-700 text-white font-semibold py-3 px-8 rounded-xl hover:bg-indigo-800 transition-colors shadow-lg">
            Indigo Button
          </button>
          <button className="bg-yellow-300 text-indigo-900 font-bold py-3 px-8 rounded-xl hover:bg-yellow-400 transition-colors shadow-lg">
            Yellow Button
          </button>
        </div>

        {/* ZapTop Logo Test */}
        <div className="mt-10 flex items-center justify-center gap-3">
          <div className="flex items-center justify-center bg-indigo-700 w-16 h-16 rounded-2xl">
            <span className="text-yellow-300 text-2xl -mt-2 -mr-1 font-light">
              -
            </span>
            <span className="text-white text-3xl font-bold z-10">Z</span>
            <span className="text-yellow-300 text-2xl -mb-1 -ml-1 font-light">
              -
            </span>
          </div>
          <span className="font-bold text-3xl text-gray-900">ZapTop</span>
        </div>
      </div>
    </div>
  );
}
