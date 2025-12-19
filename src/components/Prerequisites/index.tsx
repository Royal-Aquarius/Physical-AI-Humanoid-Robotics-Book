import React from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import { motion } from 'framer-motion';
import styles from './styles.module.css';

type CardItem = {
  title: string;
  items: string[];
};

const CardList: CardItem[] = [
  {
    title: 'What You Need',
    items: [
      'Basic Python programming experience',
      'Familiarity with Linux command line',
      'Understanding of basic ML concepts (helpful but not required)',
      'Curiosity and willingness to experiment',
    ],
  },
  {
    title: 'What You\'ll Gain',
    items: [
      'Deep understanding of robotics middleware (ROS 2)',
      'Ability to build and simulate humanoid robots',
      'Skills in AI-powered perception and navigation',
      'Complete voice-to-action system implementation',
    ],
  },
];

function Card({title, items}: CardItem) {
  return (
    <div className={clsx('col col--6 margin-bottom--lg')}>
        <motion.div
            className={clsx('card', styles.card)}
            whileHover={{
                scale: 1.03,
                boxShadow: "0 15px 30px rgba(0, 0, 0, 0.2)",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
            <div className={clsx("card__header", styles.cardHeader)}>
                <Heading as="h3">{title}</Heading>
            </div>
            <div className="card__body">
                <ul className={styles.bulletList}>
                    {items.map((item, idx) => (
                        <li key={idx}>{item}</li>
                    ))}
                </ul>
            </div>
        </motion.div>
    </div>
  );
}

export default function Prerequisites(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {CardList.map((props, idx) => (
            <Card key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
