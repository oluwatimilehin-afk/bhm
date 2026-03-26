import KronusHeader from "../components/KronusHeader";
import KronusIntegratedSection from "../components/KronusIntegratedSection";
import KronusRecognitionSection from "../components/KronusRecognitionSection";
import KronusWorkWithSection from "../components/KronusWorkWithSection"

const Home = () => {
  return (
    <>
      <KronusHeader />
      <KronusIntegratedSection />
      <KronusWorkWithSection/>  
      <KronusRecognitionSection />
    </>
  );
};

export default Home;
