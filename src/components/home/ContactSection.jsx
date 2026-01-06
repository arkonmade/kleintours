import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { Button } from "../ui/button";
import { supabase } from "../../lib/supabase";
import toast from "react-hot-toast";

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Invalid email";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    const toastId = toast.loading("Sending message...");

    try {
      const { data, error } = await supabase.from("messages").insert([
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone || null,
          message: formData.message,
        },
      ]);

      if (error) {
        toast.error("Failed to send message: " + error.message, {
          id: toastId,
        });
      } else {
        setIsSubmitted(true);
        setFormData({ name: "", email: "", phone: "", message: "" });
        toast.success("Message sent successfully!", { id: toastId });
        setTimeout(() => setIsSubmitted(false), 4000);
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again.", { id: toastId });
    } finally {
      setIsLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#f7f6f2]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12"
        >
          <motion.div variants={itemVariants} className="space-y-8">
            <p className="text-md font-medium text-[#c9a240] mb-2 uppercase">
              Get in touch
            </p>
            <h2 className="text-4xl font-bold text-[#0f2f24] mb-4">
              We’re here when you’re ready
            </h2>
            <p className="text-[#2b2b2b] text-lg mb-10 leading-relaxed">
              We’re here to answer your questions, help plan your adventures, or
              simply chat about what you’d love to see and do. Let’s make your
              trip unforgettable — stress-free and fun.
            </p>

            <div className="space-y-3">
              {[
                {
                  icon: MapPin,
                  title: "Our Office",
                  text: "KG 123 Street, Kigali, Rwanda",
                },
                {
                  icon: Phone,
                  title: "Phone",
                  text: "+250 788 123 456",
                  link: "tel:+250788123456",
                },
                {
                  icon: Mail,
                  title: "Email",
                  text: "info@kleintours.com",
                  link: "mailto:info@kleintours.com",
                },
                {
                  icon: Clock,
                  title: "Working Hours",
                  text: "Mon - Sun: 8:00 AM - 6:00 PM",
                },
              ].map((item) => (
                <motion.div
                  variants={itemVariants}
                  key={item.title}
                  className="flex items-start gap-4 p-3 rounded-xl bg-[#fff] hover:bg-muted/50 transition-colors"
                >
                  <div className="w-12 h-12 bg-[#c9a240]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-md text-[#0f2f24]/60 ">
                      {item.title}
                    </p>
                    {item.link ? (
                      <a
                        href={item.link}
                        className="text-[#0f2f24] text-sm hover:text-[#c9a240]/80 transition-colors"
                      >
                        {item.text}
                      </a>
                    ) : (
                      <p className="text-[#2b2b2b] text-sm">{item.text}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div variants={itemVariants}>
            {!isSubmitted ? (
              <form
                onSubmit={handleSubmit}
                className="space-y-5 bg-[#fff] p-8 rounded-2xl border border-[#e4e2dc] shadow-sm"
              >
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium mb-2"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full px-4 py-3 rounded-lg border border-[#e4e2dc] focus:ring-2 focus:ring-[#3a5f52] focus:border-transparent"
                  />
                  {errors.name && (
                    <p className="text-[#3a5f52] text-sm mt-1 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.name}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium mb-2"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className="w-full px-4 py-3 rounded-lg border border-[#e4e2dc] focus:ring-2 focus:ring-[#3a5f52] focus:border-transparent"
                    />
                    {errors.email && (
                      <p className="text-[#3a5f52] text-sm mt-1 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.email}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium mb-2"
                    >
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+250 788 000 000"
                      className="w-full px-4 py-3 rounded-lg border border-[#e4e2dc] focus:ring-2 focus:ring-[#3a5f52] focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium mb-2"
                  >
                    Your Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Tell us about your travel plans..."
                    className="w-full px-4 py-3 rounded-lg border border-[#e4e2dc] focus:ring-2 focus:ring-[#3a5f52] focus:border-transparent resize-none"
                  />
                  {errors.message && (
                    <p className="text-[#3a5f52] text-sm mt-1 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.message}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" /> Send Message
                </Button>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-[#fff] p-8 rounded-2xl border border-[#e4e2dc] text-center py-12"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="w-16 h-16 bg-[#3a5f52]/10 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <CheckCircle2 className="w-8 h-8 text-[#3a5f52]" />
                </motion.div>
                <h3 className="text-2xl font-bold text-[#0f2f24] mb-2">
                  Message Sent!
                </h3>
                <p className="text-[#2b2b2b] mb-2">
                  Thank you for contacting us. We'll get back to you as soon as
                  possible.
                </p>
                <p className="text-sm text-[#2b2b2b]/80">
                  We’re here when you’re ready.
                </p>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
