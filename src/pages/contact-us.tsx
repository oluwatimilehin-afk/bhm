import KronusContactHero from "../components/KronusContactHero";
import KronusContactFormSection from "../components/KronusContactFormSection";
import { contactPageContent } from "../content/bhm";

const ContactUs = () => {
  return (
    <>
      <KronusContactHero
        title={contactPageContent.heroTitle}
        paragraph={contactPageContent.heroParagraph}
        actionLabel={contactPageContent.heroActionLabel}
        actionHref={contactPageContent.heroActionHref}
      />
      <KronusContactFormSection />
    </>
  );
};

export default ContactUs;
