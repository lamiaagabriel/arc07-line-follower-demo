export default function Loading({ error, setError, loading, setLoading }) {
  return (
    <div
      className={`${
        loading ? "block" : "hidden"
      } fixed w-screen h-screen top-0 left-0 right-0 bg-[rgba(0,0,0,0.3)] flex justify-center items-center z-50`}
    >
      {!error.length ? (
        <span className="w-28 h-28 sm:w-40 sm:h-40 md:w-56 md:h-56 border-4 md:border-8 border-l-transparent border-main rounded-full animate-spin"></span>
      ) : (
        ""
      )}

      {error.length ? (
        <div className="bg-main text-lg text-black rounded-md mb-5 border border-gray-200 relative">
          <div className="container py-5">
            <p className="text-center">{error}</p>

            <button
              onClick={() => {
                setLoading(false);
                setError("");
              }}
              className="w-6 h-6 cursor-pointer rounded-full hover:scale-110 absolute -top-2 -left-2 transition-all duration-500 bg-white border border-main text-main"
            >
              x
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
