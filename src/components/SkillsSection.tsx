import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useLanguage } from '@/contexts/LanguageContext';

const SkillsSection = () => {
  const { t } = useLanguage();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const skillCategories = [
    {
      title: t('skills.frontend'),
      color: 'from-primary to-secondary',
      skills: [
        { name: 'HTML5', level: 90, icon: '🌐' },
        { name: 'CSS3', level: 85, icon: '🎨' },
        { name: 'SCSS/SASS', level: 80, icon: '💅' },
        { name: 'Tailwind CSS', level: 90, icon: '🌊' },
        { name: 'Bootstrap', level: 75, icon: '🅱️' },
      ],
    },
    {
      title: t('skills.javascript'),
      color: 'from-secondary to-accent',
      skills: [
        { name: 'JavaScript ES6+', level: 85, icon: '⚡' },
        { name: 'React.js', level: 80, icon: '⚛️' },
        { name: 'Next.js', level: 70, icon: '▲' },
        { name: 'TypeScript', level: 75, icon: '📘' },
      ],
    },
    {
      title: t('skills.other'),
      color: 'from-accent to-primary',
      skills: [
        { name: 'Git & GitHub', level: 75, icon: '🔀' },
        { name: 'AI/ML Basics', level: 60, icon: '🤖' },
        { name: 'English', level: 50, icon: '🇬🇧' },
        { name: 'Problem Solving', level: 85, icon: '🧩' },
      ],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section id="skills" className="py-20 md:py-32 relative">
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
              <span className="gradient-text">{t('skills.title')}</span>
            </h2>
            <p className="text-muted-foreground text-lg">{t('skills.subtitle')}</p>
          </motion.div>

          {/* Skills Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {skillCategories.map((category, catIndex) => (
              <motion.div
                key={catIndex}
                variants={itemVariants}
                className="glass-card group hover:scale-[1.02] transition-all duration-300"
                whileHover={{ boxShadow: '0 0 40px rgba(99, 102, 241, 0.2)' }}
              >
                {/* Category Header */}
                <div className={`h-1 w-full bg-gradient-to-r ${category.color} rounded-t-2xl -mt-6 -mx-6 mb-6`} style={{ width: 'calc(100% + 3rem)' }} />
                
                <h3 className="text-xl font-display font-bold mb-6 text-foreground">
                  {category.title}
                </h3>

                {/* Skills List */}
                <div className="space-y-5">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skillIndex}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{skill.icon}</span>
                          <span className="text-sm font-medium text-foreground">{skill.name}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">{skill.level}%</span>
                      </div>
                      
                      {/* Progress Bar */}
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          className={`h-full bg-gradient-to-r ${category.color} rounded-full`}
                          initial={{ width: 0 }}
                          animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
                          transition={{ duration: 1, delay: catIndex * 0.2 + skillIndex * 0.1 }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Tech Icons Cloud */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-4 mt-16 max-w-4xl mx-auto"
          >
            {['React', 'TypeScript', 'Next.js', 'Tailwind', 'JavaScript', 'HTML5', 'CSS3', 'Git'].map((tech, index) => (
              <motion.span
                key={index}
                className="px-4 py-2 glass rounded-full text-sm font-medium text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all cursor-default"
                whileHover={{ scale: 1.1, y: -5 }}
                initial={{ opacity: 0, scale: 0 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: index * 0.1 }}
              >
                {tech}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
