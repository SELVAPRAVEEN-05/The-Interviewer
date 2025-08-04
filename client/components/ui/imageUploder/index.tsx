'use client';
import Uplode from "@/components/assets/uplodeImage.png";
import Image from 'next/image';
import { useRef, useState } from 'react';
import { MdDeleteForever } from "react-icons/md";

interface IndexProps {
  inputtype?: string;
  uploadimage?: boolean;
  title?: string;
  content?: string;
  inputField?: React.ReactNode;
  deleteIcon?: React.ReactNode;
  classNameUploadContainer?: string;
  classNameUploadImage?: string;
  classNameUploadTitle?: string;
  classNameUploadContent?: string;
  classNameLoaderBgcolor?: string;
  classNameLoaderColor?: string;
  imageValue?: any;
  getImgFile?: (img: string | any) => void;
  onChange?: (imageUrl: string | null | any, e: any) => void;
  accept?: string;
  imageUrl?: string;
}

export function Uploadphoto({
  inputtype = 'file',
  uploadimage = false,
  title = 'Upload Your Profile Picture',
  content = 'Only PNG, JPEG not more than 2 MB',
  inputField = <Image src={Uplode} alt="Upload Icon" />,
  deleteIcon = <MdDeleteForever />,
  imageValue = '',
  classNameUploadContainer = 'h-[3.75rem] min-w-[20.875rem]',
  classNameUploadImage = 'h-[3.75rem] w-[3.75rem]',
  classNameUploadTitle = 'font-medium mb-1 mt-[-1px]',
  classNameUploadContent = 'text-gray-700 text-sm font-regular text-ellipsis whitespace-nowrap',
  classNameLoaderBgcolor = 'h-[0.25rem] rounded-full w-[11.063rem]',
  classNameLoaderColor = 'bg-[#008545] h-[0.25rem] rounded-full',
  getImgFile,
  onChange = () => { },
  accept = 'image/png, image/jpeg',
  imageUrl = '',
}: IndexProps) {
  const [image, setImage] = useState<string | File | null>(imageValue ?? null);
  const [uploadStatus, setUploadStatus] = useState(uploadimage);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setImage(file);
    setUploadStatus(true);

    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 2;
      setProgress(currentProgress);

      if (currentProgress >= 100) {
        clearInterval(interval);

        const reader = new FileReader();
        reader.onloadend = () => {
          const result = reader.result as string;
          getImgFile?.(result);
          setImagePreview(result);
          setLoading(false);
          onChange(result, e);
        };

        reader.readAsDataURL(file);
      }
    }, 100);
  };

  const handleDelete = () => {
    setImage(null);
    setImagePreview(null);
    setUploadStatus(false);
    setLoading(false);
    setProgress(0);
    onChange(null, null);

    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const renderPreview = () => {
    if (accept === 'video/*') {
      return (
        <video
          src={imagePreview ?? ''}
          className={classNameUploadImage}
          controls
        />
      );
    } else if (accept === 'application/pdf') {
      return (
        <div className={`${classNameUploadImage} bg-gray-100 text-center flex items-center justify-center text-sm font-semibold`}>
          PDF
        </div>
      );
    } else {
      return (
        <img
          src={imageUrl || imagePreview || ''}
          alt='uploaded'
          className={classNameUploadImage}
        />
      );
    }
  };

  return (
    <div className={classNameUploadContainer}>
      <div className='flex gap-3 w-full h-full items-center'>
        {uploadStatus && !loading ? (
          renderPreview()
        ) : (
          <div onClick={handleUploadClick} className='cursor-pointer'>
            {inputField}
            <input
              ref={fileInputRef}
              type={inputtype}
              accept={accept}
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
          </div>
        )}

        <div
          className={`flex flex-col ${uploadStatus && !loading ? 'w-[10.438rem]' : 'w-[13.625rem]'}`}
        >
          {/* ✅ Hide title after upload */}
          {!uploadStatus && !loading && (
            <div className={classNameUploadTitle}>{title}</div>
          )}

          {!uploadStatus && !loading ? (
            <div className={classNameUploadContent}>{content}</div>
          ) : (
            <div className='flex flex-col gap-[0.625rem]'>
              <div className={classNameUploadContent}>
                {image instanceof File ? image.name : ''}
              </div>
              {loading ? (
                <div className='flex items-center gap-[1rem] h-[0.25rem]'>
                  <div className={classNameLoaderBgcolor}>
                    <div
                      className={classNameLoaderColor}
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <div className={`${classNameUploadTitle} mt-[-0.1rem]`}>
                    {progress}%
                  </div>
                </div>
              ) : (
                <div className={classNameUploadContent}>
                  {image instanceof File
                    ? `${(image.size / 1024).toFixed(2)} KB`
                    : ''}
                </div>
              )}
            </div>
          )}
        </div>

        {uploadStatus && !loading && (
          <div onClick={handleDelete} className='cursor-pointer text-red-500 text-2xl h-full flex items-center'>
            {deleteIcon}
          </div>
        )}
      </div>
    </div>
  );
}
