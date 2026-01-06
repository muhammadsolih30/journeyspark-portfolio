import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Calendar, Code, Layers, Award } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const AboutSection = () => {
  const { t } = useLanguage();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const stats = [
    { icon: Calendar, value: '10+', label: t('about.stat.months') },
    { icon: Code, value: '10+', label: t('about.stat.projects') },
    { icon: Layers, value: '12+', label: t('about.stat.technologies') },
    { icon: Award, value: '2', label: t('about.stat.courses') },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section id="about" className="py-20 md:py-32 relative">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="max-w-6xl mx-auto"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
              <span className="gradient-text">{t('about.title')}</span>
            </h2>
            <p className="text-muted-foreground text-lg">{t('about.subtitle')}</p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image/Avatar Section */}
            <motion.div variants={itemVariants} className="relative">
              <div className="relative w-72 h-72 md:w-80 md:h-80 mx-auto">
                {/* Gradient border */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary via-secondary to-accent p-1 animate-spin-slow">
                  <div className="w-full h-full rounded-3xl bg-background" />
                </div>
                
                {/* Avatar placeholder */}
                <div className="absolute inset-2 rounded-3xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                  <span className="text-8xl font-display font-bold gradient-text">MS</span>
                </div>

                {/* Floating badges */}
                <motion.div
                  className="absolute -top-4 -right-4 glass-card px-4 py-2"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <span className="text-sm font-medium">17 years old</span>
                </motion.div>
                
                <motion.div
                  className="absolute -bottom-4 -left-4 glass-card px-4 py-2"
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
                >
                  <span className="text-sm font-medium">🇺🇿 Uzbekistan</span>
                </motion.div>
              </div>
            </motion.div>

            {/* Bio Section */}
            <motion.div variants={itemVariants} className="space-y-6">
              <p className="text-foreground/90 text-lg leading-relaxed">
                {t('about.bio1')}
              </p>
              <p className="text-muted-foreground leading-relaxed">
                {t('about.bio2')}
              </p>
              <p className="text-muted-foreground leading-relaxed">
                {t('about.bio3')}
              </p>
            </motion.div>
          </div>

          {/* Stats */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="glass-card text-center group hover:scale-105 transition-transform duration-300"
                whileHover={{ boxShadow: '0 0 30px rgba(99, 102, 241, 0.3)' }}
              >
                <stat.icon className="w-8 h-8 mx-auto mb-3 text-primary group-hover:text-secondary transition-colors" />
                <div className="text-3xl md:text-4xl font-display font-bold gradient-text mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
