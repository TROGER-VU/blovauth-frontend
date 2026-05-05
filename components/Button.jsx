export default function Button({ children, onClick, className }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 hover:opacity-80 transition ${className}`}
    >
      {children}
    </button>
  );
}