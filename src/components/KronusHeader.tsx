import logo from "../assets/kronus-logo.png";
import heroImage from "../assets/hero-building.png";
import menuIcon from "../assets/menu-icon.svg";

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
  return (
    <header className="relative isolate min-h-screen overflow-hidden bg-[#071016] text-white">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(90deg, rgba(4, 9, 14, 0.96) 0%, rgba(4, 9, 14, 0.88) 24%, rgba(4, 9, 14, 0.62) 48%, rgba(4, 9, 14, 0.18) 72%, rgba(4, 9, 14, 0.08) 100%), url(${heroImage})`,
        }}
      />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.06),transparent_28%)]" />

      <div className="relative z-10 mx-auto flex min-h-screen w-full flex-col px-5 pb-10 pt-6 sm:px-8 md:px-10 lg:px-14 lg:pb-14 lg:pt-12">
        <div className="flex items-start justify-between gap-6">
          <button
            type="button"
            onClick={onMenuClick}
            className="group inline-flex items-center gap-5 text-left text-white transition-opacity hover:opacity-90"
            aria-label="Open navigation menu"
          >
            <span className="grid h-[4rem] w-[4rem] place-items-center border border-white/15 bg-white shadow-[0_8px_30px_rgba(0,0,0,0.18)]">
              <img
                src={menuIcon}
                alt=""
                className="h-5 w-5"
                aria-hidden="true"
              />
            </span>
            <span className="text-lg uppercase tracking-[0.08em] text-white/95 sm:text-[1.25rem]">
              Menu
            </span>
          </button>

          <img
            src={logo}
            alt="Kronus Communications"
            className="hidden w-[18rem] max-w-[32vw] object-contain md:block lg:w-[20rem]"
          />

          <button
            type="button"
            onClick={onContactClick}
            className="inline-flex min-h-[4rem] items-center justify-center border border-black bg-[#f3ede3] px-5 text-center text-sm font-medium uppercase tracking-[0.08em] text-black underline decoration-[1.5px] underline-offset-[0.32em] shadow-[0_8px_30px_rgba(0,0,0,0.16)] transition-transform hover:-translate-y-0.5 sm:px-8 sm:text-[0.9rem]"
          >
            Contact us
          </button>
        </div>

        <div className="flex flex-1 items-center py-12 sm:py-16 lg:py-20">
          <div className="">
            <div className="mb-8 md:hidden">
              <img
                src={logo}
                alt="Kronus Communications"
                className="w-32 max-w-full object-contain"
              />
            </div>

            <h1 className="w-full max-w-none text-[clamp(2.6rem,7.2vw,6.4rem)] uppercase leading-[0.9] tracking-[-0.04em] text-white">
              <span className="block font-serif text-[0.88em] font-light italic tracking-[-0.05em]">
                Cut through{" "}
                <span className="font-sans text-[0.92em] not-italic font-semibold">
                  the clutter.
                </span>
              </span>
              <span className="mt-2 block font-sans text-[0.88em] font-semibold tracking-[-0.055em]">
                Control{" "}
                <span className="font-serif font-light italic tracking-[-0.05em] text-white/92">
                  the conversation.
                </span>
              </span>
            </h1>

            <p className="mt-8 w-full max-w-none text-balance text-base leading-[1.55] text-white/86 sm:text-lg md:text-[1.5rem] md:leading-[1.5]">
              Kronus Communications is your strategic PR partner for the modern
              era. We provide full-stack architecture for crisis communications,
              predictive intelligence, and resilient reputation management.
            </p>

            <div className="mt-10 flex flex-wrap gap-4 sm:gap-6">
              <button
                type="button"
                onClick={onPrimaryClick}
                className="inline-flex min-h-[4rem] items-center justify-center border border-white px-6 text-base font-semibold uppercase tracking-[-0.02em] text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.18)] transition-colors hover:bg-white hover:text-[#071016] sm:min-h-[4.15rem] sm:px-10 sm:text-[1.1rem]"
              >
                <span className="underline decoration-[1.5px] underline-offset-[0.38em]">
                  Meet with us
                </span>
              </button>

              <button
                type="button"
                onClick={onSecondaryClick}
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
