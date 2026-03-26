import { useEffect, useId, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router";
import menuIcon from "../assets/menu-icon.svg";
import { gsap, useGSAP } from "../lib/gsap";
import { MOTION } from "../lib/kronusMotion";

type KronusMenuButtonProps = {
  label?: string;
  buttonClassName: string;
  iconWrapperClassName: string;
  labelClassName: string;
  iconClassName?: string;
  onMenuClick?: () => void;
};

type MenuItem = {
  eyebrow: string;
  label: string;
  to: string;
  description: string;
};

const menuItems: MenuItem[] = [
  {
    eyebrow: "Overview",
    label: "Home",
    to: "/",
    description: "Return to the main Kronus story and service overview.",
  },
  {
    eyebrow: "Selected Work",
    label: "Case Studies",
    to: "/case-studies",
    description: "Review high-stakes communications and reputation outcomes.",
  },
  {
    eyebrow: "Direct Access",
    label: "Contact Us",
    to: "/contact-us",
    description: "Open a confidential conversation with the team.",
  },
];

export default function KronusMenuButton({
  label = "Menu",
  buttonClassName,
  iconWrapperClassName,
  labelClassName,
  iconClassName = "h-5 w-5",
  onMenuClick,
}: KronusMenuButtonProps) {
  const [openPathname, setOpenPathname] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const iconWrapperRef = useRef<HTMLSpanElement>(null);
  const menuRef = useRef<HTMLElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const location = useLocation();
  const menuId = useId();
  const isOpen = openPathname === location.pathname;

  useGSAP(
    () => {
      const menu = menuRef.current;
      const button = buttonRef.current;
      const iconWrapper = iconWrapperRef.current;
      const intro = introRef.current;
      const items = itemRefs.current.filter(Boolean) as HTMLElement[];

      if (!menu || !button || !iconWrapper || !intro || !items.length) {
        return;
      }

      const matchMedia = gsap.matchMedia();

      matchMedia.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(menu, { clearProps: "all" });
        gsap.set(button, { clearProps: "transform" });
        gsap.set(iconWrapper, { clearProps: "transform" });
        gsap.set(intro, { clearProps: "all" });
        gsap.set(items, { clearProps: "all" });
      });

      matchMedia.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(menu, {
          autoAlpha: 0,
          y: -18,
          pointerEvents: "none",
          transformOrigin: "top left",
        });
        gsap.set(intro, { autoAlpha: 0, y: 12 });
        gsap.set(items, { autoAlpha: 0, y: 18 });

        const timeline = gsap.timeline({ paused: true });

        timeline
          .to(
            menu,
            {
              autoAlpha: 1,
              y: 0,
              pointerEvents: "auto",
              duration: 0.38,
              ease: MOTION.ease.out,
            },
            0,
          )
          .to(
            button,
            {
              y: -2,
              duration: 0.3,
              ease: MOTION.ease.smooth,
            },
            0,
          )
          .to(
            iconWrapper,
            {
              rotate: 90,
              scale: 0.96,
              duration: 0.38,
              ease: MOTION.ease.out,
            },
            0,
          )
          .to(
            intro,
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.34,
              ease: MOTION.ease.out,
            },
            0.08,
          )
          .to(
            items,
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.42,
              stagger: MOTION.stagger.tight,
              ease: MOTION.ease.out,
            },
            0.12,
          );

        timelineRef.current = timeline;

        return () => {
          timeline.kill();
          timelineRef.current = null;
        };
      });

      return () => {
        matchMedia.revert();
      };
    },
    { scope: containerRef },
  );

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reducedMotion) {
      gsap.set(menuRef.current, {
        autoAlpha: isOpen ? 1 : 0,
        y: 0,
        pointerEvents: isOpen ? "auto" : "none",
      });
      gsap.set(buttonRef.current, { y: 0 });
      gsap.set(iconWrapperRef.current, {
        rotate: isOpen ? 90 : 0,
        scale: isOpen ? 0.96 : 1,
      });
      return;
    }

    const timeline = timelineRef.current;

    if (!timeline) {
      return;
    }

    if (isOpen) {
      timeline.play(0);
    } else {
      timeline.reverse();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function handlePointerDown(event: PointerEvent) {
      if (containerRef.current?.contains(event.target as Node)) {
        return;
      }

      setOpenPathname(null);
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpenPathname(null);
      }
    }

    window.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  function toggleMenu() {
    setOpenPathname((current) =>
      current === location.pathname ? null : location.pathname,
    );
    onMenuClick?.();
  }

  return (
    <div
      ref={containerRef}
      className="relative z-30"
    >
      <button
        ref={buttonRef}
        type="button"
        onClick={toggleMenu}
        className={buttonClassName}
        aria-expanded={isOpen}
        aria-controls={menuId}
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
      >
        <span
          ref={iconWrapperRef}
          className={iconWrapperClassName}
        >
          <img
            src={menuIcon}
            alt=""
            className={iconClassName}
            aria-hidden="true"
          />
        </span>
        <span className={labelClassName}>{label}</span>
      </button>

      <nav
        ref={menuRef}
        id={menuId}
        aria-label="Primary"
        aria-hidden={!isOpen}
        className="pointer-events-none absolute left-0 top-full mt-5 w-[min(24rem,calc(100vw-2.5rem))] overflow-hidden border border-white/18 bg-[linear-gradient(180deg,rgba(7,16,22,0.98)_0%,rgba(10,23,31,0.96)_56%,rgba(18,40,48,0.94)_100%)] p-4 text-white opacity-0 shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-md sm:p-5"
      >
        <div
          ref={introRef}
          className="rounded-[1.75rem] border border-white/10 bg-white/6 p-4 sm:p-5"
        >
          <p className="text-[0.68rem] uppercase tracking-[0.28em] text-[#b7cbcd]">
            Kronus Communications
          </p>
          <p className="mt-3 max-w-[14rem] font-serif text-[1.9rem] leading-[0.92] tracking-[-0.06em] text-[#f2ede6]">
            Navigate the conversation.
          </p>
        </div>

        <div className="mt-4 space-y-3">
          {menuItems.map((item, index) => (
            <NavLink
              key={item.to}
              ref={(element) => {
                itemRefs.current[index] = element;
              }}
              to={item.to}
              tabIndex={isOpen ? 0 : -1}
              onClick={() => setOpenPathname(null)}
              className={({ isActive }) =>
                [
                  "group block rounded-[1.5rem] border px-4 py-4 transition-colors sm:px-5",
                  isActive
                    ? "border-[#efe7dc] bg-[#f3ede3] text-[#0f1820]"
                    : "border-white/10 bg-white/5 hover:border-white/25 hover:bg-white/10",
                ].join(" ")
              }
            >
              {({ isActive }) => (
                <>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p
                        className={[
                          "text-[0.68rem] uppercase tracking-[0.24em]",
                          isActive ? "text-[#63727b]" : "text-white/55",
                        ].join(" ")}
                      >
                        {item.eyebrow}
                      </p>
                      <p className="mt-2 font-serif text-[1.45rem] leading-none tracking-[-0.05em]">
                        {item.label}
                      </p>
                    </div>

                    <span
                      className={[
                        "mt-1 text-[0.78rem] uppercase tracking-[0.18em]",
                        isActive ? "text-[#7a878d]" : "text-white/38",
                      ].join(" ")}
                    >
                      0{index + 1}
                    </span>
                  </div>

                  <p
                    className={[
                      "mt-3 max-w-[15rem] text-sm leading-6",
                      isActive ? "text-[#49575f]" : "text-white/72",
                    ].join(" ")}
                  >
                    {item.description}
                  </p>
                </>
              )}
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  );
}
