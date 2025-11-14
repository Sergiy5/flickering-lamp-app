import { IAPIlossesRecord, IAPIlossesResponse, IAPIlossesTerms } from '@/types/interfaces';
import axios from 'axios';

axios.defaults.baseURL = 'https://russianwarship.rip/api/v2';
axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    return Promise.reject('Error:' + error);
  },
);

export const getWarInfo = async () => {
  try {
    const response = await axios.get('/war-info');
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getRussianLosses = async (
  date: string | null,
): Promise<IAPIlossesResponse | undefined> => {
  const url = date ? `/statistics/${date}` : `/statistics`;

  try {
    const res = await axios.get(url);
    return res.data;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

export const getTerms = async (language: string | null): Promise<IAPIlossesTerms | undefined> => {
  const url = language ? `/terms/${language}` : `/terms`;
  try {
    const res = await axios.get(url);
    return res.data;
  } catch (error) {
      console.log(error);
      return undefined
  }
};
