import { useEffect, type RefObject } from "react";
import { gsap, ScrollTrigger } from "./gsap";

export const MOTION = {
  duration: {
    route: 0.9,
    intro: 1,
    reveal: 0.82,
    hoverIn: 0.28,
    hoverOut: 0.38,
  },
  ease: {
    out: "power3.out",
    smooth: "power2.out",
  },
  distance: {
    pageEnter: 44,
    sectionEnter: 40,
    itemEnter: 28,
  },
  stagger: {
    tight: 0.06,
    medium: 0.1,
    wide: 0.14,
  },
} as const;

type HoverTargetOptions = {
  y?: number;
  scale?: number;
};

export function scheduleScrollRefresh() {
  if (typeof window === "undefined") {
    return;
  }

  window.requestAnimationFrame(() => {
    window.requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });
  });
}

export function addHoverTargets(
  targets: Iterable<Element>,
  { y = -6, scale = 1.015 }: HoverTargetOptions = {},
) {
  if (
    typeof window === "undefined" ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    return () => undefined;
  }

  const cleanup: Array<() => void> = [];

  for (const target of targets) {
    const element = target as HTMLElement;

    if (element instanceof HTMLButtonElement && element.disabled) {
      continue;
    }

    const activate = () => {
      gsap.to(element, {
        y,
        scale,
        duration: MOTION.duration.hoverIn,
        ease: MOTION.ease.smooth,
        overwrite: "auto",
      });
    };

    const press = () => {
      gsap.to(element, {
        y: Math.min(y + 2, -1),
        scale: Math.max(scale - 0.02, 0.985),
        duration: 0.16,
        ease: MOTION.ease.smooth,
        overwrite: "auto",
      });
    };

    const reset = () => {
      gsap.to(element, {
        y: 0,
        scale: 1,
        duration: MOTION.duration.hoverOut,
        ease: MOTION.ease.smooth,
        overwrite: "auto",
      });
    };

    element.addEventListener("pointerenter", activate);
    element.addEventListener("pointerleave", reset);
    element.addEventListener("focus", activate);
    element.addEventListener("blur", reset);
    element.addEventListener("pointerdown", press);
    element.addEventListener("pointerup", activate);
    element.addEventListener("pointercancel", reset);

    cleanup.push(() => {
      element.removeEventListener("pointerenter", activate);
      element.removeEventListener("pointerleave", reset);
      element.removeEventListener("focus", activate);
      element.removeEventListener("blur", reset);
      element.removeEventListener("pointerdown", press);
      element.removeEventListener("pointerup", activate);
      element.removeEventListener("pointercancel", reset);
    });
  }

  return () => {
    cleanup.forEach((removeListener) => removeListener());
  };
}

export function useRefreshOnImages(
  scopeRef: RefObject<HTMLElement | null>,
  dependencyKey = "",
) {
  useEffect(() => {
    const scope = scopeRef.current;

    if (!scope) {
      return;
    }

    const images = Array.from(scope.querySelectorAll("img"));

    if (!images.length) {
      scheduleScrollRefresh();
      return;
    }

    let refreshFrame: number | null = null;

    const refresh = () => {
      if (refreshFrame !== null) {
        window.cancelAnimationFrame(refreshFrame);
      }

      refreshFrame = window.requestAnimationFrame(() => {
        scheduleScrollRefresh();
      });
    };

    images.forEach((image) => {
      if (!image.complete) {
        image.addEventListener("load", refresh);
        image.addEventListener("error", refresh);
      }
    });

    refresh();

    return () => {
      images.forEach((image) => {
        image.removeEventListener("load", refresh);
        image.removeEventListener("error", refresh);
      });

      if (refreshFrame !== null) {
        window.cancelAnimationFrame(refreshFrame);
      }
    };
  }, [scopeRef, dependencyKey]);
}
