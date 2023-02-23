export const ellipsis = (
  str: string,
  maxLength: number,
  ellipsisLocationPercentage?: number,
  placeholder: string = "..."
) => {
  ellipsisLocationPercentage = 0.85;

  if (str.length > maxLength - placeholder.length) {
    var beginning = str.substr(
      0,
      (maxLength - placeholder.length) * ellipsisLocationPercentage
    );
    var end = str.substr(
      str.length -
        (maxLength - placeholder.length) * (1 - ellipsisLocationPercentage) -
        6
    );
    return beginning + placeholder + end;
  }

  return str;
};
