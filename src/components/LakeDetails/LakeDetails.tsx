import React from 'react';
import { useNavigate } from 'react-router-dom';


interface ImageData {
  uri: string;
  latitude: number;
  longitude: number;
}

interface QuestionData {
  subQuestion: string | null;
  question: string;
  answer: string;
  images: ImageData[];
  _id: string;
}

interface LakeData {
  _id: string;
  madai: string;
  lakeName: string;
  questions: QuestionData[];
  userId: string;
  timestamp: string;
}

const LakeDetails: React.FC<{ data: LakeData }> = ({ data }) => {
    const navigate = useNavigate();
    
    const handleViewDetails = () => {
        navigate(`/lake/${data._id}`);
}
    return(
  
  <>
  <div className="bg-white p-4 rounded-lg shadow-md mb-4">
  <h2 className="text-xl font-bold">{`MADAI - ${data.madai}`}</h2>
  <p className="text-lg">{`Lake Name: ${data.lakeName}`}</p>
  <p className="text-sm text-gray-500">{new Date(data.timestamp).toLocaleString()}</p>
  <button 
    onClick={handleViewDetails} 
    className="mt-2 px-4 py-2 bg-Indigo-500 text-white rounded hover:bg-Indigo-600"
  >
    View Details
  </button>
</div>
</>
);
}

export default LakeDetails;
