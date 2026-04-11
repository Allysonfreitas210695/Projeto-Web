import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/components/ui/Toast';
import api from '@/services/api/apiClient';

interface Request {
  id: number;
  code: string;
  title: string;
  requester: string;
  department: string;
  timeAgo: string;
  status: 'in_progress' | 'resolved' | 'needs_review';
  priority: 'high' | 'medium' | 'low' | 'critical';
  classification: string;
  description?: string;
}

const fetchRequests = async (): Promise<Request[]> => {
  const response = await api.get('/requests');
  return response.data;
};

export const useRequests = () => {
  const { addToast } = useToast();
  const queryClient = useQueryClient();
  const [filter, setFilter] = useState<'all' | 'in_progress' | 'resolved' | 'needs_review'>('all');

  const { data: requests = [], isLoading } = useQuery({
    queryKey: ['requests'],
    queryFn: fetchRequests,
  });

  const filteredRequests = requests.filter((req) => {
    if (filter === 'all') return true;
    return req.status === filter;
  });

  const createMutation = useMutation({
    mutationFn: (data: Omit<Request, 'id' | 'code' | 'timeAgo' | 'status'>) =>
      api.post('/requests', {
        ...data,
        id: Date.now(),
        code: `#${8000 + requests.length + 1}`,
        timeAgo: 'Agorinha',
        status: 'in_progress',
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['requests'] });
      addToast('success', 'Solicitação criada com sucesso!');
    },
    onError: () => {
      addToast('error', 'Erro ao criar solicitação.');
    },
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: number; status: Request['status'] }) =>
      api.patch(`/requests/${id}`, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['requests'] });
      addToast('success', 'Status atualizado!');
    },
    onError: () => {
      addToast('error', 'Erro ao atualizar status.');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => api.delete(`/requests/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['requests'] });
      addToast('success', 'Solicitação excluída.');
    },
    onError: () => {
      addToast('error', 'Erro ao excluir.');
    },
  });

  const createRequest = async (data: Omit<Request, 'id' | 'code' | 'timeAgo' | 'status'>) => {
    await createMutation.mutateAsync(data);
    return true;
  };

  const updateRequestStatus = async (id: number, status: Request['status']) => {
    await updateStatusMutation.mutateAsync({ id, status });
  };

  const deleteRequest = async (id: number) => {
    await deleteMutation.mutateAsync(id);
  };

  const getStats = () => ({
    total: requests.length,
    pending: requests.filter((r) => r.status === 'in_progress').length,
    resolved: requests.filter((r) => r.status === 'resolved').length,
    review: requests.filter((r) => r.status === 'needs_review').length,
  });

  return {
    requests: filteredRequests,
    allRequests: requests,
    filter,
    setFilter,
    isLoading,
    isCreating: createMutation.isPending,
    isUpdating: updateStatusMutation.isPending,
    isDeleting: deleteMutation.isPending,
    refetch: () => queryClient.invalidateQueries({ queryKey: ['requests'] }),
    createRequest,
    updateRequestStatus,
    deleteRequest,
    getStats,
  };
};

export default useRequests;
