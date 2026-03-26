import { useRef } from "react";
import { Link } from "react-router";
import { workWithSectionContent } from "../content/bhm";
import { gsap, useGSAP } from "../lib/gsap";
import { addHoverTargets, MOTION } from "../lib/kronusMotion";

function OutcomeCard({ text, index }: { text: string; index: number }) {
  const isRightColumn = index % 2 === 1;
  const isBottomRow = index >= 2;

  return (
    <div
      data-work-outcome
      className={[
        "min-h-[9.5rem] border-[#9e9489] pb-6 text-[#1d120c] sm:min-h-[11rem] lg:min-h-[11.5rem]",
        !isBottomRow ? "border-b" : "",
        isRightColumn ? "sm:pl-5 lg:pl-8" : "sm:pr-5 lg:pr-8",
        isRightColumn ? "sm:border-l" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <p className="whitespace-pre-line font-serif text-[1.55rem] font-light italic leading-[0.98] tracking-[-0.055em] sm:text-[1.8rem] lg:text-[2.05rem]">
        {text}
      </p>
    </div>
  );
}

export default function KronusWorkWithSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const matchMedia = gsap.matchMedia();

      matchMedia.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(
          [
            "[data-work-left-intro]",
            "[data-work-right-intro]",
            "[data-work-outcome]",
            "[data-work-pillar]",
            "[data-work-submit]",
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
            { y: isDesktop ? -8 : -5, scale: 1.018 },
          );

          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: isDesktop ? "top 70%" : "top 80%",
              once: true,
            },
            defaults: { ease: MOTION.ease.out },
          });

          timeline
            .from(
              "[data-work-left-intro]",
              {
                x: -28,
                autoAlpha: 0,
                duration: 0.8,
                stagger: MOTION.stagger.tight,
              },
              0,
            )
            .from(
              "[data-work-right-intro]",
              {
                x: 28,
                autoAlpha: 0,
                duration: 0.8,
                stagger: MOTION.stagger.tight,
              },
              0.06,
            )
            .from(
              "[data-work-outcome]",
              {
                y: MOTION.distance.itemEnter,
                autoAlpha: 0,
                duration: 0.64,
                stagger: MOTION.stagger.tight,
              },
              0.2,
            )
            .from(
              "[data-work-pillar]",
              {
                y: 24,
                autoAlpha: 0,
                duration: 0.62,
                stagger: MOTION.stagger.tight,
              },
              0.24,
            )
            .from(
              "[data-work-submit]",
              {
                y: 20,
                autoAlpha: 0,
                duration: 0.58,
              },
              0.46,
            );

          return () => {
            cleanupHover();
          };
        },
      );

      return () => {
        matchMedia.revert();
      };
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="bg-[#ece8e2] px-5 py-20 text-[#1d120c] sm:px-8 md:px-10 lg:px-14 lg:py-28 xl:py-32"
    >
      <div className="mx-auto grid max-w-[1620px] gap-16 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.02fr)] xl:gap-20">
        <div className="max-w-[47rem]">
          <h2
            data-work-left-intro
            className="leading-[0.94] tracking-[-0.07em] text-[#140b07]"
          >
            <span className="block font-sans text-[clamp(2.5rem,5vw,4.5rem)] font-semibold">
              {workWithSectionContent.leftTitleLead}
            </span>
            <span className="mt-1 block font-serif text-[clamp(2.35rem,4.8vw,4.25rem)] font-light italic">
              {workWithSectionContent.leftTitleAccent}
            </span>
          </h2>

          <p
            data-work-left-intro
            className="mt-7 max-w-[42rem] text-balance text-[1.15rem] leading-[1.45] tracking-[-0.03em] text-[#3c2f27] sm:text-[1.35rem] lg:text-[1.5rem]"
          >
            {workWithSectionContent.leftParagraph}
          </p>

          <div className="mt-12 grid gap-y-5 sm:grid-cols-2 sm:gap-x-0 sm:gap-y-5 lg:mt-14">
            {workWithSectionContent.facts.map((item, index) => (
              <OutcomeCard
                key={item}
                text={item}
                index={index}
              />
            ))}
          </div>
        </div>

        <div className="max-w-[52rem] xl:pt-1">
          <h2
            data-work-right-intro
            className="leading-[0.94] tracking-[-0.07em] text-[#140b07]"
          >
            <span className="block font-sans text-[clamp(2.5rem,5vw,4.5rem)] font-semibold">
              {workWithSectionContent.rightTitleLead}
            </span>
            <span className="mt-1 block font-serif text-[clamp(2.4rem,4.9vw,4.25rem)] font-light italic">
              {workWithSectionContent.rightTitleAccent}
            </span>
          </h2>

          <p
            data-work-right-intro
            className="mt-7 max-w-[45rem] text-balance text-[1.15rem] leading-[1.45] tracking-[-0.03em] text-[#3c2f27] sm:text-[1.35rem] lg:text-[1.5rem]"
          >
            {workWithSectionContent.rightParagraph}
          </p>

          <div className="mt-10 space-y-7 lg:mt-12">
            {workWithSectionContent.pillars.map((pillar) => (
              <div
                key={pillar.title}
                data-work-pillar
                className="border-b border-[#9e9489] pb-6"
              >
                <h3 className="text-[1.35rem] font-semibold leading-none tracking-[-0.04em] text-[#170f09] sm:text-[1.55rem]">
                  {pillar.title}
                </h3>
                <p className="mt-4 max-w-[42rem] text-[1rem] leading-[1.5] tracking-[-0.02em] text-[#4e4137] sm:text-[1.12rem]">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>

          <Link
            to={workWithSectionContent.cta.href}
            data-work-submit
            data-kronus-lift
            className="mt-10 inline-flex min-h-[4.15rem] items-center justify-center border border-[#160d08] bg-[#120905] px-8 text-[0.88rem] font-medium uppercase tracking-[0.08em] text-[#f5efe7] shadow-[0_10px_24px_rgba(0,0,0,0.08)] transition-transform hover:-translate-y-0.5 sm:mt-12 sm:min-h-[4.55rem] sm:px-10 sm:text-[0.98rem]"
          >
            <span className="underline decoration-[1.5px] underline-offset-[0.38em]">
              {workWithSectionContent.cta.label}
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
