export default function StatusBadge({ status }) {
  const color =
    status === "AUTHORIZED"
      ? "text-green-400"
      : "text-red-400";

  return <span className={`${color} font-bold`}>{status}</span>;
}