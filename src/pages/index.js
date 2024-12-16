import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';

import EnvironmentConfig from 'brand/EnvironmentConfig';
import Heading from '@theme/Heading';
import styles from './index.module.css';


function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {"Developer Docs"}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/api">
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  return (
    <Layout
      title={"Home"}
      description="Developer Tools Documentation">
      <HomepageHeader />
      <main>
        <div className="homepage-content">
          <div className="homepage-item">
            <h2>API Docs</h2>
            <p>Setup and integrate <EnvironmentConfig type="name"></EnvironmentConfig>'s services in your own backend using our various APIs.</p>
            <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/api">
            View Docs
          </Link>
        </div>
          </div>
          <div className="homepage-item">
            <h2>Workflows Docs</h2>
            <p>Create, customise, and manage automated processes using the tools provided by Workflows.</p>
            <Link
            className="button button--secondary button--lg"
            to="/tools">
            View Docs
          </Link>
          </div>
          
        </div>
      </main>
    </Layout>
  );
}

// API Docs
// Workflows Docs
// Get Started
