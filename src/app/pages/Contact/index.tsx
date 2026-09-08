import { motion } from "framer-motion";
import { Input, TextArea } from "@/components/common/Input";
import { Button } from "@/components/common/Button";
import SEO from "@/components/common/SEO";
import { ArrowUpRight, Send, MessageCircle, Mail } from "lucide-react";
import workWithMeImage from "@/assets/work-with-me.png";

const CHANNELS = [
  {
    name: "whatsapp",
    label: "+234 706 727 6819",
    href: "https://wa.me/2347067276819",
    highlight: true,
  },
  {
    name: "email",
    label: "adedamolajose@gmail.com",
    href: "mailto:adedamolajose@gmail.com",
  },
  {
    name: "linkedin",
    label: "linkedin.com/in/adedamola-alausa",
    href: "https://www.linkedin.com/in/adedamola-alausa/",
  },
  {
    name: "twitter / x",
    label: "@Theadedamola_",
    href: "https://x.com/Theadedamola_",
  },
  {
    name: "github",
    label: "github.com/Theadedamola",
    href: "https://github.com/Theadedamola",
  },
];

export default function Contact() {
  return (
    <div className="min-h-screen bg-[#FAF8F5] text-neutral-900 pt-28 md:pt-36 pb-24 transition-colors duration-500">
      <SEO
        title="Contact | Adedamola"
        description="Get in touch with Adedamola for design engineering, design systems, and frontend architecture inquiries."
      />

      <section className="px-6 md:px-12 max-w-6xl mx-auto">
        {/* Header with Chapter Marker and Capsule Headline */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 max-w-3xl"
        >

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-normal leading-[1.25] text-neutral-900 tracking-tight mb-5">
            <span>got a challenge?</span>
            <span className="inline-flex items-center justify-center mx-2 sm:mx-3.5 align-middle -translate-y-1 sm:-translate-y-2">
              <span className="relative w-14 sm:w-20 md:w-24 h-8 sm:h-11 md:h-12 rounded-full bg-neutral-950 px-2.5 py-1 flex items-center justify-center border border-neutral-800 shadow-xs hover:scale-105 transition-transform duration-300 select-none">
                <img
                  src={workWithMeImage}
                  alt="Work with me"
                  className="h-full w-auto object-contain"
                />
              </span>
            </span>
            <span>let's build something remarkable.</span>
          </h1>

          <p className="text-base sm:text-lg text-neutral-600 font-normal leading-relaxed">
            whether you're looking for a design engineer, need architectural direction on design systems,
            or want to bring a new product from concept to code — my inbox is open.
          </p>
        </motion.div>

        {/* Content Grid: Form (Left) & Direct Channels / Availability (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pt-6 border-t border-neutral-100">
          {/* Left Column: Form */}
          <div className="lg:col-span-7">
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.8 }}
              className="space-y-8"
              action="https://formsubmit.co/adedamolaalausa04@gmail.com"
              method="POST"
            >
              <div>
                <label className="text-xs font-mono text-neutral-400 uppercase tracking-wider block mb-1">
                  your name
                </label>
                <Input
                  placeholder="e.g. Maya Lin"
                  name="name"
                  required
                  className="text-neutral-900 placeholder:text-neutral-400 font-normal"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-neutral-400 uppercase tracking-wider block mb-1">
                  email address
                </label>
                <Input
                  type="email"
                  placeholder="e.g. maya@example.com"
                  name="email"
                  required
                  className="text-neutral-900 placeholder:text-neutral-400 font-normal"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-neutral-400 uppercase tracking-wider block mb-1">
                  project details or message
                </label>
                <TextArea
                  placeholder="tell me about your team, timeline, and what you're looking to build..."
                  name="message"
                  rows={4}
                  required
                  className="text-neutral-900 placeholder:text-neutral-400 font-normal"
                />
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="rounded-full px-8 py-3.5 text-sm sm:text-base flex items-center gap-2 group shadow-sm hover:shadow-md transition-all cursor-pointer"
                >
                  <span>send message</span>
                  <Send className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Button>
              </div>
            </motion.form>
          </div>

          {/* Right Column: Direct Channels & Telemetry */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.8 }}
            className="lg:col-span-5 flex flex-col justify-between space-y-10"
          >
            {/* Status & Availability Card */}
            <div className="p-6 sm:p-7 rounded-2xl border border-neutral-200/80 bg-neutral-50/70">
              <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 uppercase tracking-widest mb-4">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>availability telemetry</span>
              </div>

              <div className="space-y-3.5 text-xs sm:text-sm font-mono text-neutral-600">
                <div className="flex items-baseline justify-between gap-2">
                  <span className="text-neutral-400 uppercase">status:</span>
                  <span className="text-neutral-900 font-medium">available for select roles</span>
                </div>
                <div className="flex items-baseline justify-between gap-2">
                  <span className="text-neutral-400 uppercase">location:</span>
                  <span className="text-neutral-900">lagos, nigeria (gmt+1)</span>
                </div>
                <div className="flex items-baseline justify-between gap-2">
                  <span className="text-neutral-400 uppercase">response:</span>
                  <span className="text-neutral-900">within 24 hours</span>
                </div>
              </div>
            </div>

            {/* Direct Channels List */}
            <div>
              <div className="text-xs font-mono text-neutral-400 uppercase tracking-wider mb-4">
                direct channels & socials
              </div>

              <div className="divide-y divide-neutral-200/70 border-t border-b border-neutral-200/70">
                {CHANNELS.map((ch) => (
                  <a
                    key={ch.name}
                    href={ch.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3.5 flex items-center justify-between group cursor-pointer hover:bg-neutral-50/50 px-1 transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      {ch.name === "whatsapp" ? (
                        <MessageCircle className="w-4 h-4 text-emerald-600" />
                      ) : ch.name === "email" ? (
                        <Mail className="w-4 h-4 text-neutral-600" />
                      ) : (
                        <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 group-hover:bg-black transition-colors" />
                      )}
                      <span className="text-xs sm:text-sm font-mono text-neutral-800 group-hover:text-black transition-colors lowercase">
                        {ch.name}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs font-mono text-neutral-400 group-hover:text-neutral-700 transition-colors">
                      <span className="hidden sm:inline text-[11px] truncate max-w-[170px]">{ch.label}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
