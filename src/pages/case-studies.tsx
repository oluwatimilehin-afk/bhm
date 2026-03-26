import KronusContactHero from "../components/KronusContactHero";
import KronusCaseStudiesIntroSection from "../components/KronusCaseStudiesIntroSection";
import KronusCaseStudiesListSection from "../components/KronusCaseStudiesListSection";
import { caseStudiesPageContent } from "../content/bhm";

const CaseStudies = () => {
  return (
    <>
      <KronusContactHero
        title={caseStudiesPageContent.heroTitle}
        paragraph={caseStudiesPageContent.heroParagraph}
        actionLabel="Contact BHM"
        actionHref="/contact-us"
      />
      <KronusCaseStudiesIntroSection {...caseStudiesPageContent.intro} />
      <KronusCaseStudiesListSection
        caseStudies={caseStudiesPageContent.studies}
      />
    </>
  );
};

export default CaseStudies;
