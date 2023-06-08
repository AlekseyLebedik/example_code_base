import { useParams } from 'react-router-dom';

export const useIsClanAchievements = () => {
  const { path } = useParams();
  return path === 'clan-achievements';
};
