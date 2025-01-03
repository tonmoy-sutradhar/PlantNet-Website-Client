import Card from "./Card";
import Container from "../Shared/Container";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingSpinner from "../Shared/LoadingSpinner";

const Plants = () => {
  const { data: plan, isLoading } = useQuery({
    queryKey: ["plants"],
    queryFn: async () => {
      const { data } = await axios(`${import.meta.env.VITE_API_URL}/plants`);
      return data;
    },
  });
  if (isLoading) return <LoadingSpinner></LoadingSpinner>;

  console.log(plan);

  return (
    <Container>
      {plan && plan.length > 0 ? (
        <div className="pt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
          {plan.map((pla) => (
            <Card pla={pla} key={pla._id} />
          ))}
        </div>
      ) : (
        <p>NO Data Available</p>
      )}
    </Container>
  );
};

export default Plants;
