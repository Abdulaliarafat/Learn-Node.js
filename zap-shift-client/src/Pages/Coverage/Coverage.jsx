import { useLoaderData } from "react-router";
import MapView from "./MapView";

const Coverage = () => {
    const districtBranches = useLoaderData()
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-4">We are available in 64 districts</h2>
      <MapView districtBranches={districtBranches}/>
    </div>
  );
};

export default Coverage;
