import { Navigate } from "react-router-dom";
import LoadingSpinner from "../components/Shared/LoadingSpinner";
import UseRole from "../hooks/UseRole";

const SellerRoute = ({ children }) => {
  const [role, isLoading] = UseRole();

  if (isLoading) return <LoadingSpinner />;
  if (role === "seller") return children;
  return <Navigate to="/dashboard" replace="true" />;
};

export default SellerRoute;
