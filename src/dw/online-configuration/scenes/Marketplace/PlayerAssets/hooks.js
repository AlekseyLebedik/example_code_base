import { useParams } from 'react-router-dom';

export const useIsClanInventory = () => {
  const { inventoryType } = useParams();
  return inventoryType === 'clan-inventory';
};
