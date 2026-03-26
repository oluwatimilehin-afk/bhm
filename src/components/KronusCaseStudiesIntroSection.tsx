import { useRef } from "react";
import { gsap, useGSAP } from "../lib/gsap";
import { MOTION } from "../lib/kronusMotion";

type KronusCaseStudiesIntroSectionProps = {
  eyebrow?: string;
  leadingText?: string;
  accentText?: string;
  trailingText?: string;
  paragraphOne?: string;
  paragraphTwo?: string;
  className?: string;
};

export default function KronusCaseStudiesIntroSection({
  eyebrow = "Published Work",
  leadingText = "Campaign Assets.",
  accentText = "Client Work.",
  trailingText = "Public Reference.",
  paragraphOne = "This page brings together public BHM case-study files in a format that is easier to scan than the source archive while still staying faithful to the published material.",
  paragraphTwo = "Each card links directly to the original BHM asset so visitors can review the public case-study files themselves.",
  className = "",
}: KronusCaseStudiesIntroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const matchMedia = gsap.matchMedia();

      matchMedia.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set("[data-case-intro-item]", { autoAlpha: 1, clearProps: "all" });
      });

      matchMedia.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
            once: true,
          },
          defaults: { ease: MOTION.ease.out },
        })
          .from("[data-case-intro-item]", {
            y: MOTION.distance.sectionEnter,
            autoAlpha: 0,
            duration: MOTION.duration.reveal,
            stagger: MOTION.stagger.medium,
          });
      });

      return () => {
        matchMedia.revert();
      };
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className={`bg-[#f3f0e9] px-6 py-20 text-[#120d07] sm:px-8 md:px-10 lg:px-14 lg:py-28 ${className}`.trim()}
      aria-label={eyebrow}
    >
      <div className="mx-auto max-w-[78rem] text-center">
        <p
          data-case-intro-item
          className="text-[clamp(1rem,1.5vw,1.55rem)] leading-none tracking-[-0.03em] text-[#17120c]"
        >
          {eyebrow}
        </p>

        <h2
          data-case-intro-item
          className="mt-6 text-[clamp(2rem,4.2vw,3.5rem)] leading-[0.98] tracking-[-0.06em] text-[#130f09]"
        >
          <span className="font-sans font-semibold">{leadingText} </span>
          <span className="font-serif font-light italic tracking-[-0.055em]">
            {accentText}{" "}
          </span>
          <span className="font-sans font-semibold">{trailingText}</span>
        </h2>

        <div className="mx-auto mt-8 max-w-[71rem] space-y-9 text-balance text-[clamp(1rem,1.55vw,1.3rem)] leading-[1.48] tracking-[-0.025em] text-[#2a241f] sm:mt-10 lg:mt-12">
          <p data-case-intro-item>{paragraphOne}</p>
          <p data-case-intro-item>{paragraphTwo}</p>
        </div>
      </div>
    </section>
  );
}
