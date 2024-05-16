import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getSchedList, insertSched, updateSched, deleteSched } from '../../../api/firebase';

export default function useSched(ymd) {
  const queryClient = useQueryClient();
  const email = sessionStorage.getItem('sessionEmail');

  const getList = useQuery({
    queryKey: ['schedule', ymd, email],
    queryFn: () => getSchedList(ymd, email),
    staleTime: 1000 * 60 * 5
  });

  const insertRecord = useMutation({
    mutationFn: sched => insertSched(sched),
    onSuccess: () => { queryClient.invalidateQueries(['schedule']); },
    onError: console.error
  });

  const updateRecord = useMutation({
    mutationFn: sched => updateSched(sched),
    onSuccess: () => { queryClient.invalidateQueries(['schedule']); },
    onError: console.error
  });

  const deleteRecord = useMutation({
    mutationFn: id => deleteSched(id),
    onSuccess: () => { queryClient.invalidateQueries(['schedule']); },
    onError: console.error
  });

  return { getList, insertRecord, updateRecord, deleteRecord };
}