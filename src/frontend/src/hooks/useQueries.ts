import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { TestRequest, ContactSubmission } from '../backend';

// Test Request Mutations
export function useSubmitTestRequest() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      customerName: string;
      company: string | null;
      phone: string;
      email: string | null;
      testItemType: string;
      standards: string | null;
      message: string | null;
      preferredDate: bigint | null;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.submitTestRequest(
        data.customerName,
        data.company,
        data.phone,
        data.email,
        data.testItemType,
        data.standards,
        data.message,
        data.preferredDate
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['testRequests'] });
    },
  });
}

export function useGetTestRequests(limit: number = 50, offset: number = 0) {
  const { actor, isFetching } = useActor();

  return useQuery<TestRequest[]>({
    queryKey: ['testRequests', limit, offset],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getTestRequests(BigInt(limit), BigInt(offset));
    },
    enabled: !!actor && !isFetching,
  });
}

export function useDeleteTestRequest() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error('Actor not available');
      return actor.deleteTestRequest(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['testRequests'] });
    },
  });
}

// Contact Form Mutations
export function useSubmitContactForm() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      name: string;
      phone: string;
      email: string | null;
      message: string;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.submitContactForm(data.name, data.phone, data.email, data.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contactSubmissions'] });
    },
  });
}

export function useGetContactSubmissions(limit: number = 50, offset: number = 0) {
  const { actor, isFetching } = useActor();

  return useQuery<ContactSubmission[]>({
    queryKey: ['contactSubmissions', limit, offset],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getContactSubmissions(BigInt(limit), BigInt(offset));
    },
    enabled: !!actor && !isFetching,
  });
}

export function useDeleteContactSubmission() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error('Actor not available');
      return actor.deleteContactSubmission(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contactSubmissions'] });
    },
  });
}

// User Profile Queries
export function useGetCallerUserProfile() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery({
    queryKey: ['currentUserProfile'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}

export function useSaveCallerUserProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profile: { name: string }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.saveCallerUserProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    },
  });
}

// Admin Queries
export function useIsCallerAdmin() {
  const { actor, isFetching } = useActor();

  return useQuery<boolean>({
    queryKey: ['isAdmin'],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching,
  });
}
