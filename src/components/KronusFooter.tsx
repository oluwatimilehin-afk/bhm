import { useRef } from "react";
import { Link } from "react-router";
import { companyInfo, footerContent } from "../content/bhm";
import { gsap, useGSAP } from "../lib/gsap";
import { addHoverTargets, MOTION } from "../lib/kronusMotion";

type FooterLink = {
  label: string;
  href: string;
};

function SocialIcon({
  kind,
}: {
  kind: "facebook" | "instagram" | "linkedin" | "x" | "youtube";
}) {
  if (kind === "facebook") {
    return (
      <svg
        viewBox="0 0 24 24"
        className="h-6 w-6"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.099 4.388 23.093 10.125 24v-8.438H7.078v-3.49h3.047V9.413c0-3.021 1.792-4.688 4.533-4.688 1.313 0 2.686.235 2.686.235v2.969h-1.514c-1.491 0-1.956.931-1.956 1.887v2.266h3.328l-.532 3.49h-2.796V24C19.612 23.093 24 18.099 24 12.073Z" />
      </svg>
    );
  }

  if (kind === "instagram") {
    return (
      <svg
        viewBox="0 0 24 24"
        className="h-6 w-6"
        fill="none"
        aria-hidden="true"
      >
        <rect
          x="3.2"
          y="3.2"
          width="17.6"
          height="17.6"
          rx="4.6"
          stroke="currentColor"
          strokeWidth="2.1"
        />
        <circle
          cx="12"
          cy="12"
          r="4.1"
          stroke="currentColor"
          strokeWidth="2.1"
        />
        <circle
          cx="17.6"
          cy="6.5"
          r="1.2"
          fill="currentColor"
        />
      </svg>
    );
  }

  if (kind === "linkedin") {
    return (
      <svg
        viewBox="0 0 24 24"
        className="h-6 w-6"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M4.98 3.5C4.98 4.88 3.87 6 2.49 6S0 4.88 0 3.5 1.11 1 2.49 1s2.49 1.12 2.49 2.5ZM.5 8h3.98v12H.5V8Zm7.12 0h3.81v1.64h.06c.53-1.01 1.83-2.08 3.77-2.08 4.03 0 4.77 2.65 4.77 6.1V20h-3.97v-5.6c0-1.34-.02-3.06-1.87-3.06-1.88 0-2.17 1.46-2.17 2.97V20H7.62V8Z" />
      </svg>
    );
  }

  if (kind === "youtube") {
    return (
      <svg
        viewBox="0 0 24 24"
        className="h-6 w-6"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M23.5 7.2A3.1 3.1 0 0 0 21.3 5c-1.9-.5-9.3-.5-9.3-.5S4.6 4.5 2.7 5A3.1 3.1 0 0 0 .5 7.2 32.9 32.9 0 0 0 0 12a32.9 32.9 0 0 0 .5 4.8A3.1 3.1 0 0 0 2.7 19c1.9.5 9.3.5 9.3.5s7.4 0 9.3-.5a3.1 3.1 0 0 0 2.2-2.2A32.9 32.9 0 0 0 24 12a32.9 32.9 0 0 0-.5-4.8ZM9.6 15.4V8.6L15.6 12l-6 3.4Z" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      className="h-6 w-6"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M6 5L18 19"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M18 5L6 19"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function FooterAnchor({
  href,
  label,
}: FooterLink) {
  const className =
    "text-[1rem] leading-[1.35] tracking-[-0.03em] text-[#f1ece5]/94 transition-opacity hover:opacity-70 sm:text-[1.15rem]";

  if (href.startsWith("/")) {
    return (
      <Link
        to={href}
        data-footer-interactive
        className={className}
      >
        {label}
      </Link>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      data-footer-interactive
      className={className}
    >
      {label}
    </a>
  );
}

function LinkColumn({
  title,
  links,
  maxWidthClass = "",
}: {
  title: string;
  links: FooterLink[];
  maxWidthClass?: string;
}) {
  return (
    <div
      data-footer-group
      className={maxWidthClass}
    >
      <h3 className="text-[1rem] font-medium uppercase tracking-[0.05em] text-[#f4efe7] sm:text-[1.15rem]">
        {title}
      </h3>
      <ul className="mt-7 space-y-5">
        {links.map((link) => (
          <li key={link.label}>
            <FooterAnchor {...link} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function KronusFooter() {
  const footerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const matchMedia = gsap.matchMedia();

      matchMedia.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(
          ["[data-footer-group]", "[data-footer-bottom]", "[data-footer-divider]"],
          { autoAlpha: 1, clearProps: "all" },
        );
      });

      matchMedia.add("(prefers-reduced-motion: no-preference)", () => {
        const cleanupHover = addHoverTargets(
          footerRef.current?.querySelectorAll("[data-footer-interactive]") ?? [],
          { y: -4, scale: 1.012 },
        );

        gsap.timeline({
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 88%",
            once: true,
          },
          defaults: { ease: MOTION.ease.out },
        })
          .from(
            "[data-footer-group]",
            {
              y: MOTION.distance.itemEnter,
              autoAlpha: 0,
              duration: 0.72,
              stagger: MOTION.stagger.medium,
            },
            0,
          )
          .from(
            "[data-footer-divider]",
            {
              scaleX: 0,
              transformOrigin: "left center",
              duration: 0.56,
            },
            0.28,
          )
          .from(
            "[data-footer-bottom]",
            {
              y: 20,
              autoAlpha: 0,
              duration: 0.62,
            },
            0.36,
          );

        return () => {
          cleanupHover();
        };
      });

      return () => {
        matchMedia.revert();
      };
    },
    { scope: footerRef },
  );

  return (
    <footer
      ref={footerRef}
      className="overflow-hidden bg-[#090603] text-[#f5efe7]"
    >
      <div className="relative isolate">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_24%_24%,rgba(166,138,93,0.28),transparent_18%),linear-gradient(90deg,rgba(0,0,0,0.96)_0%,rgba(72,58,39,0.9)_24%,rgba(120,103,74,0.26)_37%,rgba(29,21,12,0.9)_49%,rgba(0,0,0,0.97)_62%,rgba(0,0,0,1)_100%)]" />

        <div className="relative mx-auto max-w-[1720px] px-5 py-16 sm:px-8 md:px-10 lg:px-14 lg:py-20 xl:py-24">
          <div className="grid gap-14 xl:grid-cols-[minmax(0,1.18fr)_minmax(0,0.48fr)_minmax(0,0.62fr)_minmax(0,0.9fr)] xl:gap-16">
            <div
              data-footer-group
              className="max-w-[35rem]"
            >
              <p className="max-w-[30rem] text-[2rem] font-semibold leading-[0.95] tracking-[-0.06em] text-[#f5efe7] sm:text-[2.4rem]">
                {companyInfo.name}
              </p>

              <p className="mt-8 max-w-[32rem] text-balance text-[1.05rem] leading-[1.5] tracking-[-0.03em] text-[#f3ede6]/92 sm:text-[1.22rem] lg:mt-10 lg:text-[1.35rem]">
                {footerContent.summary}
              </p>

              <div className="mt-8 space-y-3 text-[1rem] leading-[1.45] tracking-[-0.02em] text-[#efe7dd]/88 sm:text-[1.08rem]">
                {companyInfo.phones.map((phone) => (
                  <a
                    key={phone.label}
                    href={phone.href}
                    data-footer-interactive
                    className="block transition-opacity hover:opacity-70"
                  >
                    {phone.label}: {phone.value}
                  </a>
                ))}
                <a
                  href={`mailto:${companyInfo.email}`}
                  data-footer-interactive
                  className="block transition-opacity hover:opacity-70"
                >
                  {companyInfo.email}
                </a>
              </div>
            </div>

            <LinkColumn
              title="This Site"
              links={footerContent.localLinks}
              maxWidthClass="max-w-[14rem]"
            />

            <LinkColumn
              title="BHM Pages"
              links={footerContent.bhmLinks}
              maxWidthClass="max-w-[22rem]"
            />

            <div
              data-footer-group
              className="max-w-[30rem] xl:justify-self-end"
            >
              <h3 className="text-[1rem] font-medium uppercase tracking-[0.05em] text-[#f4efe7] sm:text-[1.15rem]">
                Offices
              </h3>

              <div className="mt-7 space-y-5">
                {companyInfo.offices.map((office) => (
                  <p
                    key={office.label}
                    className="text-[1rem] leading-[1.45] tracking-[-0.02em] text-[#f3ede6]/92 sm:text-[1.1rem]"
                  >
                    <span className="font-semibold text-[#f8f2eb]">
                      {office.label}
                    </span>{" "}
                    {office.address}
                  </p>
                ))}
              </div>
            </div>
          </div>

          <div
            data-footer-divider
            className="mt-14 h-px w-full bg-[#b39d79]/70 lg:mt-16"
          />

          <div
            data-footer-bottom
            className="mt-9 flex flex-col gap-8 lg:mt-10 lg:flex-row lg:items-center lg:justify-between lg:gap-10"
          >
            <div className="text-[0.9rem] leading-[1.4] tracking-[-0.02em] text-[#efe7dd]/92 sm:text-[1.05rem]">
              &copy; 2026 BHM. A BHM Holdings Company.
            </div>

            <div className="flex flex-wrap items-center gap-x-10 gap-y-4 lg:flex-1 lg:justify-center">
              {footerContent.resourceLinks.map((link) => (
                <FooterAnchor
                  key={link.label}
                  {...link}
                />
              ))}
            </div>

            <div className="flex items-center gap-7 text-[#f6efe5] sm:gap-8">
              {companyInfo.socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  data-footer-interactive
                  className="transition-opacity hover:opacity-70"
                >
                  <SocialIcon kind={social.kind} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
