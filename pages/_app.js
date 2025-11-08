import "@/styles/globals.css";
import { AnimatePresence, motion } from "framer-motion";
import WhatsAppButton from "../components/WhatsAppButton";

export default function App({ Component, pageProps, router }) {
  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          key={router.route}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Component {...pageProps} />
        </motion.div>
      </AnimatePresence>

      {/* Burbuja flotante de WhatsApp */}
      <WhatsAppButton />
    </>
  );
}
