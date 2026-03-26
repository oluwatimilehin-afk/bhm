import { useRef } from "react";
import { gsap, useGSAP } from "../lib/gsap";
import { addHoverTargets, MOTION } from "../lib/kronusMotion";

type KronusContactFormSectionProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  submitLabel?: string;
  className?: string;
  onSubmit?: React.FormEventHandler<HTMLFormElement>;
};

function splitTitle(title: string) {
  const words = title.trim().split(/\s+/).filter(Boolean);

  if (words.length <= 2) {
    return {
      primary: words[0] ?? title,
      accent: words.slice(1).join(" "),
    };
  }

  return {
    primary: words.slice(0, -2).join(" "),
    accent: words.slice(-2).join(" "),
  };
}

function UnderlineField({
  label,
  type = "text",
  required = false,
}: {
  label: string;
  type?: React.HTMLInputTypeAttribute;
  required?: boolean;
}) {
  return (
    <label
      data-contact-field
      className="block"
    >
      <span className="mb-3 block text-[1rem] leading-none tracking-[-0.025em] text-[#61554b] sm:text-[1.1rem] lg:text-[1.2rem]">
        {label}
        {required ? " *" : ""}
      </span>
      <input
        type={type}
        required={required}
        className="block h-11 w-full border-0 border-b border-[#978d82] bg-transparent px-0 pb-3 text-[1.05rem] leading-none tracking-[-0.03em] text-[#1b110a] outline-none transition-colors placeholder:text-[#8f857a] focus:border-[#1b110a] sm:h-12 sm:text-[1.18rem] lg:h-[3.25rem] lg:text-[1.28rem]"
      />
    </label>
  );
}

function MessageField({ label }: { label: string }) {
  return (
    <label
      data-contact-field
      className="block"
    >
      <span className="mb-3 block text-[1rem] leading-none tracking-[-0.025em] text-[#61554b] sm:text-[1.1rem] lg:text-[1.2rem]">
        {label}
      </span>
      <textarea
        rows={5}
        className="block min-h-[9rem] w-full resize-none border-0 border-b border-[#978d82] bg-transparent px-0 pb-3 text-[1.05rem] leading-[1.35] tracking-[-0.03em] text-[#1b110a] outline-none transition-colors placeholder:text-[#8f857a] focus:border-[#1b110a] sm:min-h-[10rem] sm:text-[1.18rem] lg:min-h-[10.5rem] lg:text-[1.28rem]"
      />
    </label>
  );
}

export default function KronusContactFormSection({
  eyebrow = "Contact Us",
  title = "Reach Out To Our Team",
  description = "Let us know what's on your mind and what you want to achieve - we're here for you and will respond promptly.",
  submitLabel = "Submit",
  className = "",
  onSubmit,
}: KronusContactFormSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const { primary, accent } = splitTitle(title);

  useGSAP(
    () => {
      const matchMedia = gsap.matchMedia();

      matchMedia.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(
          [
            "[data-contact-intro]",
            "[data-contact-field]",
            "[data-contact-submit]",
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
              start: isDesktop ? "top 72%" : "top 82%",
              once: true,
            },
            defaults: { ease: MOTION.ease.out },
          });

          timeline
            .from(
              "[data-contact-intro]",
              {
                x: -28,
                autoAlpha: 0,
                duration: 0.82,
                stagger: MOTION.stagger.tight,
              },
              0,
            )
            .from(
              "[data-contact-field]",
              {
                y: 24,
                autoAlpha: 0,
                duration: 0.62,
                stagger: MOTION.stagger.tight,
              },
              0.18,
            )
            .from(
              "[data-contact-submit]",
              {
                y: 20,
                autoAlpha: 0,
                duration: 0.58,
              },
              0.42,
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
      className={`bg-[#ede9e3] px-5 py-20 text-[#1a110b] sm:px-8 md:px-10 lg:px-14 lg:py-24 xl:py-28 ${className}`.trim()}
    >
      <div className="mx-auto grid max-w-[1620px] gap-14 xl:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] xl:gap-0">
        <div className="max-w-[43rem] xl:pr-16">
          <p
            data-contact-intro
            className="text-[1.4rem] font-medium tracking-[-0.04em] text-[#1c120b] sm:text-[1.65rem] lg:text-[1.9rem]"
          >
            {eyebrow}
          </p>

          <h2
            data-contact-intro
            className="mt-7 leading-[0.92] tracking-[-0.075em] text-[#120905]"
          >
            <span className="font-sans text-[clamp(2.8rem,5.1vw,5rem)] font-semibold">
              {primary}
              {accent ? " " : ""}
            </span>
            {accent ? (
              <span className="font-serif text-[clamp(2.65rem,5vw,4.8rem)] font-light italic tracking-[-0.06em]">
                {accent}
              </span>
            ) : null}
          </h2>

          <p
            data-contact-intro
            className="mt-7 max-w-[40rem] text-balance text-[1.2rem] leading-[1.42] tracking-[-0.03em] text-[#3d322a] sm:text-[1.4rem] lg:text-[1.6rem]"
          >
            {description}
          </p>
        </div>

        <div className="xl:border-l xl:border-[#978d82] xl:pl-14 2xl:pl-16">
          <form
            className="space-y-8 pt-1 sm:space-y-9"
            onSubmit={onSubmit ?? ((event) => event.preventDefault())}
          >
            <UnderlineField
              label="Name"
              required
            />
            <UnderlineField
              label="Your Email"
              type="email"
              required
            />
            <UnderlineField
              label="Your Phone"
              type="tel"
              required
            />
            <MessageField label="Your Message" />

            <div className="flex justify-start pt-2 sm:pt-4 lg:justify-end">
              <button
                type="submit"
                data-contact-submit
                data-kronus-lift
                className="inline-flex min-h-[4.2rem] items-center justify-center border border-[#160d08] bg-[#130903] px-9 text-[0.92rem] font-medium uppercase tracking-[0.08em] text-[#f5efe7] shadow-[0_12px_28px_rgba(0,0,0,0.08)] transition-transform hover:-translate-y-0.5 sm:min-h-[4.5rem] sm:px-12 sm:text-[1.02rem] lg:min-w-[15.3rem] lg:px-14 lg:text-[1.08rem]"
              >
                <span className="underline decoration-[1.5px] underline-offset-[0.34em]">
                  {submitLabel}
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
