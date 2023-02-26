import { FC, useEffect, useState } from "react";

import { TextInput } from "./text-input.ui";

export const SearchInput: FC<{
  placeholder: string;
  onEmit: (keword: string) => void;
}> = (props): JSX.Element => {
  const { placeholder, onEmit } = props;
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      onEmit(keyword);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [keyword]);

  return (
    <TextInput
      placeholder={placeholder}
      classes={["md", "full-width"]}
      value={keyword}
      showClear={true}
      onChange={(value: string) => {
        setKeyword(value);
      }}
      onClear={() => {
        setKeyword("");
      }}
    />
  );
};
