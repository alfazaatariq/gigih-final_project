// Type : number, string, boolean, object

const checkType = (item, type) => {
  // Get the actual type of the item using the typeof operator
  const itemType = typeof item;

  // Compare the actual type with the provided type argument (case insensitive)
  return itemType.toLowerCase() === type.toLowerCase();
};

export default checkType;
