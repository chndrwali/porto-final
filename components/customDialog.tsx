'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus } from 'lucide-react';

interface Props {
  children: React.ReactNode;
  textButton: string;
  titleDialog: string;
}

const CustomDialog = ({ children, textButton, titleDialog }: Props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button effect="expandIcon" icon={Plus} iconPlacement="left">
          {textButton}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[900px] w-[90%]">
        <DialogHeader>
          <DialogTitle>{titleDialog}</DialogTitle>
        </DialogHeader>
        <div className="max-h-[75vh] overflow-y-auto px-2">{children}</div>
      </DialogContent>
    </Dialog>
  );
};

export default CustomDialog;
