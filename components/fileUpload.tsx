'use client';

import { IKImage, ImageKitProvider, IKUpload, IKVideo } from 'imagekitio-next';
import config from '@/lib/config';
import { useRef, useState } from 'react';
import Image from 'next/image';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { UploadIcon } from 'lucide-react';

const {
  env: {
    imageKit: { publicKey, urlEndpoint },
  },
} = config;

const authenticator = async () => {
  try {
    const response = await fetch(`/api/auth/imagekit`);

    if (!response.ok) {
      const errorText = await response.text();

      throw new Error(`Request failed with status ${response.status}: ${errorText}`);
    }

    const data = await response.json();

    const { signature, expire, token } = data;

    return { token, expire, signature };
  } catch (error: any) {
    throw new Error(`Authentication request failed: ${error.message}`);
  }
};

interface Props {
  type: 'image' | 'video';
  accept: string;
  placeholder: string;
  folder: string;
  variant: 'dark' | 'light';
  onFileChange: (filePath: string) => void;
  value?: string;
}

const FileUpload = ({ type, accept, placeholder, folder, variant, onFileChange, value }: Props) => {
  const ikUploadRef = useRef(null);
  const [file, setFile] = useState<{ filePath: string | null }>({
    filePath: value ?? null,
  });
  const [progress, setProgress] = useState(0);

  const styles = {
    button: variant === 'dark' ? 'bg-slate-700' : 'bg-slate-200 border-gray-100 border',
    placeholder: variant === 'dark' ? 'text-white' : 'text-primary',
    text: variant === 'dark' ? 'text-white' : 'text-primary',
  };

  const onError = (error: any) => {
    console.log(error);

    toast({
      title: `${type} upload failed`,
      description: `Your ${type} could not be uploaded. Please try again.`,
      variant: 'destructive',
    });
  };

  const onSuccess = (res: any) => {
    setFile(res);
    onFileChange(res.filePath);

    toast({
      title: `${type} uploaded successfully`,
      description: `${res.filePath} uploaded successfully!`,
    });
  };

  const onValidate = (file: File) => {
    if (type === 'image') {
      if (file.size > 20 * 1024 * 1024) {
        toast({
          title: 'File size too large',
          description: 'Please upload a file that is less than 20MB in size',
          variant: 'destructive',
        });

        return false;
      }
    } else if (type === 'video') {
      if (file.size > 50 * 1024 * 1024) {
        toast({
          title: 'File size too large',
          description: 'Please upload a file that is less than 50MB in size',
          variant: 'destructive',
        });
        return false;
      }
    }

    return true;
  };

  return (
    <ImageKitProvider publicKey={publicKey} urlEndpoint={urlEndpoint} authenticator={authenticator}>
      <IKUpload
        ref={ikUploadRef}
        onError={onError}
        onSuccess={onSuccess}
        useUniqueFileName={true}
        validateFile={onValidate}
        onUploadStart={() => setProgress(0)}
        onUploadProgress={({ loaded, total }) => {
          const percent = Math.round((loaded / total) * 100);

          setProgress(percent);
        }}
        folder={folder}
        accept={accept}
        className="hidden"
      />

      <button
        className={cn('flex flex-col min-h-14 w-full items-center justify-center gap-1.5 rounded-md', styles.button)}
        onClick={(e) => {
          e.preventDefault();

          if (ikUploadRef.current) {
            // @ts-ignore
            ikUploadRef.current?.click();
          }
        }}
      >
        <div className="flex flex-row gap-1.5">
          <UploadIcon className="object-contain size-5" />

          <p className={cn('text-base', styles.placeholder)}>{placeholder}</p>
        </div>

        {file && <p className={cn('mt-1 text-center text-xs', styles.text)}>{file.filePath}</p>}
      </button>

      {progress > 0 && progress !== 100 && (
        <div className="w-full rounded-full bg-green-200">
          <div className="progress" style={{ width: `${progress}%` }}>
            {progress}%
          </div>
        </div>
      )}

      {file.filePath && (type === 'image' ? <IKImage alt={file.filePath} path={file.filePath} width={500} height={300} /> : type === 'video' ? <IKVideo path={file.filePath} controls={true} className="h-96 w-full rounded-xl" /> : null)}
    </ImageKitProvider>
  );
};

export default FileUpload;
