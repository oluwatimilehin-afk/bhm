import KronusContactHero from "../components/KronusContactHero";
import KronusCaseStudiesIntroSection from "../components/KronusCaseStudiesIntroSection";
import KronusCaseStudiesListSection, {
  type KronusCaseStudy,
} from "../components/KronusCaseStudiesListSection";
import { caseStudiesPageContent } from "../content/bhm";

const CaseStudies = () => {
  const caseStudies: KronusCaseStudy[] = caseStudiesPageContent.studies.map(
    (study) => ({
      id: study.id,
      image: study.image,
      imageAlt: study.imageAlt,
      title: study.title,
      meta: [study.client, study.format].filter(Boolean),
      challengeQuote: study.campaign,
      whatWeDidLabel: "Asset Format:",
      whatWeDid: study.format,
      result: study.assetLabel,
      href: study.assetUrl,
    }),
  );

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
        caseStudies={caseStudies}
      />
    </>
  );
};

export default CaseStudies;
