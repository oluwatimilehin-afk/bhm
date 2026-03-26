import { useEffect, useId, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router";
import menuIcon from "../assets/menu-icon.svg";
import { siteNav } from "../content/bhm";
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
      const items = itemRefs.current.filter(Boolean) as HTMLElement[];

      if (!menu || !button || !iconWrapper || !items.length) {
        return;
      }

      const matchMedia = gsap.matchMedia();

      matchMedia.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(menu, { clearProps: "all" });
        gsap.set(button, { clearProps: "transform" });
        gsap.set(iconWrapper, { clearProps: "transform" });
        gsap.set(items, { clearProps: "all" });
      });

      matchMedia.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(menu, {
          autoAlpha: 0,
          y: -10,
          scale: 0.98,
          pointerEvents: "none",
          transformOrigin: "top left",
        });
        gsap.set(items, { autoAlpha: 0, y: 10 });

        const timeline = gsap.timeline({ paused: true });

        timeline
          .to(
            menu,
            {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              pointerEvents: "auto",
              duration: 0.26,
              ease: MOTION.ease.out,
            },
            0,
          )
          .to(
            button,
            {
              y: -2,
              duration: 0.24,
              ease: MOTION.ease.smooth,
            },
            0,
          )
          .to(
            iconWrapper,
            {
              rotate: 90,
              scale: 0.94,
              duration: 0.26,
              ease: MOTION.ease.out,
            },
            0,
          )
          .to(
            items,
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.24,
              stagger: 0.04,
              ease: MOTION.ease.out,
            },
            0.04,
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
        className="pointer-events-none absolute left-0 top-full mt-3 w-[min(15rem,calc(100vw-2.5rem))] overflow-hidden rounded-[1.25rem] border border-white/12 bg-[rgba(9,19,25,0.96)] p-2 text-white opacity-0 shadow-[0_18px_42px_rgba(0,0,0,0.28)] backdrop-blur-md"
      >
        <div className="space-y-1">
          {siteNav.map((item, index) => (
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
                  "group flex items-center justify-between rounded-[0.95rem] border px-3 py-3 text-sm transition-colors",
                  isActive
                    ? "border-[#e8dfd3] bg-[#f3ede3] text-[#0f1820]"
                    : "border-transparent bg-transparent text-white/88 hover:border-white/12 hover:bg-white/6",
                ].join(" ")
              }
            >
              {({ isActive }) => (
                <>
                  <span
                    className={[
                      "font-medium uppercase tracking-[0.08em]",
                      isActive ? "text-[#111922]" : "text-white/92",
                    ].join(" ")}
                  >
                    {item.label}
                  </span>

                  <span
                    className={[
                      "text-xs uppercase tracking-[0.18em]",
                      isActive ? "text-[#5f6d75]" : "text-white/42",
                    ].join(" ")}
                  >
                    0{index + 1}
                  </span>
                </>
              )}
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  );
}
