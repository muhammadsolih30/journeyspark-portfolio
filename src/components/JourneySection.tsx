import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Trophy, Code, Brain, Target, Dumbbell, Crown } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const JourneySection = () => {
  const { t } = useLanguage();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const journeyItems = [
    {
      year: '2020-2024',
      icon: Dumbbell,
      title: t('journey.athletic.title'),
      items: [
        { icon: Crown, text: t('journey.athletic.wrestling') },
        { icon: Trophy, text: t('journey.athletic.chess') },
      ],
      color: 'from-amber-500 to-orange-500',
    },
    {
      year: '2025',
      icon: Target,
      title: t('journey.transition.title'),
      items: [
        { icon: Code, text: t('journey.transition.description') },
      ],
      color: 'from-primary to-secondary',
    },
    {
      year: '2025',
      icon: Code,
      title: t('journey.frontend.title'),
      items: [
        { icon: Code, text: t('journey.frontend.description') },
      ],
      color: 'from-secondary to-accent',
    },
    {
      year: '2025',
      icon: Brain,
      title: t('journey.ai.title'),
      items: [
        { icon: Brain, text: t('journey.ai.description') },
      ],
      color: 'from-accent to-primary',
    },
    {
      year: '2025+',
      icon: Target,
      title: t('journey.current.title'),
      items: [
        { icon: Target, text: t('journey.current.description') },
      ],
      color: 'from-primary via-secondary to-accent',
      current: true,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
  };

  return (
    <section id="journey" className="py-20 md:py-32 relative">
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
              <span className="gradient-text">{t('journey.title')}</span>
            </h2>
            <p className="text-muted-foreground text-lg">{t('journey.subtitle')}</p>
          </motion.div>

          {/* Timeline */}
          <div className="max-w-3xl mx-auto relative">
            {/* Timeline Line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-accent" />

            {journeyItems.map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`relative flex items-start gap-8 mb-12 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline Node */}
                <motion.div
                  className={`absolute left-8 md:left-1/2 w-4 h-4 rounded-full bg-gradient-to-r ${item.color} -translate-x-1/2 z-10 ${
                    item.current ? 'animate-pulse-glow' : ''
                  }`}
                  whileHover={{ scale: 1.5 }}
                />

                {/* Content Card */}
                <div className={`ml-16 md:ml-0 md:w-[calc(50%-2rem)] ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'}`}>
                  <motion.div
                    className={`glass-card relative overflow-hidden ${item.current ? 'border-primary/50' : ''}`}
                    whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(99, 102, 241, 0.2)' }}
                  >
                    {/* Gradient Top Border */}
                    <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${item.color}`} />

                    {/* Year Badge */}
                    <div className="flex items-center gap-3 mb-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${item.color} text-white`}>
                        {item.year}
                      </span>
                      {item.current && (
                        <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-accent/20 text-accent">
                          Current
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <div className="flex items-center gap-3 mb-4">
                      <item.icon className="w-6 h-6 text-primary" />
                      <h3 className="text-lg font-display font-bold text-foreground">
                        {item.title}
                      </h3>
                    </div>

                    {/* Items */}
                    <ul className="space-y-2">
                      {item.items.map((subItem, subIndex) => (
                        <li key={subIndex} className="flex items-start gap-2 text-muted-foreground text-sm">
                          <subItem.icon className="w-4 h-4 mt-0.5 text-secondary flex-shrink-0" />
                          <span>{subItem.text}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default JourneySection;
