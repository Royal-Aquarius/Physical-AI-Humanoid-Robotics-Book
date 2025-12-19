import React from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import { motion } from 'framer-motion';
import styles from './styles.module.css';

type ReasonItem = {
  title: string;
  description: React.ReactNode;
};

const ReasonList: ReasonItem[] = [
  {
    title: 'Project-Based Learning',
    description: (
      <>
        Every chapter builds toward a working capstone project. Learn by doing, not just reading.
      </>
    ),
  },
  {
    title: 'Production-Ready Code',
    description: (
      <>
        All examples use industry-standard tools and practices. Code that actually runs on real robots.
      </>
    ),
  },
  {
    title: 'Progressive Complexity',
    description: (
      <>
        Start simple, build complexity. Each lesson builds on the last with clear prerequisites.
      </>
    ),
  },
  {
    title: 'End-to-End Pipeline',
    description: (
      <>
        From sensor data to motor commands. Understand the complete robotics software stack.
      </>
    ),
  },
  {
    title: 'Human-Robot Interaction',
    description: (
      <>
        Build robots that communicate naturally through voice, gestures, and intuitive interfaces.
      </>
    ),
  },
  {
    title: 'GPU Acceleration',
    description: (
      <>
        Leverage NVIDIA Isaac for real-time perception. Train and deploy AI at robot speed.
      </>
    ),
  },
];

function Reason({title, description}: ReasonItem) {
  return (
    <div className={clsx('col col--4 margin-bottom--lg')}>
        <motion.div
            className={clsx('card', styles.card)}
            whileHover={{
                scale: 1.03,
                boxShadow: "0 15px 30px rgba(0, 0, 0, 0.2)",
                rotate: 1
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
            <div className={clsx("card__header text--center", styles.cardHeader)}>
                <Heading as="h3">{title}</Heading>
            </div>
            <div className="card__body">
                <p>{description}</p>
            </div>
        </motion.div>
    </div>
  );
}

export default function WhyThisBook(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="text--center margin-bottom--lg">
            <Heading as="h2">Why This Book</Heading>
            <p className={styles.subheading}>Built for Real-World Robotics  Not another theory-heavy textbook. This is a hands-on guide to building robots that work.</p>
        </div>
        <div className="row">
          {ReasonList.map((props, idx) => (
            <Reason key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
