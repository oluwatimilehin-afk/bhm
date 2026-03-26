import { useEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router";
import KronusFooter from "../components/KronusFooter";
import { gsap, useGSAP } from "../lib/gsap";
import { MOTION, scheduleScrollRefresh } from "../lib/kronusMotion";

const AppLayout = () => {
  const layoutRef = useRef<HTMLElement>(null);
  const location = useLocation();

  useGSAP(
    () => {
      const matchMedia = gsap.matchMedia();

      matchMedia.add("(prefers-reduced-motion: reduce)", () => {
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
        gsap.set("[data-kronus-route-shell]", { autoAlpha: 1, clearProps: "all" });
      });

      matchMedia.add("(prefers-reduced-motion: no-preference)", () => {
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });

        gsap.fromTo(
          "[data-kronus-route-shell]",
          {
            autoAlpha: 0,
            y: MOTION.distance.pageEnter,
            filter: "blur(14px)",
          },
          {
            autoAlpha: 1,
            y: 0,
            filter: "blur(0px)",
            duration: MOTION.duration.route,
            ease: MOTION.ease.out,
            clearProps: "filter",
          },
        );
      });

      scheduleScrollRefresh();

      return () => {
        matchMedia.revert();
      };
    },
    {
      scope: layoutRef,
      dependencies: [location.pathname],
      revertOnUpdate: true,
    },
  );

  useEffect(() => {
    scheduleScrollRefresh();
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen flex-col">
      <main
        ref={layoutRef}
        className="flex-1"
      >
        <div
          key={location.pathname}
          data-kronus-route-shell
        >
          <Outlet />
        </div>
      </main>
      <KronusFooter />
    </div>
  );
};

export default AppLayout;
