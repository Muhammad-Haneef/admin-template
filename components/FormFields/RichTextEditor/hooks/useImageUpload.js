import { useState } from 'react';
import { base64ToFile } from '../libs/editor-utils';

export const useImageUpload = (uploadEndpoint, onImageUpload) => {
  const [uploading, setUploading] = useState(false);
  const [imageUrls, setImageUrls] = useState([]);

  const uploadImage = async (file) => {
    if (!file) return null;
    setUploading(true);

    if (onImageUpload) {
      try {
        const imageUrl = await onImageUpload(file);
        setUploading(false);
        return imageUrl;
      } catch (error) {
        setUploading(false);
        console.error("Image upload failed:", error);
        return null;
      }
    }

    if (!uploadEndpoint) {
      setUploading(false);
      return URL.createObjectURL(file);
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch(uploadEndpoint, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data?.status === 200 || data?.success) {
        const imageUrl = data?.data?.image_url || data?.url;
        return imageUrl;
      }
      throw new Error("Upload failed");
    } catch (err) {
      console.error("Image upload failed:", err);
      return null;
    } finally {
      setUploading(false);
    }
  };

  const handleBase64Image = async (base64String) => {
    const file = base64ToFile(base64String);
    if (file) {
      const imageUrl = await uploadImage(file);
      return imageUrl;
    }
    return null;
  };

  return {
    uploading,
    imageUrls,
    setImageUrls,
    uploadImage,
    handleBase64Image
  };
};