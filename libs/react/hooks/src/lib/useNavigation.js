import { useHistory } from 'react-router';

export default function useNavigation() {
  const navigation = useHistory();
  return (path, preserveQueryParams = false) => {
    preserveQueryParams && navigation.location.search
      ? navigation.push(path + navigation.location.search)
      : navigation.push(path);
  };
}
