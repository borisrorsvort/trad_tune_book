import { TUNE_URL } from "../constants/actionTypes";

const tuneTypes = {
  jig: "3/4",
  reel: "4/4",
  "slip jig": "9/8",
  hornpipe: "4/4",
  polka: "2/4",
  slide: "12/8",
  waltz: "3/4",
  barndance: "4/4",
  strathspey: "4/4",
  "three-two": "3/2",
  mazurka: "3/4"
};

export const abcReformatter = (tune, type, name) => {
  if (tune.abc === undefined) {
    return "";
  }
  const abc = tune.abc.split("! ").join("\n");
  const tuneName = `T: ${name}`;
  const timeSignature = `M: ${tuneTypes[type] || tuneTypes[tune.type]}`;
  const tuneKey = `K: ${tune.key}`;

  return [tuneName, timeSignature, tuneKey, abc].join("\n");
};

export const printUrl = tuneId => {
  return `${TUNE_URL}${tuneId}/${tuneId}?print=true`;
};
