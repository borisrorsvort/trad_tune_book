import { TUNE_URL } from '../constants/actionTypes';

export const abcReformatter = abc => {
  return abc.split('! ').join('\n');
};

export const printUrl = tuneId => {
  return `${TUNE_URL}${tuneId}/${tuneId}?print=true`;
};
