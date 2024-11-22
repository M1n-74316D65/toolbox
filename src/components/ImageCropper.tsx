"use client";

import { useState, useRef } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { Button } from "./ui/button";

export default function ImageCropper() {
  const [image, setImage] = useState<string>("");
  const cropperRef = useRef<any>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCrop = () => {
    if (cropperRef.current) {
      const croppedCanvas = cropperRef.current.cropper.getCroppedCanvas();
      if (croppedCanvas) {
        croppedCanvas.toBlob((blob: Blob | null) => {
          if (blob) {
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = "cropped-image.png";
            link.click();
          }
        }, "image/png");
      }
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full max-w-2xl mx-auto p-4">
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        ref={inputRef}
        className="hidden"
      />
      <Button onClick={() => inputRef.current?.click()} className="w-full">
        Select Image
      </Button>

      {image && (
        <>
          <div className="border rounded-lg overflow-hidden">
            <Cropper
              src={image}
              ref={cropperRef}
              className="h-[400px]"
              viewMode={1}
              minCropBoxHeight={10}
              minCropBoxWidth={10}
              background={false}
              responsive={true}
              checkOrientation={false}
              guides={true}
            />
          </div>
          <Button onClick={handleCrop} className="w-full">
            Save Cropped Image
          </Button>
        </>
      )}
    </div>
  );
}
