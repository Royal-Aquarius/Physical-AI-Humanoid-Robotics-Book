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
  link: string;
};

// Data for the Concept Blocks
const ConceptBlocks: ConceptBlockItem[] = [
  {
    title: 'Introduction to Physical AI',
    description: (
      <>
        Explore the foundational principles of Physical AI, understanding how it connects digital intelligence with physical interaction to create intelligent, interactive robotic systems.
      </>
    ),
    link: '/docs/intro',
  },
  {
    title: 'Module 1: The Robotic Nervous System (ROS 2)',
    description: (
      <>
        Dive into ROS 2, the core framework for robotic development, enabling communication and control in complex systems.
      </>
    ),
    link: '/docs/module-1-ros2-basics/introduction-to-ros2',
  },
  {
    title: 'Humanoid-Robot Technology', // Placeholder content, as no explicit content file found
    description: (
      <>
        Understand the unique challenges, breakthroughs, and innovations in designing, controlling, and deploying humanoid robots, at the forefront of Physical AI.
      </>
    ),
    link: '/docs/intro', // Link to intro as a general starting point
  },
  {
    title: 'Module 2: The Digital Twin (Gazebo & Unity)',
    description: (
      <>
        Learn to create and leverage digital twins for advanced simulation and optimization, enabling more efficient development of robotic systems.
      </>
    ),
    link: '/docs/module-2-digital-twin/simulating-the-robot-in-gazebo',
  },
  {
    title: 'NVIDIA Isaac AI Robotics',
    description: (
      <>
        Explore NVIDIA Isaac Sim, a cutting-edge platform for realistic robotics simulation, offering tools to design and deploy AI-driven robots in both real-world environments.
      </>
    ),
    link: '/docs/module-3-nvidia-isaac/setting-up-nvidia-isaac-sim',
  },
  {
    title: 'Module 3: The AI-Robot Brain (NVIDIA Isaac)',
    description: (
      <>
        Discover how NVIDIA Isaac develops intelligent robot brains using advanced AI, realistic simulation, and practical robotics tools.
      </>
    ),
    link: '/docs/module-3-nvidia-isaac/developing-with-isaac-gym-reinforcement-learning',
  },
  {
    title: 'Module 4: Vision-Language-Action (VLA)',
    description: (
      <>
        Unpack VLAs, integrating visual perception, natural language understanding, and physical action for advanced robot capabilities.
      </>
    ),
    link: '/docs/module-4-vla/introduction-to-vlas',
  },
  {
    title: 'Capstone Project Experience',
    description: (
      <>
        Apply everything you've learned in a comprehensive capstone project to create fully functional intelligent humanoid systems that move, interact, and perform real-world tasks.
      </>
    ),
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
