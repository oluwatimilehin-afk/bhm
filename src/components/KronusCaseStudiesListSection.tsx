import { useRef } from "react";
import { gsap, useGSAP } from "../lib/gsap";
import {
  addHoverTargets,
  MOTION,
  useRefreshOnImages,
} from "../lib/kronusMotion";

export type KronusCaseStudy = {
  id?: string;
  image: string;
  imageAlt?: string;
  title: string;
  meta?: string[];
  challengeQuote: string;
  whatWeDidLabel?: string;
  whatWeDid: string;
  result: string;
  href?: string;
};

type KronusCaseStudiesListSectionProps = {
  caseStudies: KronusCaseStudy[];
  className?: string;
};

function ArrowUpRightIcon() {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-9 w-9"
    >
      <path
        d="M10 10H30V30"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M29.5 10.5L10.5 29.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function KronusCaseStudiesListSection({
  caseStudies,
  className = "",
}: KronusCaseStudiesListSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useRefreshOnImages(sectionRef, String(caseStudies.length));

  useGSAP(
    () => {
      const matchMedia = gsap.matchMedia();

      matchMedia.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(
          [
            "[data-case-study-visual]",
            "[data-case-study-title]",
            "[data-case-study-meta]",
            "[data-case-study-quote]",
            "[data-case-study-block]",
            "[data-case-study-link]",
          ],
          { autoAlpha: 1, clearProps: "all" },
        );
      });

      matchMedia.add(
        {
          desktop: "(min-width: 1280px)",
          motion: "(prefers-reduced-motion: no-preference)",
        },
        (context) => {
          if (!context.conditions?.motion) {
            return;
          }

          const isDesktop = Boolean(context.conditions.desktop);
          const cleanupHover = addHoverTargets(
            sectionRef.current?.querySelectorAll("[data-kronus-lift]") ?? [],
            { y: isDesktop ? -7 : -4, scale: 1.03 },
          );

          gsap.utils
            .toArray<HTMLElement>("[data-case-study-card]")
            .forEach((card) => {
              const visual = card.querySelector("[data-case-study-visual]");
              const title = card.querySelector("[data-case-study-title]");
              const meta = card.querySelector("[data-case-study-meta]");
              const quote = card.querySelector("[data-case-study-quote]");
              const blocks = card.querySelectorAll("[data-case-study-block]");
              const link = card.querySelector("[data-case-study-link]");

              const timeline = gsap.timeline({
                scrollTrigger: {
                  trigger: card,
                  start: isDesktop ? "top 76%" : "top 84%",
                  once: true,
                },
                defaults: { ease: MOTION.ease.out },
              });

              timeline
                .from(
                  visual,
                  {
                    y: isDesktop ? 38 : 26,
                    scale: 1.06,
                    autoAlpha: 0,
                    duration: 0.92,
                  },
                  0,
                )
                .from(
                  title,
                  {
                    y: 34,
                    autoAlpha: 0,
                    duration: 0.74,
                  },
                  0.14,
                )
                .from(
                  meta,
                  {
                    y: 18,
                    autoAlpha: 0,
                    duration: 0.52,
                  },
                  0.22,
                )
                .from(
                  quote,
                  {
                    x: isDesktop ? -24 : 0,
                    autoAlpha: 0,
                    duration: 0.64,
                  },
                  0.28,
                )
                .from(
                  blocks,
                  {
                    y: 24,
                    autoAlpha: 0,
                    duration: 0.62,
                    stagger: MOTION.stagger.tight,
                  },
                  0.4,
                )
                .from(
                  link,
                  {
                    scale: 0.82,
                    autoAlpha: 0,
                    duration: 0.42,
                  },
                  0.5,
                );
            });

          return () => {
            cleanupHover();
          };
        },
      );

      return () => {
        matchMedia.revert();
      };
    },
    {
      scope: sectionRef,
      dependencies: [caseStudies.length],
      revertOnUpdate: true,
    },
  );

  if (!caseStudies.length) {
    return null;
  }

  return (
    <section
      ref={sectionRef}
      className={`bg-[#f3f0e9] px-6 py-16 text-[#16110b] sm:px-8 md:px-10 lg:px-14 lg:py-20 ${className}`.trim()}
      aria-label="Case studies"
    >
      <div className="mx-auto max-w-[100rem] space-y-24 lg:space-y-28">
        {caseStudies.map((study) => {
          const studyKey = study.id ?? study.title;
          const isActionableLink = Boolean(
            study.href && !study.href.startsWith("#"),
          );

          return (
            <article
              key={studyKey}
              data-case-study-card
              className="grid gap-7 lg:gap-8 xl:grid-cols-[minmax(21rem,26.5rem)_minmax(0,1fr)_3.5rem] xl:items-start"
            >
              <div
                data-case-study-visual
                className="overflow-hidden bg-[#050505] shadow-[0_18px_40px_rgba(0,0,0,0.08)]"
              >
                <div className="aspect-[423/494] w-full">
                  <img
                    src={study.image}
                    alt={study.imageAlt ?? study.title}
                    className="h-full w-full object-cover grayscale"
                    loading="lazy"
                  />
                </div>
              </div>

              <div className="min-w-0">
                <h2
                  data-case-study-title
                  className="max-w-[58rem] font-serif text-[clamp(2.3rem,4.35vw,4.7rem)] font-light leading-[0.95] tracking-[-0.06em] text-[#211913]"
                >
                  {study.title}
                </h2>

                {study.meta?.length ? (
                  <p
                    data-case-study-meta
                    className="mt-4 text-[clamp(1.2rem,1.8vw,1.8rem)] leading-[1.35] tracking-[-0.03em] text-[#28211a]"
                  >
                    {study.meta.map((item, index) => (
                      <span key={`${studyKey}-meta-${item}`}>
                        {index > 0 ? " · " : ""}
                        {item}
                      </span>
                    ))}
                  </p>
                ) : null}

                <div
                  data-case-study-quote
                  className="mt-8 overflow-hidden bg-[linear-gradient(90deg,#070401_0%,#070401_71%,rgba(89,75,51,0.9)_88%,rgba(10,6,2,0.98)_100%)] px-5 py-4 sm:px-7 sm:py-5"
                >
                  <p className="max-w-[70rem] font-serif text-[clamp(1.35rem,2vw,2rem)] font-light italic leading-[1.38] tracking-[-0.025em] text-white/80">
                    {study.challengeQuote}
                  </p>
                </div>

                <div
                  data-case-study-block
                  className="mt-8"
                >
                  <h3 className="text-[clamp(2rem,3vw,3.3rem)] font-semibold leading-none tracking-[-0.05em] text-[#15110c]">
                    {study.whatWeDidLabel ?? "What We Did:"}
                  </h3>
                  <p className="mt-3 max-w-[70rem] text-[clamp(1.2rem,1.8vw,1.85rem)] leading-[1.45] tracking-[-0.025em] text-[#5f5953]">
                    {study.whatWeDid}
                  </p>
                </div>

                <p
                  data-case-study-block
                  className="mt-8 max-w-[74rem] text-[clamp(1.65rem,2.3vw,2.55rem)] font-semibold leading-[1.15] tracking-[-0.045em] text-[#2c241d]"
                >
                  {study.result}
                </p>
              </div>

              <div className="flex items-start xl:justify-end">
                {isActionableLink ? (
                  <a
                    href={study.href}
                    data-case-study-link
                    data-kronus-lift
                    className="inline-flex h-11 w-11 items-center justify-center text-[#2a221b] transition-transform hover:-translate-y-0.5"
                    aria-label={`Open case study: ${study.title}`}
                  >
                    <ArrowUpRightIcon />
                  </a>
                ) : (
                  <span
                    data-case-study-link
                    className="inline-flex h-11 w-11 items-center justify-center text-[#2a221b]"
                    aria-hidden="true"
                  >
                    <ArrowUpRightIcon />
                  </span>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
