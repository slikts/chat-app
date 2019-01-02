import crc from "crc/crc1";

export const colors = [
  "#e90d7f",
  "#8e55e9",
  "#b30e0e",
  "#17b339",
  "#58afb3",
  "#9d54b3",
  "#b39775",
  "#3176b3",
];

export const nameToColor = name => colors[crc(name) % colors.length];

export const selectElement = element => {
  const selection = window.getSelection();
  const range = document.createRange();
  range.selectNodeContents(element);
  selection.removeAllRanges();
  selection.addRange(range);
};

export const findWord = (text, splitAt) => {
  const paddedText = ` ${text} `;
  const paddedSplitAt = splitAt + 1;
  const before = paddedText.slice(0, paddedSplitAt);
  const after = paddedText.slice(paddedSplitAt);
  const beforeIndex = before.lastIndexOf(" ") + 1;
  const afterIndex = paddedSplitAt + after.indexOf(" ");
  return {
    word: paddedText.slice(beforeIndex, afterIndex),
    start: beforeIndex - 1,
    end: afterIndex - 1,
  };
};

export const getErrorMessage = error => {
  if (error.graphQLErrors) {
    return `GraphQL error(s): ${error.graphQLErrors.map(({ code }) => code)}`;
  }
  if (error.networkError) {
    return `Network error: ${error.networkError.message}`;
  }
  return "Unknown error";
};
