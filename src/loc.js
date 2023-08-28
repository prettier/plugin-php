const loc = (prop) => (node) => {
  return node.loc && node.loc[prop] && node.loc[prop].offset;
};

export const locStart = loc("start");
export const locEnd = loc("end");
