import { motion } from "framer-motion";
import { Button } from "@/components/common/Button";
import { Download } from "lucide-react";
import docImg from "@/assets/docImg.png";

const RESUME_URL =
  "https://drive.google.com/file/d/1LM2XE0GTNVoaqvj8eFllRwUWOfUj9Yk4/view?usp=sharing";

export default function ResumeSection() {
  return (
    <section className="py-24 px-6 md:px-12 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row items-center justify-between gap-12"
        >
          {/* Text Content */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-thaloria text-gray-900 mb-4">
              Get My Résumé
            </h2>
            <p className="text-gray-600 text-lg mb-8 max-w-md">
              Interested in my full experience and qualifications? Download my
              résumé to learn more about my skills, projects, and professional
              background.
            </p>
            <a href={RESUME_URL} target="_blank" rel="noopener noreferrer">
              <Button
                variant="primary"
                size="lg"
                className="rounded-full px-8"
                rightIcon={<Download className="w-5 h-5" />}
              >
                Download Résumé
              </Button>
            </a>
          </div>

          {/* Document Icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="relative group"
          >
            <div className="w-48 h-48 md:w-64 md:h-64 flex items-center justify-center bg-white rounded-3xl shadow-xl group-hover:shadow-2xl transition-shadow duration-500">
              <motion.img
                src={docImg}
                alt="Resume Document"
                className="w-32 h-32 md:w-44 md:h-44 object-contain"
                whileHover={{ scale: 1.05, rotate: 2 }}
                transition={{ type: "spring", stiffness: 300 }}
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-blue-100 rounded-full opacity-60" />
            <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-blue-50 rounded-full opacity-80" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
