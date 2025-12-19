import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import Link from '@docusaurus/Link';
import { type ReactNode } from 'react';
import { motion } from 'framer-motion';

// Reuse Feature component from homepage for consistency
type FeatureItem = {
  title: string;
  image: string;
  description: ReactNode;
  link: string;
};

// Simplified Feature component for direct use in this file
function Feature({title, image, description, link}: FeatureItem) {
  return (
    <div className={clsx('col col--4 margin-bottom--lg animate-on-scroll')}>
      <div className="card">
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
            Learn More
          </Link>
        </div>
      </div>
    </div>
  );
}

const ConceptList: FeatureItem[] = [
  {
    title: 'The AI-Robot Convergence',
    image: 'https://img.freepik.com/premium-photo/robot-hand-human-hand-connection-future-ai-technology_53876-139780.jpg',
    description: (
      <>
        Explore how artificial intelligence and robotics are merging to create a new generation of intelligent, autonomous systems.
      </>
    ),
    link: '/docs/module-4-vla/introduction-to-vlas',
  },
  {
    title: 'Digital Twins: Virtual Worlds, Real Robots',
    image: 'https://img.freepik.com/premium-photo/futuristic-robot-s-digital-twin-holographic-projection-virtual-reality-model_31965-67123.jpg',
    description: (
      <>
        Understand the power of digital twins in simulating, testing, and optimizing robot performance before physical deployment.
      </>
    ),
    link: '/docs/module-2-digital-twin/integrating-gazebo-with-ros2',
  },
  {
    title: 'From Code to Kinematics',
    image: 'https://img.freepik.com/premium-photo/abstract-binary-code-robot-hand-representing-ai-development_53876-139779.jpg',
    description: (
      <>
        Delve into the process of translating high-level AI algorithms into precise robotic movements and behaviors.
      </>
    ),
    link: '/docs/module-1-ros2-basics/building-a-robot-model-in-urdf',
  },
  {
    title: 'Cognitive Planning with LLMs',
    image: 'https://img.freepik.com/premium-photo/ai-brain-thinking-concept_53876-139781.jpg',
    description: (
      <>
        Discover how Large Language Models (LLMs) enable robots to perform complex cognitive planning and decision-making.
      </>
    ),
    link: '/docs/module-4-vla/cognitive-planning-with-llms',
  },
  {
    title: 'Human-Robot Interaction (HRI)',
    image: 'https://img.freepik.com/premium-photo/human-robot-interaction-ai-handshake_53876-139782.jpg',
    description: (
      <>
        Learn the principles and challenges of designing intuitive and effective interactions between humans and robots.
      </>
    ),
    link: '/docs/module-2-digital-twin/hri-in-unity',
  },
  {
    title: 'Reinforcement Learning for Robotics',
    image: 'https://img.freepik.com/premium-photo/robot-learning-from-experience-reinforcement-learning_53876-139783.jpg',
    description: (
      <>
        Explore how robots can learn optimal behaviors through trial and error using advanced reinforcement learning techniques.
      </>
    ),
    link: '/docs/module-3-nvidia-isaac/developing-with-isaac-gym-reinforcement-learning',
  },
];

export default function Concepts(): JSX.Element {
  return (
    <Layout
      title="Key Concepts"
      description="Explore fundamental concepts in Physical AI and Humanoid Robotics.">
      <header className="hero hero--primary animated-background-overlay" style={{paddingTop: '4rem', paddingBottom: '4rem'}}>
        <div className="container">
          <Heading as="h1" className="hero__title">
            Key Concepts in Physical AI & Robotics
          </Heading>
          <p className="hero__subtitle">
            Dive into the foundational ideas that drive the next generation of intelligent machines.
          </p>
        </div>
      </header>
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <section className="container padding-top--lg padding-bottom--lg">
          <div className="row">
            {ConceptList.map((props, idx) => (
              <Feature key={idx} {...props} />
            ))}
          </div>
        </section>
      </motion.main>
    </Layout>
  );
}