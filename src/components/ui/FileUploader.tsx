'use client';

import React, { useRef, useState } from 'react';
import { Upload, X, Image as ImageIcon, Loader2 } from 'lucide-react';
import { uploadFile } from '@/lib/supabase';

interface FileUploaderProps {
  label?: string;
  onFilesUploaded: (files: { name: string; url: string }[]) => void;
  error?: string;
}

export const FileUploader: React.FC<FileUploaderProps> = ({
  label = 'Upload Photos',
  onFilesUploaded,
  error
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<{ name: string; url: string }[]>([]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const processFiles = async (files: FileList) => {
    setUploading(true);
    const newFiles: { name: string; url: string }[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      // Only accept images
      if (!file.type.startsWith('image/')) continue;
      
      try {
        const publicUrl = await uploadFile(file);
        newFiles.push({ name: file.name, url: publicUrl });
      } catch (err) {
        console.error('File upload error:', err);
      }
    }

    const updated = [...uploadedFiles, ...newFiles];
    setUploadedFiles(updated);
    onFilesUploaded(updated);
    setUploading(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files) {
      await processFiles(e.dataTransfer.files);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      await processFiles(e.target.files);
    }
  };

  const removeFile = (index: number) => {
    const updated = uploadedFiles.filter((_, i) => i !== index);
    setUploadedFiles(updated);
    onFilesUploaded(updated);
  };

  return (
    <div className="w-full mb-4">
      {label && (
        <label className="block text-sm font-medium text-slate-700 mb-1.5 pl-1">
          {label}
        </label>
      )}

      {/* Drag Drop Area */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-3xl p-8 flex flex-col items-center justify-center cursor-pointer transition ${
          isDragging
            ? 'border-blue-500 bg-blue-50/50'
            : 'border-slate-200 hover:border-slate-300 bg-slate-50/50 hover:bg-slate-50'
        }`}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          multiple
          accept="image/*"
          className="hidden"
        />

        {uploading ? (
          <div className="flex flex-col items-center">
            <Loader2 className="animate-spin text-blue-500 mb-3" size={32} />
            <p className="text-sm font-medium text-slate-600">Uploading your memories...</p>
          </div>
        ) : (
          <div className="flex flex-col items-center text-center">
            <div className="p-4 bg-white rounded-2xl shadow-sm border border-slate-100 mb-4">
              <Upload className="text-blue-500" size={24} />
            </div>
            <p className="text-sm font-medium text-slate-800 mb-1">
              Drag and drop your photos here, or <span className="text-blue-600">browse</span>
            </p>
            <p className="text-xs text-slate-400">Supports JPG, PNG, WEBP (Max 5MB each)</p>
          </div>
        )}
      </div>

      {error && <span className="block text-xs text-red-500 mt-1 pl-1">{error}</span>}

      {/* Uploaded Files Preview Grid */}
      {uploadedFiles.length > 0 && (
        <div className="grid grid-cols-4 gap-3 mt-4">
          {uploadedFiles.map((file, idx) => (
            <div
              key={idx}
              className="relative aspect-square rounded-2xl border border-slate-150 overflow-hidden bg-slate-100 group shadow-sm"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={file.url}
                alt={file.name}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removeFile(idx);
                }}
                className="absolute top-1.5 right-1.5 p-1 bg-slate-900/60 hover:bg-slate-950 text-white rounded-full transition"
              >
                <X size={12} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
