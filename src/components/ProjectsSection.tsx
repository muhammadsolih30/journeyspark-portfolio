import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, Github, Layers } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const ProjectsSection = () => {
  const { t } = useLanguage();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [filter, setFilter] = useState('all');

  const projects = [
    {
      id: 1,
      title: t('projects.project1.title'),
      description: t('projects.project1.description'),
      image: 'gradient-1',
      tags: ['React', 'TypeScript', 'Tailwind'],
      category: 'react',
      liveUrl: '#',
      githubUrl: '#',
      comingSoon: true,
    },
    {
      id: 2,
      title: t('projects.project2.title'),
      description: t('projects.project2.description'),
      image: 'gradient-2',
      tags: ['Next.js', 'API', 'CSS'],
      category: 'nextjs',
      liveUrl: '#',
      githubUrl: '#',
      comingSoon: true,
    },
    {
      id: 3,
      title: t('projects.project3.title'),
      description: t('projects.project3.description'),
      image: 'gradient-3',
      tags: ['React', 'Drag & Drop', 'SCSS'],
      category: 'react',
      liveUrl: '#',
      githubUrl: '#',
      comingSoon: true,
    },
    {
      id: 4,
      title: t('projects.project4.title'),
      description: t('projects.project4.description'),
      image: 'gradient-4',
      tags: ['React', 'Framer Motion', 'Tailwind'],
      category: 'react',
      liveUrl: '#',
      githubUrl: '#',
      comingSoon: false,
    },
  ];

  const filters = [
    { key: 'all', label: t('projects.all') },
    { key: 'react', label: 'React' },
    { key: 'nextjs', label: 'Next.js' },
  ];

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(p => p.category === filter);

  const gradientStyles: Record<string, string> = {
    'gradient-1': 'from-primary via-secondary to-accent',
    'gradient-2': 'from-secondary via-accent to-primary',
    'gradient-3': 'from-accent via-primary to-secondary',
    'gradient-4': 'from-primary to-secondary',
  };

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
    <section id="projects" className="py-20 md:py-32 relative">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
              <span className="gradient-text">{t('projects.title')}</span>
            </h2>
            <p className="text-muted-foreground text-lg">{t('projects.subtitle')}</p>
          </motion.div>

          {/* Filter Buttons */}
          <motion.div variants={itemVariants} className="flex justify-center gap-3 mb-12 flex-wrap">
            {filters.map((f) => (
              <motion.button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  filter === f.key
                    ? 'bg-gradient-to-r from-primary to-secondary text-primary-foreground'
                    : 'glass text-muted-foreground hover:text-foreground'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {f.label}
              </motion.button>
            ))}
          </motion.div>

          {/* Projects Grid */}
          <motion.div 
            layout
            className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  variants={itemVariants}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="group glass-card p-0 overflow-hidden hover:scale-[1.02] transition-all duration-300"
                  whileHover={{ boxShadow: '0 0 50px rgba(99, 102, 241, 0.3)' }}
                >
                  {/* Project Image Placeholder */}
                  <div className={`h-48 bg-gradient-to-br ${gradientStyles[project.image]} relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-background/20 backdrop-blur-sm flex items-center justify-center">
                      <Layers className="w-16 h-16 text-foreground/30" />
                    </div>
                    
                    {/* Coming Soon Badge */}
                    {project.comingSoon && (
                      <div className="absolute top-4 right-4 px-3 py-1 bg-background/80 backdrop-blur rounded-full text-xs font-medium text-primary">
                        {t('projects.comingSoon')}
                      </div>
                    )}

                    {/* Hover Overlay */}
                    <motion.div
                      className="absolute inset-0 bg-background/90 backdrop-blur-md flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      <motion.a
                        href={project.liveUrl}
                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary to-secondary rounded-full text-primary-foreground text-sm font-medium"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <ExternalLink size={16} />
                        {t('projects.viewLive')}
                      </motion.a>
                      <motion.a
                        href={project.githubUrl}
                        className="flex items-center gap-2 px-4 py-2 glass rounded-full text-foreground text-sm font-medium"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Github size={16} />
                        {t('projects.viewCode')}
                      </motion.a>
                    </motion.div>
                  </div>

                  {/* Project Info */}
                  <div className="p-6">
                    <h3 className="text-xl font-display font-bold mb-2 text-foreground group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                      {project.description}
                    </p>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 text-xs font-medium bg-muted text-muted-foreground rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
