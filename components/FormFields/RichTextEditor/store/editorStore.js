import { create } from 'zustand';

export const useEditorStore = create((set) => ({
  // Table state
  tableRows: 3,
  tableCols: 3,
  showTableModal: false,
  
  // Content state
  contentSize: 0,
  uploading: false,
  imageUrls: [],
  
  // Actions
  setTableSize: (rows, cols) => set({ tableRows: rows, tableCols: cols }),
  setShowTableModal: (show) => set({ showTableModal: show }),
  setContentSize: (size) => set({ contentSize: size }),
  setUploading: (uploading) => set({ uploading }),
  setImageUrls: (urls) => set({ imageUrls: urls }),
  
  // Reset
  resetTableSize: () => set({ tableRows: 3, tableCols: 3 }),
}));