const loc = (prop) => (node) => node.loc?.[prop]?.offset;

export const locStart = loc("start");
export const locEnd = loc("end");
