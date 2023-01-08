const generateId = (concepts) => {
  const maxId =
    concepts.length > 0
      ? Math.max(...concepts.map((concept) => concept.id))
      : 0;
  return maxId + 1;
};

export default { generateId };
