import { useContext } from 'react';
import { RefreshContext } from 'contexts/RefreshContext';

const useRefresh = () => {
  const { fast, medium, slow } = useContext(RefreshContext);
  return { fastRefresh: fast, mediumRefresh: medium, slowRefresh: slow };
};

export default useRefresh;
