import { useRef } from "react";
import { gsap, useGSAP } from "../lib/gsap";
import { addHoverTargets, MOTION } from "../lib/kronusMotion";

type Publication = {
  name: string;
  className?: string;
};

const publicationColumns: Publication[][] = [
  [
    {
      name: "AXIOS",
      className: "text-[2.15rem] font-semibold tracking-[-0.07em] opacity-18",
    },
    {
      name: "Forbes",
      className:
        "font-serif text-[2.55rem] font-semibold tracking-[-0.05em] opacity-80",
    },
    {
      name: "Nasdaq",
      className: "text-[1.95rem] font-semibold tracking-[-0.06em] opacity-80",
    },
    {
      name: "Bloomberg",
      className: "text-[1.75rem] font-semibold tracking-[-0.055em] opacity-85",
    },
    {
      name: "wp",
      className:
        "font-serif text-[4.05rem] font-black lowercase leading-none tracking-[-0.08em] opacity-85",
    },
    {
      name: "THE HILL",
      className:
        "text-[1.45rem] font-serif uppercase tracking-[0.02em] opacity-10",
    },
  ],
  [
    {
      name: "Sports\nIllustrated",
      className:
        "text-[1.9rem] font-semibold leading-[0.76] tracking-[-0.06em] opacity-25",
    },
    {
      name: "BUSINESS\nINSIDER",
      className:
        "font-serif text-[2.05rem] leading-[0.94] tracking-[0.02em] opacity-75",
    },
    {
      name: "Independent",
      className:
        "font-serif text-[1.4rem] font-semibold tracking-[0.02em] opacity-75",
    },
    {
      name: "Daily Mail",
      className:
        "font-serif text-[2.3rem] font-semibold tracking-[-0.06em] opacity-75",
    },
    {
      name: "HUFFPOST",
      className: "text-[1.7rem] font-bold tracking-[-0.045em] opacity-85",
    },
    {
      name: "BESTLIFE",
      className: "text-[1.75rem] font-semibold tracking-[-0.055em] opacity-12",
    },
  ],
  [
    {
      name: "TRAVEL+\nLEISURE",
      className:
        "text-[1.8rem] font-semibold uppercase leading-[0.8] tracking-[-0.06em] opacity-14",
    },
    {
      name: "VOGUE BUSINESS",
      className:
        "font-serif text-[1.45rem] uppercase tracking-[-0.03em] opacity-55",
    },
    {
      name: "CNN",
      className: "text-[2.45rem] font-black tracking-[-0.075em] opacity-80",
    },
    {
      name: "Investopedia",
      className: "text-[1.6rem] font-semibold tracking-[-0.05em] opacity-78",
    },
    {
      name: "CNBC",
      className: "text-[1.9rem] font-black tracking-[-0.07em] opacity-82",
    },
    {
      name: "DAILY BEAST",
      className: "text-[2.1rem] font-semibold tracking-[-0.065em] opacity-18",
    },
  ],
];

function PublicationMark({ name, className }: Publication) {
  return (
    <div
      data-recognition-mark
      className={`min-h-[3.5rem] text-[#221610] ${className ?? ""}`}
      aria-label={name.replace(/\n/g, " ")}
    >
      {name.split("\n").map((line) => (
        <div key={line}>{line}</div>
      ))}
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
              "[data-recognition-mark]",
              {
                y: 28,
                autoAlpha: 0,
                duration: 0.68,
                stagger: 0.04,
              },
              0.2,
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
      <div className="mx-auto grid max-w-[1620px] gap-16 xl:grid-cols-[minmax(0,44rem)_minmax(0,1fr)] xl:items-center xl:gap-20">
        <div className="max-w-[45rem]">
          <p
            data-recognition-intro
            className="text-[1.55rem] leading-none tracking-[-0.045em] sm:text-[1.85rem]"
          >
            Why Kronus Communications?
          </p>

          <h2
            data-recognition-intro
            className="mt-5 text-balance leading-[0.95] tracking-[-0.07em] text-[#140b07]"
          >
            <span className="block font-sans text-[clamp(2.8rem,6.4vw,5.4rem)] font-semibold">
              We&apos;re Recognized
            </span>
            <span className="mt-1 block text-[clamp(2.8rem,6.4vw,5.4rem)]">
              <span className="font-serif font-light italic">Trusted</span>{" "}
              <span className="font-sans font-semibold not-italic">
                &amp; Proven
              </span>
            </span>
          </h2>

          <p
            data-recognition-intro
            className="mt-8 max-w-[41rem] text-balance text-[1.25rem] leading-[1.72] tracking-[-0.035em] text-[#3a2c24] sm:text-[1.55rem] md:text-[1.7rem]"
          >
            <span className="font-serif font-light italic">Our presence</span>{" "}
            in leading media{" "}
            <span className="font-serif font-light italic">
              serves as a testament
            </span>{" "}
            to the quality and impact{" "}
            <span className="font-serif font-light italic">
              our clients rely on.
            </span>{" "}
            Explore our featured{" "}
            <span className="font-serif font-light italic">coverage.</span>
          </p>

          <button
            type="button"
            data-recognition-cta
            data-kronus-lift
            className="mt-10 inline-flex min-h-[4.25rem] items-center justify-center border border-[#1a0f08] bg-[#120905] px-8 text-[0.95rem] font-medium uppercase tracking-[0.08em] text-[#f5efe7] shadow-[0_10px_24px_rgba(0,0,0,0.08)] transition-transform hover:-translate-y-0.5 sm:min-h-[4.55rem] sm:px-10 sm:text-[1.05rem]"
          >
            <span className="underline decoration-[1.5px] underline-offset-[0.38em]">
              Talk with KC
            </span>
          </button>
        </div>

        <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-12 xl:gap-x-16 xl:pl-6">
          {publicationColumns.map((column, columnIndex) => (
            <div
              key={`column-${columnIndex}`}
              className="flex flex-col justify-between gap-8 lg:min-h-[38rem]"
            >
              {column.map((publication) => (
                <PublicationMark
                  key={publication.name}
                  name={publication.name}
                  className={publication.className}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
