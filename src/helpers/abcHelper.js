import { TUNE_URL } from "../constants/actionTypes";

export const abcReformatter = (tune, type, name) => {
  if (tune.abc === undefined) {
    return "";
  }
  const abc = tune.abc.split("! ").join("\n");
  return `T: ${name}\nK: ${tune.key}\n${abc}`;
};

export const printUrl = tuneId => {
  return `${TUNE_URL}${tuneId}/${tuneId}?print=true`;
};
