import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/components/ui/Toast';
import api from '@/services/api/apiClient';
import { useAuthStore } from '@/store/useAuthStore';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'editor' | 'user';
  status: 'Active' | 'Inactive';
  department?: string;
  createdAt?: string;
  title?: string;
  institution?: string;
  avatar?: string | null;
}

interface Activity {
  id: number;
  userId: string;
  title: string;
  date: string;
  type: string;
}

interface Preferences {
  id?: number;
  userId: string;
  theme: string;
  language: string;
  emailNotifications: boolean;
  pushNotifications: boolean;
  weeklyDigest: boolean;
}

const fetchUser = async (id: string): Promise<User> => {
  const response = await api.get(`/users/${id}`);
  return response.data;
};

const fetchActivities = async (userId: string): Promise<Activity[]> => {
  const response = await api.get(`/activities?userId=${userId}`);
  return response.data;
};

const fetchPreferences = async (userId: string): Promise<Preferences> => {
  const response = await api.get(`/preferences?userId=${userId}`);
  return response.data;
};

const updateUser = async ({ id, data }: { id: string; data: Partial<User> }) => {
  const response = await api.patch(`/users/${id}`, data);
  return response.data;
};

const updatePreferences = async (data: Partial<Preferences> & { userId: string }) => {
  const response = await api.patch('/preferences', data);
  return response.data;
};

const changePassword = async ({
  userId,
  currentPassword,
  newPassword,
}: {
  userId: string;
  currentPassword: string;
  newPassword: string;
}) => {
  const response = await api.post(`/users/${userId}/change-password`, {
    currentPassword,
    newPassword,
  });
  return response.data;
};

export const useProfile = () => {
  const { addToast } = useToast();
  const queryClient = useQueryClient();
  const user = useAuthStore((state) => state.user);

  const userId = user?.id;

  const { data: userData, isLoading: isLoadingUser } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => fetchUser(userId!),
    enabled: !!userId,
  });

  const { data: activities = [], isLoading: isLoadingActivities } = useQuery({
    queryKey: ['activities', userId],
    queryFn: () => fetchActivities(userId!),
    enabled: !!userId,
  });

  const { data: preferences = {}, isLoading: isLoadingPreferences } = useQuery({
    queryKey: ['preferences', userId],
    queryFn: () => fetchPreferences(userId!),
    enabled: !!userId,
  });

  const updateUserMutation = useMutation({
    mutationFn: updateUser,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['user', userId] });
      const login = useAuthStore.getState().login;
      login(data, useAuthStore.getState().token!);
      addToast('success', 'Perfil atualizado com sucesso!');
    },
    onError: () => {
      addToast('error', 'Erro ao atualizar perfil.');
    },
  });

  const updatePreferencesMutation = useMutation({
    mutationFn: updatePreferences,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['preferences', userId] });
      addToast('success', 'Preferências atualizadas!');
    },
    onError: () => {
      addToast('error', 'Erro ao atualizar preferências.');
    },
  });

  const changePasswordMutation = useMutation({
    mutationFn: changePassword,
    onSuccess: () => {
      addToast('success', 'Senha alterada com sucesso!');
    },
    onError: () => {
      addToast('error', 'Erro ao alterar senha. Verifique a senha atual.');
    },
  });

  return {
    user: userData,
    activities,
    preferences,
    isLoading: isLoadingUser || isLoadingActivities || isLoadingPreferences,
    isUpdatingUser: updateUserMutation.isPending,
    isUpdatingPrefs: updatePreferencesMutation.isPending,
    isChangingPassword: changePasswordMutation.isPending,
    updateUser: (data: Partial<User>) => updateUserMutation.mutate({ id: userId!, data }),
    updatePreferences: (data: Partial<Preferences>) =>
      updatePreferencesMutation.mutate({ ...data, userId: userId! }),
    changePassword: (currentPassword: string, newPassword: string) =>
      changePasswordMutation.mutate({ userId: userId!, currentPassword, newPassword }),
  };
};
