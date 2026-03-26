import menuIcon from "../assets/menu-icon.svg";
import defaultBackgroundImage from "../assets/contact-hero-bg.png";

type KronusContactHeroProps = {
  title: string;
  paragraph?: string;
  backgroundImage?: string;
  menuLabel?: string;
  contactLabel?: string;
  className?: string;
  onMenuClick?: () => void;
  onContactClick?: () => void;
};

const gradientOverlays = [
  "linear-gradient(90deg, rgba(10,17,28,0.72) 0%, rgba(116,140,145,0.16) 47%, rgba(5,22,44,0.9) 100%), linear-gradient(180deg, rgba(186,214,212,0.2) 0%, rgba(0,0,0,0.18) 100%)",
  "linear-gradient(90deg, rgba(18,18,29,0.74) 0%, rgba(123,145,149,0.13) 43%, rgba(4,27,61,0.88) 100%), linear-gradient(180deg, rgba(175,217,221,0.22) 0%, rgba(4,18,29,0.14) 100%)",
  "linear-gradient(90deg, rgba(16,18,22,0.7) 0%, rgba(129,154,153,0.15) 48%, rgba(6,22,55,0.9) 100%), linear-gradient(180deg, rgba(201,226,224,0.18) 0%, rgba(10,17,28,0.18) 100%)",
  "linear-gradient(90deg, rgba(11,16,28,0.76) 0%, rgba(132,157,158,0.14) 44%, rgba(3,20,49,0.9) 100%), linear-gradient(180deg, rgba(167,196,194,0.24) 0%, rgba(0,0,0,0.16) 100%)",
];

function getGradientOverlay(title: string) {
  const seed = Array.from(title).reduce(
    (total, character) => total + character.charCodeAt(0),
    0,
  );

  return gradientOverlays[seed % gradientOverlays.length];
}

function splitTitle(title: string) {
  const words = title.trim().split(/\s+/).filter(Boolean);

  if (words.length <= 1) {
    return {
      primary: title,
      accent: "",
    };
  }

  const accent = words[words.length - 1];
  const primary = words.slice(0, -1).join(" ");

  return { primary, accent };
}

export default function KronusContactHero({
  title,
  paragraph,
  backgroundImage = defaultBackgroundImage,
  menuLabel = "Menu",
  contactLabel = "Contact us",
  className = "",
  onMenuClick,
  onContactClick,
}: KronusContactHeroProps) {
  const { primary, accent } = splitTitle(title);
  const gradientOverlay = getGradientOverlay(title);

  return (
    <section
      className={`relative isolate overflow-hidden bg-[#08121a] text-white ${className}`.trim()}
      aria-label={title}
    >
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `${gradientOverlay}, url(${backgroundImage})`,
          backgroundPosition: "center center",
        }}
      />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(144,206,203,0.22),transparent_30%),radial-gradient(circle_at_top_center,rgba(255,255,255,0.12),transparent_28%)]" />

      <div className="relative z-10 mx-auto flex min-h-[34rem] max-w-[1720px] flex-col px-5 pb-12 pt-6 sm:px-8 md:px-10 lg:min-h-[43.3125rem] lg:px-14 lg:pb-16 lg:pt-8">
        <div className="flex items-start justify-between gap-6">
          <button
            type="button"
            onClick={onMenuClick}
            className="group inline-flex items-center gap-5 text-left transition-opacity hover:opacity-90"
            aria-label="Open navigation menu"
          >
            <span className="grid h-[4.25rem] w-[4.25rem] place-items-center border border-white/20 bg-[#f2ede6] shadow-[0_8px_30px_rgba(0,0,0,0.18)]">
              <img
                src={menuIcon}
                alt=""
                className="h-6 w-6"
                aria-hidden="true"
              />
            </span>
            <span className="text-lg uppercase tracking-[0.08em] text-white/95 sm:text-[1.55rem]">
              {menuLabel}
            </span>
          </button>

          <button
            type="button"
            onClick={onContactClick}
            className="inline-flex min-h-[4.25rem] items-center justify-center border border-black bg-[#f3ede3] px-5 text-center text-sm font-medium uppercase tracking-[0.08em] text-black underline decoration-[1.5px] underline-offset-[0.32em] shadow-[0_8px_30px_rgba(0,0,0,0.16)] transition-transform hover:-translate-y-0.5 sm:px-8 sm:text-[1.05rem]"
          >
            {contactLabel}
          </button>
        </div>

        <div className="flex flex-1 items-center justify-center py-12 sm:py-14 lg:py-16">
          <div className="w-full text-center">
            <div className="mb-8 flex justify-center md:hidden"></div>

            <h1 className="text-[clamp(3.4rem,7.2vw,6.35rem)] uppercase leading-[0.9] tracking-[-0.055em] text-white">
              {primary ? (
                <span className="font-sans font-semibold">{primary} </span>
              ) : null}
              {accent ? (
                <span className="font-serif font-light italic tracking-[-0.05em] text-white/94">
                  {accent}
                </span>
              ) : (
                <span className="font-sans font-semibold">{title}</span>
              )}
            </h1>

            {paragraph ? (
              <p className="mx-auto mt-10 max-w-[84rem] text-balance px-2 text-[clamp(1.15rem,2vw,2.05rem)] leading-[1.45] tracking-[-0.02em] text-white/92 sm:px-6 lg:mt-12 lg:max-w-[92rem]">
                {paragraph}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
