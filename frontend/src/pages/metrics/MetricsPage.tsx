import { useParams } from "react-router-dom";

const MetricsPage = () => {
  const { type } = useParams();

  const metricsTitle = type ? 
    type.charAt(0).toUpperCase() + type.slice(1) + " Metrics" :
    "Metrics";

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">{metricsTitle}</h1>
      <div className="bg-card rounded-lg p-6">
        <p>{metricsTitle} feature coming soon...</p>
      </div>
    </>
  );
};

export default MetricsPage; 