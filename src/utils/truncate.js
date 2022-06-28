const truncate = (source, size) => {
  return source.length > size ? `${source.slice(0, size - 1)} …` : source;
};

export default truncate;
