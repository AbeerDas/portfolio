import React from 'react';

import Container from "@/components/Container";
import styles from "@/styles/Home.module.css";

const UwMaps = () => {
  return (
    <section
      id="home"
      data-scroll-section
      className="flex w-full h-screen flex-col items-center justify-center"
    >
      <div className={styles.intro}>
        <Container>
          <div className="flex items-center justify-center mb-64 mt-64">
            <h1 className="text-6xl text-center">I love my gf Safiya ❤️</h1>
          </div>
        </Container>
      </div>
    </section>
  );
};

export default UwMaps;
