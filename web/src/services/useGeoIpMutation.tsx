import { useMutation } from "react-query";
import axios from "axios";
import { DEFAULT_GEO_IP_DATA } from "../interfaces/GeoIpData";
import config from "../config";

interface bodyIpAddress {
  ip: string;
}

const useGeoIpMutation = (onSuccess: Function, onError: Function) => {
  const searchIp = async (ipAddress: bodyIpAddress) => {
    if (!ipAddress) {
      return DEFAULT_GEO_IP_DATA;
    }
    const uri = `${config.API_BASE_URI}/ip`;
    const response = await axios.post(uri, ipAddress);
    return response.data;
  };

  const { mutateAsync, isError, isLoading, error } = useMutation(
    "searchIp",
    (ipAddress: bodyIpAddress) => searchIp(ipAddress),
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
    searchIp: (ipAddress: bodyIpAddress) => mutateAsync(ipAddress),
    isError,
    searchError: error,
    isLoading,
  };
};

export default useGeoIpMutation;
