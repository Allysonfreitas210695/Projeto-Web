import { useState } from 'react';
import { useToast } from '@/components/ui/Toast';

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

const STORAGE_KEY = 'sifu_requests';

const getStoredRequests = (): Request[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

const saveRequests = (requests: Request[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(requests));
};

export const useRequests = () => {
  const { addToast } = useToast();
  const [requests, setRequests] = useState<Request[]>(getStoredRequests);
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState<'all' | 'in_progress' | 'resolved' | 'needs_review'>('all');

  const filteredRequests = requests.filter((req) => {
    if (filter === 'all') return true;
    return req.status === filter;
  });

  const createRequest = async (data: Omit<Request, 'id' | 'code' | 'timeAgo' | 'status'>) => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      const newRequest: Request = {
        ...data,
        id: Date.now(),
        code: `#${8000 + requests.length + 1}`,
        timeAgo: 'Agorinha',
        status: 'in_progress',
      };

      const updated = [newRequest, ...requests];
      setRequests(updated);
      saveRequests(updated);
      addToast('success', 'Solicitação criada com sucesso!');
      return true;
    } catch (error) {
      addToast('error', 'Erro ao criar solicitação.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const updateRequestStatus = async (id: number, status: Request['status']) => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 300));

      const updated = requests.map((req) => (req.id === id ? { ...req, status } : req));
      setRequests(updated);
      saveRequests(updated);
      addToast('success', 'Status atualizado!');
    } catch (error) {
      addToast('error', 'Erro ao atualizar status.');
    } finally {
      setIsLoading(false);
    }
  };

  const deleteRequest = async (id: number) => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 300));

      const updated = requests.filter((req) => req.id !== id);
      setRequests(updated);
      saveRequests(updated);
      addToast('success', 'Solicitação excluída.');
    } catch (error) {
      addToast('error', 'Erro ao excluir.');
    } finally {
      setIsLoading(false);
    }
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
    createRequest,
    updateRequestStatus,
    deleteRequest,
    getStats,
  };
};

export default useRequests;
