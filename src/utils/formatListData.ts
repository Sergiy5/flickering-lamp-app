import { IAPIlossesRecord, IAPIlossesResponse, ITermsData } from '@/types/interfaces';

export const formatListData = (data: IAPIlossesResponse, terms: ITermsData) => {
  const { stats, increase } = data.data;

  const array = Object.keys(stats).map(key => {
    return {
      id: key,
      icon: terms[key].icon,
      title: terms[key].title,
      stat: stats[key] || 0,
      increase: increase[key] || undefined,
    };
  });
  return array;
};
