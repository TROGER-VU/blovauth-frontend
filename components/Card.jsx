import { motion } from "framer-motion";

export default function Card({ children }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="glass premium-border rounded-xl p-6 glow-green"
    >
      {children}
    </motion.div>
  );
}