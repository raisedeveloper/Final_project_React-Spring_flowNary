import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAnnivList, insertAnniv, updateAnniv, deleteAnniv } from 'api/firebase';

export default function useAnniv(ymd) {
  const queryClient = useQueryClient();
  const email = sessionStorage.getItem('sessionEmail');

  const getList = useQuery({
    queryKey: ['anniversary', ymd, email],
    queryFn: () => getAnnivList(ymd, email),
    staleTime: 1000 * 60 * 5
  });

  const insertRecord = useMutation({
    mutationFn: anniv => insertAnniv(anniv),
    onSuccess: () => { queryClient.invalidateQueries(['anniversary']); },
    onError: console.error
  });

  const updateRecord = useMutation({
    mutationFn: anniv => updateAnniv(anniv),
    onSuccess: () => { queryClient.invalidateQueries(['anniversary']); },
    onError: console.error
  });

  const deleteRecord = useMutation({
    mutationFn: id => deleteAnniv(id),
    onSuccess: () => { queryClient.invalidateQueries(['anniversary']); },
    onError: console.error
  });

  return { getList, insertRecord, updateRecord, deleteRecord };
}