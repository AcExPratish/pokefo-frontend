import React from "react";
import { updateDocumentTitle } from "../../../utils/helpers";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useNavigate } from "react-router-dom";

const Success = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    updateDocumentTitle("Successful Verification");
  }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-4 h-screen w-full font-semibold text-4xl text-white">
      <span className="text-9xl text-lime-500 animate-bounce cursor-pointer">
        <CheckCircleIcon color="inherit" fontSize="inherit" />
      </span>
      <span className="flex items-center justify-center gap-2 w-full pointer-events-none">
        <span>You have been</span>
        <span className="text-lime-500 bg-neutral-800 p-4 bg-opacity-70 rounded-lg">
          successfully verified!
        </span>
      </span>
      <button
        className="flex items-center justify-center gap-4 font-semibold text-7xl transition ease-in-out group"
        onClick={() => navigate("/")}
      >
        <span className="text-lime-500 group-hover:text-white transition ease-in-out">
          Go
        </span>
        <span className="text-white group-hover:text-lime-500 transition ease-in-out">
          Back
        </span>
      </button>
    </div>
  );
};

export default Success;
