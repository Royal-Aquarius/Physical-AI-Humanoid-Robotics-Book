import {useState, useEffect, type ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import WhyThisBook from '@site/src/components/WhyThisBook';
import EndGoal from '@site/src/components/EndGoal';
import Prerequisites from '@site/src/components/Prerequisites';
import { motion, useScroll, useTransform } from 'framer-motion'; // Import Framer Motion hooks
import styles from './index.module.css';

const HERO_IMAGE = 'https://humanoidroboticstechnology.com/wp-content/uploads/2025/09/apptronik-wins-awards-2025.png'; // Placeholder for high-quality AI/robotics image for the hero section
type FeatureItem = {
  title: string;
  image: string;
  description: ReactNode;
  link: string;
};

// Framer Motion Variants for entrance animation
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0 },
};

const FeatureList: FeatureItem[] = [
  {
    title: 'ROS2 Basics: Foundation for Robotics',
    image: 'https://cdn.shopify.com/s/files/1/0695/5096/4982/files/ROSOrin_3cf37bba-b006-49a7-b366-022ab5ae7471.jpg?v=1712112368', // Module-specific AI/robotics image
    description: (
      <>
        Grasp the core concepts of ROS2, set up your development environment, and master inter-node communication.
      </>
    ),
    link: '/docs/module-1-ros2-basics/introduction-to-ros2',
  },
  {
    title: 'Digital Twin: Bridging Virtual & Real Robotics',
    image: 'https://www.theengineer.co.uk/media/whie02ol/working-robot.png?width=1002&height=564&v=1dab59ea032e080', // Module-specific AI/robotics image
    description: (
      <>
        Learn to build and simulate digital twins of robots, enabling realistic testing and advanced control strategies.
      </>
    ),
    link: '/docs/module-1-ros2-basics/building-a-robot-model-in-urdf',
  },
  {
    title: 'NVIDIA Isaac Sim: Advanced Robotics Simulation',
    image: 'https://docs.isaacsim.omniverse.nvidia.com/5.0.0/_images/isim_4.5_full_ref_viewport_Isaac_Robots_AgilexRobotics_limo_limo.usd.png', // Module-specific AI/robotics image
    description: (
      <>
        Dive into high-fidelity robotics simulation with NVIDIA Isaac Sim, exploring reinforcement learning and advanced scenarios.
      </>
    ),
    link: '/docs/module-3-nvidia-isaac/setting-up-nvidia-isaac-sim',
  },
  {
    title: 'Vision-Language Models: Robotic Perception & Interaction',
    image: 'https://miro.medium.com/1*wbAWOTe1sfWSahQb5XyTow.png', // Module-specific AI/robotics image
    description: (
      <>
        Explore the integration of vision and language for intelligent robotic perception, reasoning, and interaction.
      </>
    ),
    link: '/docs/module-4-vla/introduction-to-vlas',
  },
  {
    title: 'Capstone Project: Autonomous Humanoid Behavior',
    image: 'https://www.mckinsey.com/~/media/mckinsey/industries/advanced%20electronics/our%20insights/humanoid%20robots%20crossing%20the%20chasm%20from%20concept%20to%20commercial%20reality/thumb-gettyimages-2233368723.jpg?mw=677&car=42:25', // Module-specific AI/robotics image
    description: (
      <>
        Apply your knowledge to a comprehensive capstone project, developing autonomous behaviors for humanoid robots.
      </>
    ),
    link: '/docs/capstone-project/project-scoping-and-design',
  },
  {
    title: 'Ethical AI & Robotics: Governance, Safety & Responsibility',
    image: 'https://i0.wp.com/andrewggibson.com/wp-content/uploads/2023/09/stable-diffusion-xl_clipdrop-cleanup-84-jpg.webp?resize=720%2C405&ssl=1',
    description: (
      <>
        Examine the ethical considerations and societal impact of advanced AI and humanoid robotics.
      </>
    ),
    link: '/docs/intro',
  },
];

function Feature({title, image, description, link}: FeatureItem) {
  return (
    <div className={clsx('col col--4 margin-bottom--lg')}>
      <motion.div 
        className="card"
        whileHover={{ 
          scale: 1.03, 
          boxShadow: "0 15px 30px rgba(0, 0, 0, 0.2)",
          rotate: 1 // Subtle rotation
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {image && (
          <div className="card__image">
            <img src={image} alt={title} className="card-img-top" style={{width: '100%', height: '200px', objectFit: 'cover', borderRadius: '12px 12px 0 0'}} />
          </div>
        )}
        <div className="card__header">
          <Heading as="h3">{title}</Heading>
        </div>
        <div className="card__body">
          <p>{description}</p>
        </div>
        <div className="card__footer">
          <Link
            className="button button--outline button--primary button--block"
            to={link}>
            Explore
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

function HomepageHero() {
  const {siteConfig} = useDocusaurusContext();
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  return (
    <motion.header
      className={clsx('hero hero--primary', styles.heroBanner, 'animated-background-overlay')}
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.2 } } }} // Stagger children animations
    >
      <div className="container">
        <div className="row row--align-center"> {/* Align items in the center vertically */}
          <div className={clsx('col col--6', styles.heroContent)}>
            <motion.div variants={fadeInUp} transition={{ duration: 0.8 }}>
              <Heading as="h1" className="hero__title">
                {siteConfig.title}
              </Heading>
            </motion.div>
            <motion.div variants={fadeInUp} transition={{ duration: 0.8, delay: 0.2 }}>
              <p className="hero__subtitle">
                Master the convergence of AI and robotics, empowering engineers to design, and deploy intelligent humanoid systems that drive innovation, and redefine the future of intelligent machines in a smarter, future-ready world.
              </p>
            </motion.div>
            <motion.div variants={fadeInUp} transition={{ duration: 0.8, delay: 0.4 }} className={styles.buttons}>
              <Link
                className="button button--secondary button--lg"
                to="/docs/intro">
                Start Your Journey
              </Link>
            </motion.div>
          </div>
          <motion.div style={{ y }} variants={fadeInUp} transition={{ duration: 0.8, delay: 0.6 }} className={clsx('col col--6', styles.heroImageContainer)}>
            <img src={HERO_IMAGE} alt="Physical AI & Humanoid Robotics" className="hero__image" />
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
}

function HomepageContent() {
  return (
    <section className={clsx(styles.features)}>
      <div className="container">
        <Heading as="h2" className="text--center margin-bottom--lg">Explore Our Learning Modules</Heading>
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title="Physical AI & Humanoid Robotics"
      description={siteConfig.tagline}>
      <HomepageHero />
      <main>
        <HomepageContent />
        <WhyThisBook />
        <EndGoal />
        <Prerequisites />
      </main>
    </Layout>
  );
}