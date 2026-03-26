import { useRef } from "react";
import heroImage from "../assets/hero-building.png";
import { gsap, useGSAP } from "../lib/gsap";
import { addHoverTargets, MOTION } from "../lib/kronusMotion";
import KronusMenuButton from "./KronusMenuButton";

type KronusHeaderProps = {
  onMenuClick?: () => void;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
  onContactClick?: () => void;
};

export default function KronusHeader({
  onMenuClick,
  onPrimaryClick,
  onSecondaryClick,
  onContactClick,
}: KronusHeaderProps) {
  const headerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const matchMedia = gsap.matchMedia();

      matchMedia.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(
          [
            "[data-kronus-hero-bg]",
            "[data-kronus-hero-top]",
            "[data-kronus-hero-line]",
            "[data-kronus-hero-copy]",
            "[data-kronus-hero-cta]",
          ],
          { autoAlpha: 1, clearProps: "all" },
        );
      });

      matchMedia.add(
        {
          desktop: "(min-width: 1024px)",
          motion: "(prefers-reduced-motion: no-preference)",
        },
        (context) => {
          if (!context.conditions?.motion) {
            return;
          }

          const isDesktop = Boolean(context.conditions.desktop);
          const cleanupHover = addHoverTargets(
            headerRef.current?.querySelectorAll("[data-kronus-lift]") ?? [],
            { y: isDesktop ? -8 : -5, scale: 1.018 },
          );

          const timeline = gsap.timeline({
            defaults: { ease: MOTION.ease.out },
          });

          timeline
            .fromTo(
              "[data-kronus-hero-bg]",
              {
                scale: isDesktop ? 1.12 : 1.06,
                autoAlpha: 0.74,
              },
              {
                scale: 1,
                autoAlpha: 1,
                duration: 1.55,
              },
              0,
            )
            .from(
              "[data-kronus-hero-top]",
              {
                y: -28,
                autoAlpha: 0,
                duration: 0.72,
              },
              0.12,
            )
            .from(
              "[data-kronus-hero-line]",
              {
                yPercent: 110,
                autoAlpha: 0,
                duration: 0.88,
                stagger: MOTION.stagger.medium,
              },
              0.3,
            )
            .from(
              "[data-kronus-hero-copy]",
              {
                y: MOTION.distance.sectionEnter,
                autoAlpha: 0,
                duration: 0.8,
              },
              0.54,
            )
            .from(
              "[data-kronus-hero-cta]",
              {
                y: MOTION.distance.itemEnter,
                autoAlpha: 0,
                duration: 0.72,
                stagger: MOTION.stagger.tight,
              },
              0.66,
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
    { scope: headerRef },
  );

  return (
    <header
      ref={headerRef}
      className="relative isolate min-h-screen overflow-hidden bg-[#071016] text-white"
    >
      <div
        data-kronus-hero-bg
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(90deg, rgba(4, 9, 14, 0.96) 0%, rgba(4, 9, 14, 0.88) 24%, rgba(4, 9, 14, 0.62) 48%, rgba(4, 9, 14, 0.18) 72%, rgba(4, 9, 14, 0.08) 100%), url(${heroImage})`,
        }}
      />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.06),transparent_28%)]" />

      <div className="relative z-10 mx-auto flex min-h-screen w-full flex-col px-5 pb-10 pt-6 sm:px-8 md:px-10 lg:px-14 lg:pb-14 lg:pt-12">
        <div
          data-kronus-hero-top
          className="flex items-start justify-between gap-6"
        >
          <KronusMenuButton
            onMenuClick={onMenuClick}
            buttonClassName="group inline-flex items-center gap-5 text-left text-white transition-opacity hover:opacity-90"
            iconWrapperClassName="grid h-[4rem] w-[4rem] place-items-center border border-white/15 bg-white shadow-[0_8px_30px_rgba(0,0,0,0.18)]"
            labelClassName="text-lg uppercase tracking-[0.08em] text-white/95 sm:text-[1.25rem]"
          />

          <button
            type="button"
            onClick={onContactClick}
            data-kronus-lift
            className="inline-flex min-h-[4rem] items-center justify-center border border-black bg-[#f3ede3] px-5 text-center text-sm font-medium uppercase tracking-[0.08em] text-black underline decoration-[1.5px] underline-offset-[0.32em] shadow-[0_8px_30px_rgba(0,0,0,0.16)] transition-transform hover:-translate-y-0.5 sm:px-8 sm:text-[0.9rem]"
          >
            Contact us
          </button>
        </div>

        <div className="flex flex-1 items-center py-12 sm:py-16 lg:py-20">
          <div>
            <div className="mb-8 md:hidden"></div>

            <h1 className="w-full max-w-none text-[clamp(2.6rem,7.2vw,6.4rem)] uppercase leading-[0.9] tracking-[-0.04em] text-white">
              <span className="block overflow-hidden">
                <span
                  data-kronus-hero-line
                  className="block font-serif text-[0.88em] font-light italic tracking-[-0.05em]"
                >
                  Cut through{" "}
                  <span className="font-sans text-[0.92em] not-italic font-semibold">
                    the clutter.
                  </span>
                </span>
              </span>
              <span className="mt-2 block overflow-hidden">
                <span
                  data-kronus-hero-line
                  className="block font-sans text-[0.88em] font-semibold tracking-[-0.055em]"
                >
                  Control{" "}
                  <span className="font-serif font-light italic tracking-[-0.05em] text-white/92">
                    the conversation.
                  </span>
                </span>
              </span>
            </h1>

            <p
              data-kronus-hero-copy
              className="mt-8 w-full max-w-none text-balance text-base leading-[1.55] text-white/86 sm:text-lg md:text-[1.5rem] md:leading-[1.5]"
            >
              Kronus Communications is your strategic PR partner for the modern
              era. We provide full-stack architecture for crisis communications,
              predictive intelligence, and resilient reputation management.
            </p>

            <div className="mt-10 flex flex-wrap gap-4 sm:gap-6">
              <button
                type="button"
                onClick={onPrimaryClick}
                data-kronus-hero-cta
                data-kronus-lift
                className="inline-flex min-h-[4rem] items-center justify-center border border-white px-6 text-base font-semibold uppercase tracking-[-0.02em] text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.18)] transition-colors hover:bg-white hover:text-[#071016] sm:min-h-[4.15rem] sm:px-10 sm:text-[1.1rem]"
              >
                <span className="underline decoration-[1.5px] underline-offset-[0.38em]">
                  Meet with us
                </span>
              </button>

              <button
                type="button"
                onClick={onSecondaryClick}
                data-kronus-hero-cta
                data-kronus-lift
                className="inline-flex min-h-[4rem] items-center justify-center border border-white px-6 text-base font-semibold uppercase tracking-[-0.02em] text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.18)] transition-colors hover:bg-white hover:text-[#071016] sm:min-h-[4.15rem] sm:px-10 sm:text-[1.1rem]"
              >
                <span className="underline decoration-[1.5px] underline-offset-[0.38em]">
                  I need help now
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
