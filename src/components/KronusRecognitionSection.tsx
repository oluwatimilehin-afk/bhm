import { useRef } from "react";
import { Link } from "react-router";
import { evidenceSectionContent } from "../content/bhm";
import { gsap, useGSAP } from "../lib/gsap";
import { addHoverTargets, MOTION } from "../lib/kronusMotion";

type EvidenceGroup = (typeof evidenceSectionContent.groups)[number];

function EvidenceColumn({ title, items }: EvidenceGroup) {
  return (
    <div
      data-recognition-group
      className="rounded-[1.6rem] border border-[#cabba7] bg-[#f5f0e7] p-6 shadow-[0_12px_24px_rgba(16,10,3,0.04)] sm:p-7"
    >
      <p className="text-[0.82rem] font-semibold uppercase tracking-[0.18em] text-[#5f4f42]">
        {title}
      </p>
      <div className="mt-5 space-y-4">
        {items.map((item) => (
          <div
            key={item}
            data-recognition-mark
            className="border-b border-[#d8ccba] pb-4 text-[1.2rem] font-medium leading-[1.05] tracking-[-0.04em] text-[#20140d] last:border-b-0 last:pb-0 sm:text-[1.45rem]"
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function KronusRecognitionSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const matchMedia = gsap.matchMedia();

      matchMedia.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(
          [
            "[data-recognition-intro]",
            "[data-recognition-cta]",
            "[data-recognition-group]",
            "[data-recognition-mark]",
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
              start: isDesktop ? "top 68%" : "top 80%",
              once: true,
            },
            defaults: { ease: MOTION.ease.out },
          });

          timeline
            .from(
              "[data-recognition-intro]",
              {
                x: -28,
                autoAlpha: 0,
                duration: 0.82,
                stagger: MOTION.stagger.tight,
              },
              0,
            )
            .from(
              "[data-recognition-cta]",
              {
                y: MOTION.distance.itemEnter,
                autoAlpha: 0,
                duration: 0.62,
              },
              0.32,
            )
            .from(
              "[data-recognition-group]",
              {
                y: 28,
                autoAlpha: 0,
                duration: 0.68,
                stagger: 0.08,
              },
              0.2,
            )
            .from(
              "[data-recognition-mark]",
              {
                y: 18,
                autoAlpha: 0,
                duration: 0.42,
                stagger: 0.03,
              },
              0.36,
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
      className="bg-[#ece8e2] px-5 py-20 text-[#1e140f] sm:px-8 md:px-10 lg:px-14 lg:py-28 xl:py-32"
    >
      <div className="mx-auto grid max-w-[1620px] gap-16 xl:grid-cols-[minmax(0,44rem)_minmax(0,1fr)] xl:items-start xl:gap-20">
        <div className="max-w-[45rem]">
          <p
            data-recognition-intro
            className="text-[1.3rem] leading-none tracking-[-0.045em] sm:text-[1.55rem]"
          >
            {evidenceSectionContent.eyebrow}
          </p>

          <h2
            data-recognition-intro
            className="mt-5 text-balance leading-[0.95] tracking-[-0.07em] text-[#140b07]"
          >
            <span className="block font-sans text-[clamp(2.8rem,6.4vw,5.4rem)] font-semibold">
              {evidenceSectionContent.headingLead}
            </span>
            <span className="mt-1 block font-serif text-[clamp(2.8rem,6.4vw,5.4rem)] font-light italic">
              {evidenceSectionContent.headingAccent}
            </span>
          </h2>

          <p
            data-recognition-intro
            className="mt-8 max-w-[41rem] text-balance text-[1.15rem] leading-[1.62] tracking-[-0.03em] text-[#3a2c24] sm:text-[1.35rem] md:text-[1.5rem]"
          >
            {evidenceSectionContent.description}
          </p>

          <Link
            to={evidenceSectionContent.cta.href}
            data-recognition-cta
            data-kronus-lift
            className="mt-10 inline-flex min-h-[4.25rem] items-center justify-center border border-[#1a0f08] bg-[#120905] px-8 text-[0.95rem] font-medium uppercase tracking-[0.08em] text-[#f5efe7] shadow-[0_10px_24px_rgba(0,0,0,0.08)] transition-transform hover:-translate-y-0.5 sm:min-h-[4.55rem] sm:px-10 sm:text-[1.05rem]"
          >
            <span className="underline decoration-[1.5px] underline-offset-[0.38em]">
              {evidenceSectionContent.cta.label}
            </span>
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-3 xl:pl-6">
          {evidenceSectionContent.groups.map((group) => (
            <EvidenceColumn
              key={group.title}
              {...group}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
