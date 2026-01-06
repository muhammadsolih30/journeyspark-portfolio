import { motion } from 'framer-motion';
import { Heart, ArrowUp, MessageCircle, Linkedin, Radio } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navItems = [
    { href: '#home', label: t('nav.home') },
    { href: '#about', label: t('nav.about') },
    { href: '#skills', label: t('nav.skills') },
    { href: '#projects', label: t('nav.projects') },
    { href: '#journey', label: t('nav.journey') },
    { href: '#contact', label: t('nav.contact') },
  ];

  const socialLinks = [
    { icon: MessageCircle, href: 'https://t.me/MS_rise', label: 'Telegram' },
    { icon: Radio, href: 'https://t.me/MS_rise_official', label: 'Channel' },
    { icon: Linkedin, href: '#', label: 'LinkedIn', disabled: true },
  ];

  return (
    <footer className="relative py-12 border-t border-border/50">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 relative">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <motion.a
              href="#home"
              className="text-3xl font-display font-bold gradient-text inline-block mb-4"
              whileHover={{ scale: 1.05 }}
            >
              MS
            </motion.a>
            <p className="text-muted-foreground text-sm max-w-xs">
              Frontend Developer from Uzbekistan, passionate about creating beautiful web experiences.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-bold text-foreground mb-4">Quick Links</h4>
            <nav className="grid grid-cols-2 gap-2">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="font-display font-bold text-foreground mb-4">Connect</h4>
            <div className="flex gap-3">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-10 h-10 rounded-full glass flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all ${
                    link.disabled ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  whileHover={!link.disabled ? { scale: 1.1, y: -3 } : {}}
                  whileTap={!link.disabled ? { scale: 0.95 } : {}}
                  onClick={(e) => link.disabled && e.preventDefault()}
                  aria-label={link.label}
                >
                  <link.icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mb-8" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground flex items-center gap-1 flex-wrap justify-center">
            {t('footer.madeWith')}
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Heart className="w-4 h-4 text-red-500 fill-red-500" />
            </motion.span>
            {t('footer.inUzbekistan')} • © {new Date().getFullYear()} Mukhammadsolikh. {t('footer.rights')}
          </p>

          {/* Back to Top */}
          <motion.button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-muted-foreground hover:text-foreground transition-colors"
            whileHover={{ y: -3, boxShadow: '0 0 20px rgba(99, 102, 241, 0.2)' }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowUp size={16} />
            Back to Top
          </motion.button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
