import Filters from "../components/ui/puntos/Filter"
import MonthlySummary from "../components/ui/puntos/MonthlySummary"
import PointsSection from "../components/ui/puntos/PointsSection"

const PointsPage = () => {
  return (
    <div className="w-full ">
      <div className="max-w-7xl mx-auto px-6 py-8 space-y-10">
        <Filters />
        <MonthlySummary />
        <PointsSection />
      </div>
    </div>
  );
};

export default PointsPage;

