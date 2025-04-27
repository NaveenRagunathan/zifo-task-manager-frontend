import { useParams } from "react-router-dom";

const ToolPage = () => {
  const { tool } = useParams();

  const toolTitle = tool ? 
    tool.charAt(0).toUpperCase() + tool.slice(1) :
    "Tool";

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">{toolTitle}</h1>
      <div className="bg-card rounded-lg p-6">
        <p>{toolTitle} feature coming soon...</p>
      </div>
    </>
  );
};

export default ToolPage; 