"use client";

import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { TextScrub } from "@/components/animations/TextScrub";
import { TextReveal } from "@/components/animations/TextReveal";
import { TextMarquee } from "@/components/animations/TextMarquee";
import { HorizontalScroll } from "@/components/animations/HorizontalScroll";
import styles from "./page.module.css";

export default function Home() {
  return (
    <>
      {/* ═══════════════════════════════════════════
          § HERO SECTION
          ═══════════════════════════════════════════ */}
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroContent}>
            
            <div className={styles.heroTopBar}>
              <span>AdFlux UX © 2026</span>
              <span>Global Digital Agency</span>
              <span>* Scroll Down</span>
            </div>

            <div className={styles.heroTitleWrapper}>
              <TextScrub
                text="DIGITAL"
                as="div"
                className={styles.heroTitleLine}
                start="top 60%"
                end="top 10%"
                baseColor="var(--color-ink-muted)"
                fillColor="var(--color-ink)"
              />
              <TextScrub
                text="EXPERIENCE"
                as="div"
                className={styles.heroTitleLine}
                start="top 70%"
                end="top 20%"
                baseColor="var(--color-ink-muted)"
                fillColor="var(--color-primary)"
              />
              <TextScrub
                text="AGENCY."
                as="div"
                className={styles.heroTitleLine}
                start="top 80%"
                end="top 30%"
                baseColor="var(--color-ink-muted)"
                fillColor="var(--color-ink)"
              />
            </div>

            <ScrollReveal delay={0.8} distance={30}>
              <div className={styles.heroImageBlock}>
                [SHOWREEL]
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.6} distance={20} direction="up">
              <div className={styles.heroFooter}>
                <p>
                  We merge robust engineering with elite Swiss and Brutalism aesthetics to craft digital experiences that dominate performance and conversion.
                </p>
                <div className={styles.exploreLinkWrapper}>
                  <a href="#work" className={styles.exploreLink}>
                    Explore Work ↓
                  </a>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          § MARQUEE BAND
          ═══════════════════════════════════════════ */}
      <div className={styles.marqueeBand}>
        <TextMarquee speed={35} separator="  ✦  ">
          <span className={styles.marqueeText}>
            DEVELOPMENT THAT SCALES — DESIGN THAT CONVERTS — SEO THAT RANKS 
          </span>
        </TextMarquee>
      </div>

      {/* ═══════════════════════════════════════════
          § SERVICES ACCORDION (Brutalist List)
          ═══════════════════════════════════════════ */}
      <section className={`section ${styles.borderedSection}`} id="services">
        <div className="container">
          <ScrollReveal direction="left" distance={40}>
            <h2 className={styles.hugeHeading}>Capabilities</h2>
          </ScrollReveal>

          <div className={styles.serviceList}>
            {[
              "Digital Strategy",
              "UX/UI Design",
              "Next.js Development",
              "Creative Animation",
              "Technical SEO",
            ].map((service, i) => (
              <ScrollReveal
                key={service}
                delay={i * 0.1}
                direction="up"
                distance={0}
              >
                <a href={`#${service}`} className={styles.serviceItem}>
                  <span className={styles.serviceItemNumber}>0{i + 1}</span>
                  <span className={styles.serviceItemTitle}>{service}</span>
                  <span className={styles.serviceItemAction}>DISCOVER ↗</span>
                </a>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          § HORIZONTAL SCROLL WORK
          ═══════════════════════════════════════════ */}
      <section id="work" className={styles.borderedSection}>
        <HorizontalScroll>
          <div className={styles.workWrapper}>
            {[
              { id: "01", category: "E-Commerce", color: "var(--color-primary)" },
              { id: "02", category: "SaaS Platform", color: "var(--color-accent)" },
              { id: "03", category: "Corporate Site", color: "var(--color-ink)" },
              { id: "04", category: "Web Application", color: "var(--color-secondary-dark)" },
            ].map((work) => (
              <div key={work.id} className={styles.workCard}>
                <div className={styles.workImage} style={{ backgroundColor: work.color }}>
                  <span className={styles.workImageLabel}>PROJECT {work.id}</span>
                </div>
                <div className={styles.workMeta}>
                  <h3 className={styles.workTitle}>Confidential Client</h3>
                  <span className={styles.workTags}>{work.category}</span>
                </div>
              </div>
            ))}
          </div>
        </HorizontalScroll>
      </section>

      {/* ═══════════════════════════════════════════
          § FOOTER CTA
          ═══════════════════════════════════════════ */}
      <section className={styles.footerCta}>
        <div className="container">
          <TextReveal
            text="START A PROJECT"
            as="h2"
            splitBy="words"
            stagger={0.05}
            className={styles.footerCtaText}
          />
          <ScrollReveal delay={0.4} direction="up">
            <button className={styles.footerCtaButton}>
              CONTACT US
            </button>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
