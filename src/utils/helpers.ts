//function to check if a string contains only digits 0-9
const containsOnlyDigits = (value: string) => {
  return /^\d+$/.test(value);
};

//function to change the document title
const updateDocumentTitle = (title?: string) => {
  document.title = `${title?.trim() ? title + " | Pokefo" : "Pokefo"}`;
};

export { containsOnlyDigits, updateDocumentTitle };
