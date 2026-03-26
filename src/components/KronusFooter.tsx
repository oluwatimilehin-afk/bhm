import { Link } from "react-router";

type FooterLink = {
  label: string;
  href: string;
};

const usefulLinks: FooterLink[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "#about" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Contact Us", href: "/contact-us" },
  { label: "Press & Blog", href: "#press" },
];

const services: FooterLink[] = [
  {
    label: "Public Relations & Crisis Communications",
    href: "#public-relations",
  },
  { label: "Narrative Intelligence", href: "#narrative-intelligence" },
  { label: "Digital Reputation Management", href: "#digital-reputation" },
  { label: "Talent Representation", href: "#talent-representation" },
];

const legalLinks: FooterLink[] = [
  { label: "Privacy Policy", href: "#privacy-policy" },
  { label: "Terms of Service", href: "#terms-of-service" },
  { label: "Cookies Settings", href: "#cookies-settings" },
];

function SocialIcon({
  kind,
}: {
  kind: "facebook" | "instagram" | "linkedin" | "x";
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

  return (
    <svg
      viewBox="0 0 24 24"
      className="h-6 w-6"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M4 4L20 20"
        stroke="currentColor"
        strokeWidth="2.1"
        strokeLinecap="round"
      />
      <path
        d="M20 4L4 20"
        stroke="currentColor"
        strokeWidth="2.1"
        strokeLinecap="round"
      />
    </svg>
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
    <div className={maxWidthClass}>
      <h3 className="text-[1rem] font-medium uppercase tracking-[0.05em] text-[#f4efe7] sm:text-[1.15rem]">
        {title}
      </h3>
      <ul className="mt-7 space-y-5">
        {links.map((link) => (
          <li key={link.label}>
            {link.href.startsWith("/") ? (
              <Link
                to={link.href}
                className="text-[1.05rem] leading-[1.35] tracking-[-0.03em] text-[#f1ece5]/94 transition-opacity hover:opacity-70 sm:text-[1.25rem]"
              >
                {link.label}
              </Link>
            ) : (
              <button
                type="button"
                disabled
                className="cursor-default text-[1.05rem] leading-[1.35] tracking-[-0.03em] text-[#f1ece5]/70 sm:text-[1.25rem]"
              >
                {link.label}
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function KronusFooter() {
  return (
    <footer className="overflow-hidden bg-[#090603] text-[#f5efe7]">
      <div className="relative isolate">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_24%_24%,rgba(166,138,93,0.28),transparent_18%),linear-gradient(90deg,rgba(0,0,0,0.96)_0%,rgba(72,58,39,0.9)_24%,rgba(120,103,74,0.26)_37%,rgba(29,21,12,0.9)_49%,rgba(0,0,0,0.97)_62%,rgba(0,0,0,1)_100%)]" />

        <div className="relative mx-auto max-w-[1720px] px-5 py-16 sm:px-8 md:px-10 lg:px-14 lg:py-20 xl:py-24">
          <div className="grid gap-14 xl:grid-cols-[minmax(0,1.18fr)_minmax(0,0.48fr)_minmax(0,0.62fr)_minmax(0,0.9fr)] xl:gap-16">
            <div className="max-w-[35rem]">
              <div className="flex flex-col items-start gap-8 sm:flex-row sm:items-end sm:gap-10 lg:gap-12"></div>

              <p className="mt-8 max-w-[32rem] text-balance text-[1.1rem] leading-[1.5] tracking-[-0.03em] text-[#f3ede6]/92 sm:text-[1.3rem] lg:mt-10 lg:text-[1.45rem]">
                Explore our sister company for deeper intelligence, risk
                management, security and logistics solutions.
              </p>
            </div>

            <LinkColumn
              title="Useful Links"
              links={usefulLinks}
              maxWidthClass="max-w-[14rem]"
            />

            <LinkColumn
              title="Services"
              links={services}
              maxWidthClass="max-w-[22rem]"
            />

            <div className="max-w-[28rem] xl:justify-self-end">
              <h3 className="text-[1rem] font-medium uppercase tracking-[0.05em] text-[#f4efe7] sm:text-[1.15rem]">
                Subscribe
              </h3>
              <p className="mt-7 max-w-[24rem] text-balance text-[1.05rem] leading-[1.45] tracking-[-0.03em] text-[#f3ede6]/92 sm:text-[1.25rem]">
                Subscribe for a first look at exclusive offers, industry
                insights, and updates.
              </p>

              <form
                className="mt-8"
                onSubmit={(event) => event.preventDefault()}
              >
                <label
                  className="sr-only"
                  htmlFor="footer-email"
                >
                  Enter your email
                </label>
                <div className="flex min-h-[4.4rem] items-stretch border-[3px] border-[#f4efe7] bg-[#ebe8e4] sm:min-h-[4.8rem] lg:min-h-[5rem]">
                  <input
                    id="footer-email"
                    type="email"
                    placeholder="Enter your email"
                    className="min-w-0 flex-1 bg-transparent px-5 text-[0.98rem] tracking-[-0.03em] text-[#2d2218] placeholder:text-[#6c625a] focus:outline-none sm:px-6 sm:text-[1.15rem]"
                  />
                  <button
                    type="submit"
                    className="grid w-[4.75rem] place-items-center bg-[#0c0805] text-[#f7f2eb] transition-colors hover:bg-[#19110b] sm:w-[5rem]"
                    aria-label="Submit email"
                  >
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      className="h-7 w-7"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4 12H19"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="square"
                      />
                      <path
                        d="M13 6L19 12L13 18"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="square"
                      />
                    </svg>
                  </button>
                </div>
              </form>

              <p className="mt-8 max-w-[27rem] text-[0.8rem] leading-[1.55] tracking-[-0.01em] text-[#e2d8cb]/90 sm:text-[0.9rem] lg:text-[0.95rem]">
                By subscribing you agree with our Privacy Policy and provide
                consent to receive updates from our company.
              </p>
            </div>
          </div>

          <div className="mt-14 h-px w-full bg-[#b39d79]/70 lg:mt-16" />

          <div className="mt-9 flex flex-col gap-8 lg:mt-10 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
            <div className="text-[0.9rem] leading-[1.4] tracking-[-0.02em] text-[#efe7dd]/92 sm:text-[1.05rem]">
              © 2025 Kronus Communications. All rights reserved.
            </div>

            <div className="flex flex-wrap items-center gap-x-10 gap-y-4 lg:flex-1 lg:justify-center">
              {legalLinks.map((link) => (
                <button
                  key={link.label}
                  type="button"
                  disabled
                  className="cursor-default text-[0.9rem] tracking-[-0.02em] text-[#efe7dd]/70 underline decoration-[1px] underline-offset-[0.5em] sm:text-[1.05rem]"
                >
                  {link.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-7 text-[#f6efe5] sm:gap-8">
              <button
                type="button"
                disabled
                aria-label="Facebook"
                className="cursor-default opacity-70"
              >
                <SocialIcon kind="facebook" />
              </button>
              <button
                type="button"
                disabled
                aria-label="Instagram"
                className="cursor-default opacity-70"
              >
                <SocialIcon kind="instagram" />
              </button>
              <button
                type="button"
                disabled
                aria-label="LinkedIn"
                className="cursor-default opacity-70"
              >
                <SocialIcon kind="linkedin" />
              </button>
              <button
                type="button"
                disabled
                aria-label="X"
                className="cursor-default opacity-70"
              >
                <SocialIcon kind="x" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
