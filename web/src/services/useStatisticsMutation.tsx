import { useMutation } from "react-query";
import axios from "axios";
import config from "../config";

const useStatisticsMutation = (onSuccess: Function, onError: Function) => {
  const getStatistics = async () => {
    const uri = `${config.API_BASE_URI}/statistics`;
    const response = await axios.get(uri);
    return response.data;
  };

  const { mutateAsync, isError, isLoading, error } = useMutation(
    "getStatistics",
    () => getStatistics(),
    {
      onSuccess: (data) => {
        onSuccess(data);
      },
      onError: (error) => {
        onError(error);
      },
    }
  );
  return {
    getStatistics: () => mutateAsync(),
    isError,
    searchError: error,
    isLoading,
  };
};

export default useStatisticsMutation;
