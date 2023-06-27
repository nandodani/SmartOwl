import React, { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import {
  Cross2Icon,
  ChevronDownIcon,
  ChevronUpIcon,
  CheckIcon,
} from "@radix-ui/react-icons";
import * as Select from "@radix-ui/react-select";
import classnames from "classnames";

const ModalSelect = ({
  onClose,
  onConfirm,
  open,
  title,
  description,
  confirmText,
  initialValue,
}) => {
  const [selectedLanguage, setSelectedLanguage] = useState(initialValue?.language || "");
  const [selectedCategory, setSelectedCategory] = useState(initialValue?.category || "");

  const handleConfirm = () => {
    console.log(selectedLanguage, selectedCategory);
    onConfirm(selectedLanguage, selectedCategory);
    onClose();
  };

  const handleClose = () => {
    onClose();
  };

  const SelectItem = React.forwardRef(
    ({ children, className, ...props }, forwardedRef) => {
      return (
        <Select.Item
          className={classnames("SelectItem", className)}
          {...props}
          ref={forwardedRef}
        >
          <Select.ItemText>{children}</Select.ItemText>
          <Select.ItemIndicator className="SelectItemIndicator">
            <CheckIcon />
          </Select.ItemIndicator>
        </Select.Item>
      );
    }
  );

  return (
    <Dialog.Root open={open} onOpenChange={handleClose}>
      <Dialog.Overlay className="Modal-DialogOverlay" />
      <Dialog.Content className="Modal-DialogContent">
        <Dialog.Title className="Modal-DialogTitle">{title}</Dialog.Title>
        <Dialog.Description className="Modal-DialogDescription"> {description} </Dialog.Description>
        <h6 className="mb-3">Languages:</h6>
        <Select.Root value={selectedLanguage} onValueChange={setSelectedLanguage}>
          <Select.Trigger className="SelectTrigger" aria-label="Language">
            <Select.Value placeholder="Select a language..." />
            <Select.Icon className="SelectIcon">
              <ChevronDownIcon />
            </Select.Icon>
          </Select.Trigger>
          <Select.Portal>
            <Select.Content className="SelectContent">
              <Select.ScrollUpButton className="SelectScrollButton">
                <ChevronUpIcon />
              </Select.ScrollUpButton>
              <Select.Viewport className="SelectViewport">
                <Select.Group>
                  <Select.Label className="SelectLabel">Languages</Select.Label>
                  <Select.Separator className="SelectSeparator" />
                  <SelectItem value="ar">Arabic</SelectItem>
                  <SelectItem value="de">German</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Spanish</SelectItem>
                  <SelectItem value="fr">French</SelectItem>
                  <SelectItem value="he">Hebrew</SelectItem>
                  <SelectItem value="it">Italian</SelectItem>
                  <SelectItem value="nl">Dutch</SelectItem>
                  <SelectItem value="no">Norwegian</SelectItem>
                  <SelectItem value="pt">Portuguese</SelectItem>
                  <SelectItem value="ru">Russian</SelectItem>
                  <SelectItem value="sv">Swedish</SelectItem>
                  <SelectItem value="zh">Chinese</SelectItem>
                </Select.Group>
              </Select.Viewport>
              <Select.ScrollDownButton className="SelectScrollButton">
                <ChevronDownIcon />
              </Select.ScrollDownButton>
            </Select.Content>
          </Select.Portal>
        </Select.Root>

        <h6 className="mb-3">Category:</h6>
        <Select.Root value={selectedCategory} onValueChange={setSelectedCategory}>
          <Select.Trigger className="SelectTrigger" aria-label="Category">
            <Select.Value placeholder="Select a category..." />
            <Select.Icon className="SelectIcon">
              <ChevronDownIcon />
            </Select.Icon>
          </Select.Trigger>
          <Select.Portal>
            <Select.Content className="SelectContent">
              <Select.ScrollUpButton className="SelectScrollButton">
                <ChevronUpIcon />
              </Select.ScrollUpButton>
              <Select.Viewport className="SelectViewport">
                <Select.Group>
                  <Select.Label className="SelectLabel">Category</Select.Label>
                  <Select.Separator className="SelectSeparator" />
                  <SelectItem value="business">Business</SelectItem>
                  <SelectItem value="entertainment">Entertainment</SelectItem>
                  <SelectItem value="general">General</SelectItem>
                  <SelectItem value="health">Health</SelectItem>
                  <SelectItem value="science">Science</SelectItem>
                  <SelectItem value="sports">Sports</SelectItem>
                  <SelectItem value="technology">Technology</SelectItem>
                </Select.Group>
              </Select.Viewport>
              <Select.ScrollDownButton className="SelectScrollButton">
                <ChevronDownIcon />
              </Select.ScrollDownButton>
            </Select.Content>
          </Select.Portal>
        </Select.Root>
        <Dialog.Close asChild>
          <button className="Button green" onClick={handleConfirm}>
            {confirmText}
          </button>
        </Dialog.Close>
        <Dialog.Close asChild>
          <button
            className="Modal-IconButton"
            aria-label="Close"
            onClick={handleClose}
          >
            <Cross2Icon />
          </button>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default ModalSelect;
