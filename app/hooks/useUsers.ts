import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { User } from "@prisma/client";

const useUsers = () =>
  useQuery({
    queryKey: ["users"],
    queryFn: () => axios.get<User[]>("/api/users").then((res) => res.data),
    staleTime: 60 * 60 * 1000, // 1h
    retry: 3,
  });

export default useUsers;
