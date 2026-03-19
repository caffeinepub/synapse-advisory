import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { ConsultationRequest } from "../backend.d";
import { useActor } from "./useActor";

export function useSubmitRequest() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      name: string;
      email: string;
      company: string;
      message: string;
      serviceInterest: string;
    }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.submitRequest(
        data.name,
        data.email,
        data.company,
        data.message,
        data.serviceInterest,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["requests"] });
    },
  });
}

export function useGetAllRequests() {
  const { actor, isFetching } = useActor();
  return useQuery<ConsultationRequest[]>({
    queryKey: ["requests"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllRequests();
    },
    enabled: !!actor && !isFetching,
  });
}
