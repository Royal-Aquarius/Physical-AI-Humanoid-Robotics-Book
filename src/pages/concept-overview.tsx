import React, { ReactNode, useEffect } from 'react';
import Layout from '@theme/Layout';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import Link from '@docusaurus/Link';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import styles from './concept-overview.module.css'; // Dedicated CSS module

type ConceptBlockItem = {
  title: string;
  description: ReactNode;
  image: string; // Using image for visual engagement
  link: string;
};

// Data for the Concept Blocks
const ConceptBlocks: ConceptBlockItem[] = [
  {
    title: 'Introduction to Physical AI',
    description: (
      <>
        Explore the foundational principles of Physical AI, understanding how it bridges the gap between digital intelligence and physical interaction.
      </>
    ),
    image: '/img/concept-icon-1.svg',
    link: '/docs/intro',
  },
  {
    title: 'Module 1: The Robotic Nervous System (ROS 2)',
    description: (
      <>
        Dive into ROS 2, the core framework for robotic development, enabling communication and control in complex systems.
      </>
    ),
    image: '/img/concept-icon-2.svg',
    link: '/docs/module-1-ros2-basics/introduction-to-ros2',
  },
  {
    title: 'Humanoid-Robot', // Placeholder content, as no explicit content file found
    description: (
      <>
        Understand the unique challenges and advancements in designing and controlling humanoid robots, the frontier of physical AI.
      </>
    ),
    image: '/img/concept-icon-3.svg',
    link: '/docs/intro', // Link to intro as a general starting point
  },
  {
    title: 'Module 2: The Digital Twin (Gazebo & Unity)',
    description: (
      <>
        Learn to create and utilize digital twins for advanced simulation, testing, and optimization of robotic systems.
      </>
    ),
    image: '/img/concept-icon-4.svg',
    link: '/docs/module-2-digital-twin/simulating-the-robot-in-gazebo',
  },
  {
    title: 'NVIDIA Isaac',
    description: (
      <>
        Discover NVIDIA Isaac Sim, a powerful platform for high-fidelity robotics simulation, essential for AI-driven development.
      </>
    ),
    image: '/img/concept-icon-5.svg',
    link: '/docs/module-3-nvidia-isaac/setting-up-nvidia-isaac-sim',
  },
  {
    title: 'Module 3: The AI-Robot Brain (NVIDIA Isaac)',
    description: (
      <>
        Explore how NVIDIA Isaac empowers the development of intelligent robot brains through advanced AI and simulation.
      </>
    ),
    image: '/img/concept-icon-6.svg',
    link: '/docs/module-3-nvidia-isaac/developing-with-isaac-gym-reinforcement-learning',
  },
  {
    title: 'Module 4: Vision-Language-Action (VLA)',
    description: (
      <>
        Unpack VLAs, integrating visual perception, natural language understanding, and physical action for advanced robot capabilities.
      </>
    ),
    image: '/img/concept-icon-7.svg',
    link: '/docs/module-4-vla/introduction-to-vlas',
  },
  {
    title: 'Capstone Project',
    description: (
      <>
        Apply all your knowledge in a comprehensive capstone project, bringing intelligent humanoid systems to life.
      </>
    ),
    image: '/img/concept-icon-8.svg',
    link: '/docs/capstone-project/project-scoping-and-design',
  },
];

const ConceptBlock: React.FC<{ item: ConceptBlockItem; delay: number }> = ({ item, delay }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      className={styles.conceptBlock}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: delay * 0.1 } },
      }}
      whileHover={{ scale: 1.03 }}
      transition={{ type: 'spring', stiffness: 300, damping: 10 }}
    >
      <div className={styles.conceptBlockIcon}>
        <img src={item.image} alt={item.title} className={styles.conceptBlockImage} />
      </div>
      <Heading as="h3" className={styles.conceptBlockTitle}>{item.title}</Heading>
      <p className={styles.conceptBlockDescription}>{item.description}</p>
      <Link className={clsx('button button--outline button--primary', styles.conceptBlockLink)} to={item.link}>
        Learn More
      </Link>
    </motion.div>
  );
};

export default function ConceptOverview(): JSX.Element {
  return (
    <Layout
      title="Concept Overview"
      description="Explore key concepts and modules in Physical AI and Humanoid Robotics."
    >
      <header className={clsx('hero hero--primary', styles.conceptOverviewHero)}>
        <div className="container">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Heading as="h1" className="hero__title">Concept Overview</Heading>
            <p className="hero__subtitle">
              Dive deep into the foundational and advanced concepts shaping the future of Physical AI and Humanoid Robotics.
            </p>
          </motion.div>
        </div>
      </header>
      <main className={styles.conceptOverviewMain}>
        <div className="container">
          <div className={clsx('row', styles.conceptBlocksGrid)}>
            {ConceptBlocks.map((item, idx) => (
              <ConceptBlock key={idx} item={item} delay={idx} />
            ))}
          </div>
        </div>
      </main>
    </Layout>
  );
}
