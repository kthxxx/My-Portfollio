"use client";

import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { heroCollageImages, portfolioImages } from "@/data/portfolio-images";
import { heroScrollDistance } from "@/data/hero-motion";

gsap.registerPlugin(ScrollTrigger);

const featuredImage = portfolioImages.find((image) => image.featured);

function setupFeaturedCard(
  featured: HTMLElement,
  featuredMedia: HTMLElement,
  mobile: boolean,
) {
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  const cardWidth = viewportWidth * (mobile ? 0.56 : 0.3);
  const featuredWidth = featured.offsetWidth;
  const featuredHeight = featured.offsetHeight;
  const scale = cardWidth / featuredWidth;
  const finalImageScale = 0.94;
  const finalScale = Math.max(
    viewportWidth / (featuredWidth * finalImageScale),
    viewportHeight / (featuredHeight * finalImageScale),
  );

  gsap.set(featured, {
    xPercent: -50,
    yPercent: -50,
    x: 0,
    y: 0,
    scale,
    borderRadius: mobile ? 12 : 18,
    transformOrigin: "50% 50%",
  });
  gsap.set(featuredMedia, {
    scale: 1,
    transformOrigin: "50% 50%",
  });

  return { finalScale };
}

export function CinematicHero() {
  const rootRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || !featuredImage) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const featured = root.querySelector<HTMLElement>("[data-featured]");
    const featuredMedia = root.querySelector<HTMLElement>("[data-featured-media]");
    const header = document.querySelector<HTMLElement>(".topbar");
    if (!featured || !featuredMedia) return;

    if (reducedMotion) {
      gsap.set(root.querySelectorAll<HTMLElement>("[data-collage-item]"), { display: "none" });
      gsap.set(featured, { xPercent: -50, yPercent: -50, x: 0, y: 0, scale: 1, opacity: 1, borderRadius: 0 });
      gsap.set(featuredMedia, { scale: 1 });
      gsap.set(root.querySelector(".cinema-crop"), { scale: 1 });
      gsap.set(root.querySelector(".cinema-overlay"), { opacity: 1 });
      gsap.set(root.querySelectorAll<HTMLElement>("[data-reveal]"), { yPercent: 0 });
      gsap.set(root.querySelectorAll<HTMLElement>("[data-hero-fade]"), { opacity: 1, y: 0 });
      if (header) gsap.set(header, { opacity: 1, y: 0 });
      return;
    }

    const lenis = new Lenis({
      duration: 1.05,
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1,
    });
    const updateScroll = () => ScrollTrigger.update();
    const tick = (time: number) => lenis.raf(time * 1000);
    lenis.on("scroll", updateScroll);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    let responsiveMedia: ReturnType<typeof gsap.matchMedia> | undefined;
    const context = gsap.context(() => {
      const buildTimeline = (mobile: boolean) => {
      const cards = gsap.utils.toArray<HTMLElement>("[data-collage-item]");
      const fadeElements = gsap.utils.toArray<HTMLElement>("[data-hero-fade]");
      const motionStart = 0.18;
      const motionDuration = 0.56;
      const motionEase = "power2.inOut";

      const { finalScale } = setupFeaturedCard(featured, featuredMedia, mobile);
      gsap.set(featured, { opacity: 1 });
      gsap.set(".cinema-crop", { scale: 1 });
      gsap.set(".cinema-mask > span", { yPercent: 112 });
      gsap.set(fadeElements, { opacity: 0, y: 18 });
      gsap.set(".cinema-content-bottom", { opacity: 0 });
      if (header) gsap.set(header, { opacity: 0, y: -14 });

      const timeline = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: `+=${mobile ? heroScrollDistance.mobile : heroScrollDistance.desktop}%`,
          scrub: 0.65,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      timeline
        .to(".cinema-scroll-cue", { opacity: 0, y: 14, duration: 0.1 }, 0.06)
        .to(".cinema-stage", {
          scale: mobile ? 1.08 : 1.14,
          duration: motionDuration,
          ease: motionEase,
        }, motionStart);

      cards.forEach((card) => {
        const config = portfolioImages.find((image) => image.id === card.dataset.imageId);
        if (!config) return;
        const hiddenOnMobile = mobile && ["portrait", "film"].includes(config.id);
        if (hiddenOnMobile) {
          gsap.set(card, { display: "none" });
          return;
        }
        timeline.to(card, {
          x: config.exit.x,
          y: config.exit.y,
          scale: config.exit.scale,
          rotation: config.exit.rotation,
          opacity: 0,
          duration: motionDuration,
          ease: motionEase,
        }, motionStart);
      });

      timeline
        .to(featured, {
          x: 0,
          y: 0,
          scale: finalScale,
          borderRadius: 0,
          duration: motionDuration,
          ease: motionEase,
        }, motionStart)
        .to(".cinema-overlay", { opacity: 1, duration: 0.18 }, 0.7)
        .to(".cinema-crop", {
          scale: 0.94,
          duration: motionDuration,
          ease: motionEase,
        }, motionStart)
        .to(".cinema-eyebrow", { opacity: 1, y: 0, duration: 0.1, ease: "power3.out" }, 0.8)
        .to(".cinema-mask > span", {
          yPercent: 0,
          duration: 0.14,
          stagger: 0.035,
          ease: "power4.out",
        }, 0.79)
        .to(".cinema-content-bottom", { opacity: 1, duration: 0.08 }, 0.89)
        .to(fadeElements, {
          opacity: 1,
          y: 0,
          duration: 0.1,
          stagger: 0.025,
          ease: "power3.out",
        }, 0.9);

      if (header) {
        timeline.to(header, { opacity: 1, y: 0, duration: 0.09, ease: "power3.out" }, 0.91);
      }
      };

      responsiveMedia = gsap.matchMedia();
      responsiveMedia.add("(min-width: 801px)", () => buildTimeline(false));
      responsiveMedia.add("(max-width: 800px)", () => buildTimeline(true));
    }, root);

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh, { once: true });
    window.addEventListener("orientationchange", refresh);
    const refreshTimer = window.setTimeout(refresh, 120);

    return () => {
      window.clearTimeout(refreshTimer);
      window.removeEventListener("load", refresh);
      window.removeEventListener("orientationchange", refresh);
      responsiveMedia?.revert();
      context.revert();
      lenis.off("scroll", updateScroll);
      lenis.destroy();
      gsap.ticker.remove(tick);
      gsap.ticker.lagSmoothing(1000, 16);
    };
  }, []);

  if (!featuredImage) return null;

  return (
    <section ref={rootRef} id="index" className="cinema-hero" aria-label="Portfolio introduction">
      <div className="cinema-stage" aria-hidden="true">
        {heroCollageImages.map((image, index) => (
          <figure
            key={image.id}
            data-collage-item
            data-image-id={image.id}
            className={`cinema-card ${image.className}`}
          >
            <div className="cinema-card-drift" style={{ animationDelay: `${index * -0.7}s` }}>
              <Image src={image.src} alt="" fill sizes="(max-width: 800px) 42vw, 22vw" priority={index < 4} />
            </div>
          </figure>
        ))}
      </div>

      <div data-featured className="cinema-featured" aria-hidden="true">
        <div data-featured-media className="cinema-featured-media">
          <div className="cinema-crop">
            <Image
              src={featuredImage.src}
              alt=""
              fill
              sizes="100vw"
              priority
            />
          </div>
        </div>
      </div>

      <div className="cinema-overlay" aria-hidden="true" />

      <div className="cinema-content">
        <p className="cinema-eyebrow">Computer Science · Developer · Creative</p>
        <h1>
          <span className="cinema-mask"><span data-reveal>Keith Justin</span></span>
          <span className="cinema-mask"><span data-reveal>Emeterio</span></span>
        </h1>
        <div className="cinema-content-bottom">
          <p data-hero-fade>I build digital experiences through<br />code, design &amp; storytelling.</p>
          <Link data-hero-fade className="cinema-cta" href="#work">
            <span>View projects</span><span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>

      <div className="cinema-scroll-cue" aria-hidden="true">
        <span>Scroll to explore</span><i />
      </div>
    </section>
  );
}
