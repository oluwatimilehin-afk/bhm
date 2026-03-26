type ServiceItem = {
  title: string;
  emphasis: string;
  href?: string;
};

const services: ServiceItem[] = [
  {
    title: "Public Relations &",
    emphasis: "Crisis Communications",
    href: "#public-relations",
  },
  {
    title: "Narrative",
    emphasis: "Intelligence",
    href: "#narrative-intelligence",
  },
  {
    title: "Digital Reputation",
    emphasis: "Management",
    href: "#digital-reputation",
  },
];

function ArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-8 w-8 text-[#23170f] sm:h-10 sm:w-10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6 18L18 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="square"
      />
      <path
        d="M9 6H18V15"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="square"
      />
    </svg>
  );
}

function ServiceCard({ title, emphasis, href }: ServiceItem) {
  return (
    <a
      href={href}
      className="group flex min-h-20 flex-col justify-between border-b border-[#9c9388] pb-6 text-[#23170f] transition-opacity duration-200 hover:opacity-75"
    >
      <div className="flex justify-end">
        <span className="inline-flex items-center justify-center">
          <ArrowIcon />
        </span>
      </div>

      <div className="pr-6">
        <h3 className="text-[1.7rem] font-medium leading-[1.02] tracking-[-0.04em] sm:text-[1.55rem]">
          {title}
        </h3>
        <p className="mt-2 font-serif text-[1.7rem] font-light italic leading-[1.02] tracking-[-0.04em] sm:text-[1.55rem]">
          {emphasis}
        </p>
      </div>
    </a>
  );
}

export default function KronusIntegratedSection() {
  return (
    <section className="bg-[#ece8e2] px-5 py-20 text-[#23170f] sm:px-8 md:px-10 lg:px-14 lg:py-28 xl:py-32">
      <div className="mx-auto max-w-[1620px]">
        <div className="mx-auto max-w-232 text-center">
          <p className="text-balance text-[1.05rem] leading-none tracking-[-0.04em] sm:text-[1.7rem] md:text-[1.9rem]">
            A Public Relations Firm Built For More
          </p>

          <h2 className="mt-6 text-balance leading-[0.92] tracking-[-0.065em] text-[#1d130d]">
            <span className="font-sans text-[clamp(2.5rem,6.2vw,5.2rem)] font-semibold">
              Integrated
            </span>
            <span className="ml-2 font-serif text-[clamp(2.5rem,6.2vw,5.2rem)] font-light italic">
              For Dominance
            </span>
          </h2>

          <p className="mx-auto mt-8 max-w-180 text-balance text-[1rem] leading-[1.45] tracking-[-0.025em] text-[#3d3129] sm:text-[1.2rem] md:text-[1.4rem]">
            In an era of noise, being heard is a baseline — being understood is
            the win.
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:mt-24 lg:grid-cols-3 lg:gap-0">
          {services.map((service, index) => (
            <div
              key={service.title}
              className={
                index === 0
                  ? ""
                  : "lg:border-l lg:border-[#9c9388] lg:pl-9 xl:pl-10"
              }
            >
              <ServiceCard {...service} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
