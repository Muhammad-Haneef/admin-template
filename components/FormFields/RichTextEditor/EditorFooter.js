import { formatBytes } from './libs/editor-utils';

export const EditorFooter = ({ 
  value, 
  contentSize, 
  showCharCount, 
  error, 
  helperText 
}) => {
  return (
    <>
      <div className="flex justify-between mt-1 text-xs text-gray-500">
        <div>
          {showCharCount && value && (
            <span>Characters: {value.replace(/<[^>]*>/g, "").length}</span>
          )}
        </div>
        <div>Content Size: {formatBytes(contentSize)}</div>
      </div>

      {error && (
        <div className="flex items-center space-x-1 mt-1">
          <Icon icon="mdi:alert-circle" className="h-3 w-3 text-red-500" />
          <div className="text-xs text-red-600">{error}</div>
        </div>
      )}

      {helperText && !error && (
        <div className="text-xs text-gray-500 mt-1">{helperText}</div>
      )}
    </>
  );
};