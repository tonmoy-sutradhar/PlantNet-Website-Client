import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";
import { useQuery } from "@tanstack/react-query";

const UseRole = () => {
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useAuth();

  const { data: role, isLoading } = useQuery({
    queryKey: ["role", user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure(`/users/role/${user?.email}`);
      return data.role;
    },
  });
  return [role, isLoading];
};

export default UseRole;

// Help Chatgpt-------------------------*****
// const UseRole = () => {
//   const axiosSecure = useAxiosSecure();
//   const { user, loading } = useAuth();

//   const { data: role = "customer", isLoading } = useQuery({
//     queryKey: ["role", user?.email],
//     enabled: !loading && !!user?.email,
//     queryFn: async () => {
//       try {
//         const { data } = await axiosSecure.get(`/users/role/${user?.email}`);
//         return data.role;
//       } catch (error) {
//         if (error.response?.status === 404) {
//           console.warn("User not found, returning default role");
//           return "customer"; // Default role fallback
//         }
//         throw error; // Re-throw other errors
//       }
//     },
//   });

//   return [role, isLoading];
// };

// export default UseRole;
