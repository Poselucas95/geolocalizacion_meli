export interface GeoIpData {
  ip: string;
  currentDate: string;
  country: string;
  isoCode: string;
  languages: string;
  currency: string;
  zoneTimes: string;
  distance: number;
  distanceMessage: string;
}

export const DEFAULT_GEO_IP_DATA: GeoIpData = {
  ip: "",
  currentDate: "",
  country: "",
  isoCode: "",
  languages: "",
  currency: "",
  zoneTimes: "",
  distance: 0,
  distanceMessage: "",
};
