'use client';
import { cn } from '@/lib/utils';
import { FileIcon, SendIcon } from 'lucide-react';
import * as React from 'react';

interface UseAutosizeTextAreaProps {
  textAreaRef: HTMLTextAreaElement | null;
  minHeight?: number;
  maxHeight?: number;
  triggerAutoSize: string;
}

export const useAutosizeTextArea = ({
  textAreaRef,
  triggerAutoSize,
  maxHeight = Number.MAX_SAFE_INTEGER,
  minHeight = 0,
}: UseAutosizeTextAreaProps) => {
  React.useEffect(() => {
    if (textAreaRef) {
      // Reset height to get the correct scrollHeight
      textAreaRef.style.height = 'auto';
      textAreaRef.style.minHeight = `${minHeight}px`;
      textAreaRef.style.maxHeight = `${maxHeight}px`;

      // Adjust height based on scrollHeight
      const scrollHeight = textAreaRef.scrollHeight;
      if (scrollHeight > maxHeight) {
        textAreaRef.style.height = `${maxHeight}px`;
      } else {
        textAreaRef.style.height = `${scrollHeight}px`;
      }
    }
  }, [textAreaRef, triggerAutoSize, maxHeight, minHeight]);
};

export type AutosizeTextAreaRef = {
  textArea: HTMLTextAreaElement;
  maxHeight: number;
  minHeight: number;
};

type AutosizeTextAreaProps = {
  maxHeight?: number;
  minHeight?: number;
  onFileChange?: (files: File[]) => void;
  onSendMessage?: (message: string, attachments: File[]) => void; // Send message callback
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const AutosizeTextarea = React.forwardRef<AutosizeTextAreaRef, AutosizeTextAreaProps>(
  (
    {
      maxHeight = Number.MAX_SAFE_INTEGER,
      minHeight = 20,
      className,
      onChange,
      value,
      onFileChange,
      onSendMessage, // Callback for sending the message
      ...props
    }: AutosizeTextAreaProps,
    ref: React.Ref<AutosizeTextAreaRef>,
  ) => {
    const textAreaRef = React.useRef<HTMLTextAreaElement | null>(null);
    const [triggerAutoSize, setTriggerAutoSize] = React.useState('');
    const [attachments, setAttachments] = React.useState<File[]>([]);

    useAutosizeTextArea({
      textAreaRef: textAreaRef.current,
      triggerAutoSize: triggerAutoSize,
      maxHeight,
      minHeight,
    });

    React.useImperativeHandle(ref, () => ({
      textArea: textAreaRef.current as HTMLTextAreaElement,
      focus: () => textAreaRef.current?.focus(),
      maxHeight,
      minHeight,
    }));

    React.useEffect(() => {
      setTriggerAutoSize(value as string);
    }, [value]);

    const handleAttachmentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const files = Array.from(e.target.files);
        setAttachments((prev) => [...prev, ...files]);
        onFileChange?.(files);
      }
    };

    const handleRemoveAttachment = (index: number) => {
      setAttachments((prev) => prev.filter((_, i) => i !== index));
    };

    const handleSendMessage = () => {
      if (onSendMessage && value) {
        onSendMessage(value as string, attachments);
        // Reset after sending
        setTriggerAutoSize('');
        setAttachments([]);
      }
    };

    return (
      <div className="relative w-full">
        <div className='flex items-center w-ful justify-between'>
          <textarea
            {...props}
            value={value}
            ref={textAreaRef}
            className={cn(
              'flex w-full min-h-14 resize-none overflow-hidden rounded-md px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
              className,
            )}
            onChange={(e) => {
              setTriggerAutoSize(e.target.value);
              onChange?.(e);
            }}
          />
          {/* Send Message Button */}
          <div className={`${ !value ? "hidden" : "" } flex justify-end items-center absolute right-0`}>
            <button
              type="button"
              aria-label="Send Message"
              aria-disabled={!value}
              disabled={!value}
              className={` h-full w-full flex justify-center items-center text-white px-2 mr-4 py-2 bg-blue-700 hover:bg-blue-600 transition-all ease-linear duration-100 rounded-full `}
              onClick={handleSendMessage}
            >
              <SendIcon className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Attachments section */}
        {attachments.length > 0 && (
          <div className="mt-2 space-y-2">
            {attachments.map((file, index) => (
              <div key={index} className="flex items-center space-x-2">
                <span className="text-sm text-gray-700 truncate">{file.name}</span>
                <button
                  onClick={() => handleRemoveAttachment(index)}
                  className="text-xs text-red-600 hover:underline"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Attachment input */}
        <div className="mt-2">
          <label className="cursor-pointer text-sm text-blue-600 hover:underline">
            <FileIcon className="inline-block mr-1" />
            <input
              type="file"
              multiple
              className="hidden"
              onChange={handleAttachmentChange}
            />
          </label>
        </div>
      </div>
    );
  },
);

AutosizeTextarea.displayName = 'AutosizeTextarea';
