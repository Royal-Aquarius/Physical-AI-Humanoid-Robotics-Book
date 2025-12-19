import React from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import { motion } from 'framer-motion';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  description: React.ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Input',
    description: (
      <>
        Pick up the red cup and place it on the table
      </>
    ),
  },
  {
    title: 'LLM Planning',
    description: (
      <>
        Task decomposition → Motion planning
      </>
    ),
  },
  {
    title: 'Execution',
    description: (
      <>
        Navigate → Grasp → Transport → Place
      </>
    ),
  },
];

function Feature({title, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4 text--center margin-bottom--lg')}>
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

export default function EndGoal(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="text--center margin-bottom--lg">
            <Heading as="h2">The End Goal</Heading>
            <p className={styles.subheading}>Voice to Action Pipeline  By the end of this book, you'll build a complete system that turns natural language into robot actions.</p>
        </div>
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
