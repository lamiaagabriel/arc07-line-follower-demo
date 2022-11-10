export default function Card({ children }) {
  return (
    <div className="w-full px-5 py-4 md:pt-8 flex flex-col bg-white shadow rounded-md">
      {children}
    </div>
  );
}
