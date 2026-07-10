import { Icon } from "@iconify/react";

export const EditorLabel = ({ 
  label, 
  required, 
  error, 
  tooltip, 
  htmlFor 
}) => {
  if (!label) return null;

  return (
    <div className="flex items-center justify-between mb-2">
      <label
        htmlFor={htmlFor}
        className={`block text-sm font-medium ${
          error ? "text-red-600" : "text-gray-700"
        }`}
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      {tooltip && (
        <div className="relative group/tooltip">
          <Icon
            icon="mdi:information"
            className="h-4 w-4 text-gray-400 cursor-help"
          />
          <div className="absolute bottom-full right-0 mb-2 w-64 p-2 rounded-md bg-gray-900 text-white text-xs shadow-lg z-10 hidden group-hover/tooltip:block">
            {tooltip}
          </div>
        </div>
      )}
    </div>
  );
};