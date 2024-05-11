import React, { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

interface MeetingProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  cls?: string;
  children?: ReactNode;
  click?: () => void;
  buttonTxt?: string;
  image?:string;
  buttonIcon?:string;
}
const MeetingModal = ({
  isOpen,
  onClose,
  title,
  cls,
  children,
  click,
  buttonTxt,
  image,
  buttonIcon,
}: MeetingProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className=" flex w-full max-w-[520px] flex-col gap-6 border-none bg-dark-1 px-6 py-9 text-white">
        <div className="flex flex-col gap-6"> 
          {image && (
            <div className="flex justify-center">
              <Image 
                src={image}
                alt="image"
                height={72} width={72}
              />  
            </ div>
          
          ) }
          <h1 className={cn('text-3xl font-bold leading-[42px]')}>{title}</h1>
          {children}
          <Button className="bg-blue-500 hover:bg-blue-600" onClick={click} >
            {buttonIcon && (
              <Image src={buttonIcon} alt="btn" width={13} height={13} />
            )} &nbsp;
            {buttonTxt || 'schedule Meeting'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MeetingModal;
