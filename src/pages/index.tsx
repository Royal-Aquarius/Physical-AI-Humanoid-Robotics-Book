import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from './index.module.css';

const HERO_IMAGE = 'https://img.freepik.com/premium-photo/futuristic-robot-with-blue-glowing-network-it_14117-876267.jpg'; // Placeholder for high-quality AI/robotics image for the hero section
type FeatureItem = {
  title: string;
  image: string;
  description: ReactNode;
  link: string;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'ROS2 Basics: Foundation for Robotics',
    image: 'https://img.freepik.com/premium-photo/futuristic-robot-artificial-intelligence-huminoid-ai-programming-coding_31965-66352.jpg', // Module-specific AI/robotics image
    description: (
      <>
        Grasp the core concepts of ROS2, set up your development environment, and master inter-node communication.
      </>
    ),
    link: '/docs/module-1-ros2-basics/introduction-to-ros2',
  },
  {
    title: 'Digital Twin: Bridging Virtual & Real Robotics',
    image: 'https://img.freepik.com/premium-photo/blue-robotic-assistant-artificial-intelligence-robot-witth-graphic-display_493806-15783.jpg', // Module-specific AI/robotics image
    description: (
      <>
        Learn to build and simulate digital twins of robots, enabling realistic testing and advanced control strategies.
      </>
    ),
    link: '/docs/module-1-ros2-basics/building-a-robot-model-in-urdf',
  },
  {
    title: 'NVIDIA Isaac Sim: Advanced Robotics Simulation',
    image: 'https://developer-blogs.nvidia.com/wp-content/uploads/2025/06/vention-featured-660x370-jpg.webp', // Module-specific AI/robotics image
    description: (
      <>
        Dive into high-fidelity robotics simulation with NVIDIA Isaac Sim, exploring reinforcement learning and advanced scenarios.
      </>
    ),
    link: '/docs/module-3-nvidia-isaac/setting-up-nvidia-isaac-sim',
  },
  {
    title: 'Vision-Language Models: Robotic Perception & Interaction',
    image: 'https://news.mit.edu/sites/default/files/images/202511/MIT-SelfAdapt-LLM-01-press.jpg', // Module-specific AI/robotics image
    description: (
      <>
        Explore the integration of vision and language for intelligent robotic perception, reasoning, and interaction.
      </>
    ),
    link: '/docs/module-4-vla/introduction-to-vlas',
  },
  {
    title: 'Capstone Project: Autonomous Humanoid Behavior',
    image: 'https://www.rudebaguette.com/wp-content/uploads/2025/07/its-alive-and-running-at-9-mph-this-blazing-fast-chinese-l7-humanoid-shatters-records-as-the-worlds-quickest-bipedal-robot.jpg.webp', // Module-specific AI/robotics image
    description: (
      <>
        Apply your knowledge to a comprehensive capstone project, developing autonomous behaviors for humanoid robots.
      </>
    ),
    link: '/docs/capstone-project/project-scoping-and-design',
  },
];

function Feature({title, image, description, link}: FeatureItem) {
  return (
    <div className={clsx('col col--4 margin-bottom--lg')}>
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
            Explore
          </Link>
        </div>
      </div>
    </div>
  );
}

function HomepageHero() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <div className="row row--align-center"> {/* Align items in the center vertically */}
          <div className={clsx('col col--6', styles.heroContent)}>
            <Heading as="h1" className="hero__title">
              {siteConfig.title}
            </Heading>
            <p className="hero__subtitle">
              Master the convergence of AI and robotics: empowering engineers to design, simulate, and deploy intelligent humanoid systems for a futuristic world.
            </p>
            <div className={styles.buttons}>
              <Link
                className="button button--secondary button--lg"
                to="/docs/intro">
                Start Your Journey
              </Link>
            </div>
          </div>
          <div className={clsx('col col--6', styles.heroImageContainer)}>
            <img src={HERO_IMAGE} alt="Physical AI & Humanoid Robotics" className="hero__image" />
          </div>
        </div>
      </div>
    </header>
  );
}

function HomepageContent() {
  return (
    <section className={clsx(styles.features)}>
      <div className="container">
        <Heading as="h2" className="text--center margin-bottom--xl">Explore Our Learning Modules</Heading>
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
        {/* Placeholder for an additional section for "Insights" or "Related Content" */}
        <div className="margin-top--xl">
          <Heading as="h2" className="text--center margin-bottom--xl">Latest Insights</Heading>
          <div className="row">
            {/* These would typically come from blog posts or specific content */}
            <div className={clsx('col col--4 margin-bottom--lg')}>
              <div className="card">
                <div className="card__image">
                  <img src="https://a57.foxnews.com/static.foxnews.com/foxnews.com/content/uploads/2024/05/1200/675/1-China-unveils-their-first-full-size-electric-running-humanoid-robot.jpg?ve=1&tl=1" alt="Insight 1" style={{width: '100%', height: '200px', objectFit: 'cover', borderRadius: '12px 12px 0 0'}} />
                </div>
                <div className="card__header">
                  <Heading as="h3">The Future of Humanoid Robotics In World</Heading>
                </div>
                <div className="card__body">
                  <p>Exploring the advancements and challenges in creating intelligent humanoid robots.</p>
                </div>
                <div className="card__footer">
                  <Link
                    className="button button--outline button--primary button--block"
                    to="/blog/first-blog-post">
                    Read More
                  </Link>
                </div>
              </div>
            </div>
            <div className={clsx('col col--4 margin-bottom--lg')}>
              <div className="card">
                <div className="card__image">
                  <img src="https://d12aarmt01l54a.cloudfront.net/cms/images/UserMedia-20210322084240/808-440.png" alt="Insight 2" style={{width: '100%', height: '200px', objectFit: 'cover', borderRadius: '12px 12px 0 0'}} />
                </div>
                <div className="card__header">
                  <Heading as="h3">AI in Physical Systems: A New Paradigm</Heading>
                </div>
                <div className="card__body">
                  <p>How artificial intelligence is transforming the design and operation of physical systems.</p>
                </div>
                <div className="card__footer">
                  <Link
                    className="button button--outline button--primary button--block"
                    to="/blog/long-blog-post">
                    Read More
                  </Link>
                </div>
              </div>
            </div>
            <div className={clsx('col col--4 margin-bottom--lg')}>
              <div className="card">
                <div className="card__image">
                  <img src="https://hitechnectar.com/wp-content/uploads/2024/11/Ethical-AI-1-990x600.jpg" alt="Insight 3" style={{width: '100%', height: '200px', objectFit: 'cover', borderRadius: '12px 12px 0 0'}} />
                </div>
                <div className="card__header">
                  <Heading as="h3">Ethical Considerations in Advanced AI</Heading>
                </div>
                <div className="card__body">
                  <p>Discussing the moral and societal implications of rapidly evolving AI technologies.</p>
                </div>
                <div className="card__footer">
                  <Link
                    className="button button--outline button--primary button--block"
                    to="/blog/mdx-blog-post">
                    Read More
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Physical AI & Humanoid Robotics`}
      description="Learn about Physical AI and Humanoid Robotics with our comprehensive modules and tutorials.">
      <HomepageHero />
      <main>
        <HomepageContent />
      </main>
    </Layout>
  );
}