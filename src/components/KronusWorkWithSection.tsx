const partnerOutcomes = [
  'Secure Consistent Press\nCoverage',
  'Identify/Counter\nDigital Attacks',
  'Protect/Manage Your\nDigital Reputation',
  'Land Podcasts, Deals\n& Partnerships',
];

function OutcomeCard({ text, index }: { text: string; index: number }) {
  const isRightColumn = index % 2 === 1;
  const isBottomRow = index >= 2;

  return (
    <div
      className={[
        'min-h-[9.5rem] border-[#9e9489] pb-6 text-[#1d120c] sm:min-h-[11rem] lg:min-h-[11.5rem]',
        !isBottomRow ? 'border-b' : '',
        isRightColumn ? 'sm:pl-5 lg:pl-8' : 'sm:pr-5 lg:pr-8',
        isRightColumn ? 'sm:border-l' : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <p className="whitespace-pre-line font-serif text-[1.7rem] font-light italic leading-[0.98] tracking-[-0.055em] sm:text-[2rem] lg:text-[2.3rem]">
        {text}
      </p>
    </div>
  );
}

function FormField({
  label,
  placeholder,
  as = 'input',
}: {
  label: string;
  placeholder: string;
  as?: 'input' | 'textarea';
}) {
  const sharedClasses =
    'w-full border-0 border-b border-[#9e9489] bg-transparent px-0 pb-4 pt-4 text-[1.05rem] leading-[1.3] tracking-[-0.03em] text-[#23170f] placeholder:text-[#5d5047] focus:border-[#23170f] focus:outline-none sm:text-[1.2rem]';

  return (
    <label className="block">
      <span className="sr-only">{label}</span>
      {as === 'textarea' ? (
        <textarea
          name={label.toLowerCase().replace(/\s+/g, '-')}
          rows={2}
          placeholder={placeholder}
          className={`${sharedClasses} resize-none`}
        />
      ) : (
        <input
          type={label === 'Email' ? 'email' : 'text'}
          name={label.toLowerCase()}
          placeholder={placeholder}
          className={sharedClasses}
        />
      )}
    </label>
  );
}

export default function KronusWorkWithSection() {
  return (
    <section className="bg-[#ece8e2] px-5 py-20 text-[#1d120c] sm:px-8 md:px-10 lg:px-14 lg:py-28 xl:py-32">
      <div className="mx-auto grid max-w-[1620px] gap-16 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.02fr)] xl:gap-20">
        <div className="max-w-[47rem]">
          <h2 className="leading-[0.94] tracking-[-0.07em] text-[#140b07]">
            <span className="block font-sans text-[clamp(2.5rem,5vw,4.5rem)] font-semibold">
              We Work With
            </span>
            <span className="mt-1 block font-serif text-[clamp(2.35rem,4.8vw,4.25rem)] font-light italic">
              Companies &amp; Individuals
            </span>
          </h2>

          <p className="mt-7 max-w-[42rem] text-balance text-[1.15rem] leading-[1.45] tracking-[-0.03em] text-[#3c2f27] sm:text-[1.35rem] lg:text-[1.5rem]">
            From law firms and global corporations to high-profile executives and talent,
            we tailor our approach to meet the unique needs of every partner.
          </p>

          <div className="mt-12 grid gap-y-5 sm:grid-cols-2 sm:gap-x-0 sm:gap-y-5 lg:mt-14">
            {partnerOutcomes.map((item, index) => (
              <OutcomeCard key={item} text={item} index={index} />
            ))}
          </div>
        </div>

        <div className="max-w-[52rem] xl:pt-1">
          <h2 className="leading-[0.94] tracking-[-0.07em] text-[#140b07]">
            <span className="block font-sans text-[clamp(2.5rem,5vw,4.5rem)] font-semibold">
              Submit Your Info To
            </span>
            <span className="mt-1 block font-serif text-[clamp(2.4rem,4.9vw,4.25rem)] font-light italic">
              Work With Us!
            </span>
          </h2>

          <p className="mt-7 max-w-[45rem] text-balance text-[1.15rem] leading-[1.45] tracking-[-0.03em] text-[#3c2f27] sm:text-[1.35rem] lg:text-[1.5rem]">
            Our services are built on a deep understanding of both organizational goals and
            individual aspirations, ensuring a tailored fit for every client.
          </p>

          <form className="mt-10 space-y-8 lg:mt-12" onSubmit={(event) => event.preventDefault()}>
            <FormField label="Full Name" placeholder="Full Name" />
            <FormField label="Email" placeholder="Email" />
            <FormField
              label="Support Details"
              placeholder="Looking for personal or corporate support? Let us know how we can help."
              as="textarea"
            />

            <button
              type="submit"
              className="inline-flex min-h-[4.15rem] items-center justify-center border border-[#160d08] bg-[#120905] px-8 text-[0.88rem] font-medium uppercase tracking-[0.08em] text-[#f5efe7] shadow-[0_10px_24px_rgba(0,0,0,0.08)] transition-transform hover:-translate-y-0.5 sm:min-h-[4.55rem] sm:px-10 sm:text-[0.98rem]"
            >
              <span className="underline decoration-[1.5px] underline-offset-[0.38em]">Submit</span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
