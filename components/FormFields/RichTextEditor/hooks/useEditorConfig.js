import { useMemo } from 'react';

export const useEditorConfig = (toolbarConfig, formatsConfig) => {
  const getToolbarConfig = () => {
    switch (toolbarConfig) {
      case "minimal":
        return [["bold", "italic", "underline"]];
      case "basic":
        return [
          ["bold", "italic", "underline", "strike"],
          [{ list: "ordered" }, { list: "bullet" }],
          [{ align: [] }],
          ["link", "image"],
          ["clean"],
        ];
      case "full":
      default:
        return [
          [{ font: [] }, { size: ["small", false, "large", "huge"] }],
          ["bold", "italic", "underline", "strike"],
          [{ color: [] }, { background: [] }],
          [{ script: "sub" }, { script: "super" }],
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
          ],
          [{ direction: "rtl" }],
          [{ align: [] }],
          ["blockquote", "code-block"],
          ["link", "image", "video", "table"],
        ];
    }
  };

  const getFormatsConfig = () => {
    switch (formatsConfig) {
      case "minimal":
        return ["bold", "italic", "underline"];
      case "basic":
        return [
          "bold",
          "italic",
          "underline",
          "strike",
          "list",
          "align",
          "link",
          "image",
        ];
      case "full":
      default:
        return [
          "header",
          "font",
          "size",
          "bold",
          "italic",
          "underline",
          "strike",
          "blockquote",
          "list",
          "indent",
          "direction",
          "align",
          "link",
          "image",
          "video",
          "color",
          "background",
          "script",
          "code-block",
          "table",
        ];
    }
  };

  const toolbar = useMemo(() => 
    Array.isArray(toolbarConfig) ? toolbarConfig : getToolbarConfig(),
    [toolbarConfig]
  );

  const formats = useMemo(() => 
    Array.isArray(formatsConfig) ? formatsConfig : getFormatsConfig(),
    [formatsConfig]
  );

  return { toolbar, formats };
};