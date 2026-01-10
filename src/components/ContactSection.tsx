import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Send,
  MapPin,
  MessageCircle,
  Linkedin,
  Radio,
  Mail,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";

const ContactSection = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { name, email, message } = formData;

      // Validatsiya
      if (!name.trim() || !email.trim() || !message.trim()) {
        toast({
          title: "Xatolik",
          description: "Iltimos, barcha maydonlarni to'ldiring",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }

      // API ga ma'lumot yuborish
      const response = await fetch("http://localhost:4000/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message");
      }

      // Muvaffaqiyatli yuborildi
      toast({
        title: "Xabar yuborildi! ✨",
        description:
          "Aloqaga chiqqaningiz uchun rahmat. Tez orada javob beraman!",
      });

      // Formani tozalash
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      // Xatolik yuz bersa
      console.error("Error sending message:", error);

      let errorMessage =
        "Xabar yuborishda muammo bo'ldi. Iltimos, qaytadan urinib ko'ring.";

      if (error instanceof Error) {
        if (error.message.includes("fetch")) {
          errorMessage =
            "Server bilan bog'lanishda xatolik. Serveringiz ishga tushganini tekshiring.";
        } else if (error.message.includes("Network")) {
          errorMessage = "Internet aloqangizni tekshiring.";
        }
      }

      toast({
        title: "Xatolik yuz berdi",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialLinks = [
    {
      icon: MessageCircle,
      label: t("contact.telegram"),
      value: "@MS_rise",
      href: "https://t.me/MS_rise",
      color: "hover:text-[#0088cc]",
      disabled: false,
    },
    {
      icon: Linkedin,
      label: t("contact.linkedin"),
      value: t("contact.comingSoon"),
      href: "#",
      color: "hover:text-[#0077b5]",
      disabled: true,
    },
    {
      icon: Radio,
      label: t("contact.channel"),
      value: "t.me/MS_rise_official",
      href: "https://t.me/MS_rise_official",
      color: "hover:text-[#0088cc]",
      disabled: false,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section id="contact" className="py-20 md:py-32 relative">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
              <span className="gradient-text">{t("contact.title")}</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              {t("contact.subtitle")}
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <motion.div variants={itemVariants}>
              <form onSubmit={handleSubmit} className="glass-card space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    {t("contact.name")}
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-muted border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-foreground placeholder:text-muted-foreground"
                    placeholder="John Doe"
                    disabled={isSubmitting}
                    autoComplete="name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    {t("contact.email")}
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-muted border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-foreground placeholder:text-muted-foreground"
                    placeholder="john@example.com"
                    disabled={isSubmitting}
                    autoComplete="email"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    {t("contact.message")}
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-muted border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none text-foreground placeholder:text-muted-foreground"
                    placeholder="Your message..."
                    disabled={isSubmitting}
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-primary to-secondary text-primary-foreground font-medium flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed transition-all"
                  whileHover={
                    !isSubmitting
                      ? {
                          scale: 1.02,
                          boxShadow: "0 0 30px rgba(99, 102, 241, 0.4)",
                        }
                      : {}
                  }
                  whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                >
                  {isSubmitting ? (
                    <>
                      <motion.div
                        className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      />
                      {t("contact.sending")}
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      {t("contact.send")}
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>

            {/* Contact Info */}
            <motion.div variants={itemVariants} className="space-y-6">
              {/* Location Card */}
              <motion.div
                className="glass-card flex items-center gap-4"
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 0 30px rgba(99, 102, 241, 0.2)",
                }}
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="font-medium text-foreground">
                    {t("contact.location")}
                  </p>
                </div>
              </motion.div>

              {/* Social Links */}
              {socialLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.disabled ? undefined : link.href}
                  target={link.disabled ? undefined : "_blank"}
                  rel={link.disabled ? undefined : "noopener noreferrer"}
                  className={`glass-card flex items-center gap-4 ${
                    link.disabled ? "opacity-60 cursor-not-allowed" : link.color
                  } transition-colors`}
                  whileHover={
                    !link.disabled
                      ? {
                          scale: 1.02,
                          boxShadow: "0 0 30px rgba(99, 102, 241, 0.2)",
                        }
                      : {}
                  }
                  onClick={(e) => link.disabled && e.preventDefault()}
                  aria-disabled={link.disabled}
                >
                  <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center flex-shrink-0">
                    <link.icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground">
                      {link.label}
                    </p>
                    <p className="font-medium text-foreground break-all">
                      {link.value}
                    </p>
                  </div>
                  {link.disabled && (
                    <span className="px-2 py-1 text-xs rounded-full bg-muted text-muted-foreground whitespace-nowrap">
                      {t("contact.comingSoon")}
                    </span>
                  )}
                </motion.a>
              ))}

              {/* Email Card */}
              <motion.div
                className="glass-card flex items-center gap-4"
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 0 30px rgba(99, 102, 241, 0.2)",
                }}
              >
                <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium text-foreground break-all">
                    muhammadsolih08091011@gmail.com
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
