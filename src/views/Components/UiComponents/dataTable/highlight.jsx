import React from "react";
import Highlighter from "react-highlight-words";

export default function Highlight({ searchWords, textToHighlight }) {
  return (
    <div>
      <Highlighter
        highlightStyle={{ backgroundColor: "yellow" }}
        searchWords={searchWords}
        autoEscape={true}
        textToHighlight={textToHighlight}
      />
    </div>
  );
}
