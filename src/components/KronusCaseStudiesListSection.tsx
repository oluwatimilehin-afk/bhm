import { useRef } from "react";
import { gsap, useGSAP } from "../lib/gsap";
import {
  addHoverTargets,
  MOTION,
  useRefreshOnImages,
} from "../lib/kronusMotion";

export type PublishedCaseStudy = {
  id: string;
  client: string;
  title: string;
  campaign: string;
  format: string;
  image: string;
  imageAlt?: string;
  assetUrl: string;
  assetLabel: string;
};

type KronusCaseStudiesListSectionProps = {
  caseStudies: PublishedCaseStudy[];
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
            "[data-case-study-eyebrow]",
            "[data-case-study-title]",
            "[data-case-study-copy]",
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
            { y: isDesktop ? -7 : -4, scale: 1.02 },
          );

          gsap.utils
            .toArray<HTMLElement>("[data-case-study-card]")
            .forEach((card) => {
              const visual = card.querySelector("[data-case-study-visual]");
              const eyebrow = card.querySelector("[data-case-study-eyebrow]");
              const title = card.querySelector("[data-case-study-title]");
              const copy = card.querySelectorAll("[data-case-study-copy]");
              const link = card.querySelector("[data-case-study-link]");

              const timeline = gsap.timeline({
                scrollTrigger: {
                  trigger: card,
                  start: isDesktop ? "top 78%" : "top 84%",
                  once: true,
                },
                defaults: { ease: MOTION.ease.out },
              });

              timeline
                .from(
                  visual,
                  {
                    y: isDesktop ? 34 : 24,
                    scale: 1.04,
                    autoAlpha: 0,
                    duration: 0.88,
                  },
                  0,
                )
                .from(
                  [eyebrow, title],
                  {
                    y: 22,
                    autoAlpha: 0,
                    duration: 0.56,
                    stagger: 0.06,
                  },
                  0.16,
                )
                .from(
                  copy,
                  {
                    y: 18,
                    autoAlpha: 0,
                    duration: 0.48,
                    stagger: 0.04,
                  },
                  0.28,
                )
                .from(
                  link,
                  {
                    y: 16,
                    autoAlpha: 0,
                    duration: 0.44,
                  },
                  0.38,
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
      <div className="mx-auto grid max-w-[108rem] gap-8 lg:grid-cols-2 xl:gap-10">
        {caseStudies.map((study) => (
          <article
            key={study.id}
            data-case-study-card
            className="overflow-hidden border border-[#d6cdbc] bg-[#faf7f0] shadow-[0_18px_40px_rgba(0,0,0,0.05)]"
          >
            <a
              href={study.assetUrl}
              target="_blank"
              rel="noreferrer"
              data-kronus-lift
              className="group block h-full"
            >
              <div
                data-case-study-visual
                className="overflow-hidden bg-[#050505]"
              >
                <div className="aspect-[16/10] w-full">
                  <img
                    src={study.image}
                    alt={study.imageAlt ?? study.title}
                    className="h-full w-full object-cover grayscale transition-transform duration-500 group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                </div>
              </div>

              <div className="flex h-full flex-col gap-5 p-6 sm:p-8">
                <div>
                  <p
                    data-case-study-eyebrow
                    className="text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-[#63584f]"
                  >
                    {study.client}
                  </p>

                  <h2
                    data-case-study-title
                    className="mt-3 max-w-[32rem] font-serif text-[clamp(1.85rem,3vw,3rem)] font-light leading-[0.96] tracking-[-0.055em] text-[#201712]"
                  >
                    {study.title}
                  </h2>
                </div>

                <p
                  data-case-study-copy
                  className="max-w-[35rem] text-[1rem] leading-[1.5] tracking-[-0.02em] text-[#4d4036] sm:text-[1.08rem]"
                >
                  {study.campaign}
                </p>

                <div className="mt-auto flex items-center justify-between gap-4 border-t border-[#d9d1c5] pt-5">
                  <div
                    data-case-study-copy
                    className="text-[0.82rem] font-semibold uppercase tracking-[0.18em] text-[#63584f]"
                  >
                    {study.format}
                  </div>

                  <span
                    data-case-study-link
                    className="inline-flex items-center gap-2 text-[0.82rem] font-semibold uppercase tracking-[0.14em] text-[#201712]"
                  >
                    {study.assetLabel}
                    <ArrowUpRightIcon />
                  </span>
                </div>
              </div>
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
