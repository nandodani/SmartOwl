import React from "react";
import * as Accordion from "@radix-ui/react-accordion";
import classNames from "classnames";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import "../assets/styles/faq.css";

const AccordionFAQ = () => (
  <Accordion.Root
    className="AccordionRoot"
    type="single"
    defaultValue="item-1"
    collapsible
  >
    <Accordion.Item className="AccordionItem" value="item-1">
      <AccordionTrigger>What is SmartOwl?</AccordionTrigger>
      <AccordionContent>
        Yes. It adheres to the WAI-ARIA design pattern.
      </AccordionContent>
    </Accordion.Item>

    <Accordion.Item className="AccordionItem" value="item-2">
      <AccordionTrigger>
        How do I setup Smartowl as my browser startpage?
      </AccordionTrigger>
      <AccordionContent>
        Yes. It's unstyled by default, giving you freedom over the look and
        feel.Yes. It's unstyled by default, giving you freedom over the look and
        feel.Yes. It's unstyled by default, giving you freedom over the look and
        feel.Yes. It's unstyled by default, giving you freedom over the look and
        feel.Yes. It's unstyled by default, giving you freedom over the look and
        feel.Yes. It's unstyled by default, giving you freedom over the look and
        feel.Yes. It's unstyled by default, giving you freedom over the look and
        feel.Yes. It's unstyled by default, giving you freedom over the look and
        feel.Yes. It's unstyled by default, giving you freedom over the look and
        feel.Yes. It's unstyled by default, giving you freedom over the look and
        feel.Yes. It's unstyled by default, giving you freedom over the look and
        feel.Yes. It's unstyled by default, giving you freedom over the look and
        feel.Yes. It's unstyled by default, giving you freedom over the look and
        feel.Yes. It's unstyled by default, giving you freedom over the look and
        feel.Yes. It's unstyled by default, giving you freedom over the look and
        feel.Yes. It's unstyled by default, giving you freedom over the look and
        feel.Yes. It's unstyled by default, giving you freedom over the look and
        feel.Yes. It's unstyled by default, giving you freedom over the look and
        feel.Yes. It's unstyled by default, giving you freedom over the look and
        feel.Yes. It's unstyled by default, giving you freedom over the look and
        feel.Yes. It's unstyled by default, giving you freedom over the look and
        feel.Yes. It's unstyled by default, giving you freedom over the look and
        feel.Yes. It's unstyled by default, giving you freedom over the look and
        feel.Yes. It's unstyled by default, giving you freedom over the look and
        feel.Yes. It's unstyled by default, giving you freedom over the look and
        feel.Yes. It's unstyled by default, giving you freedom over the look and
        feel.Yes. It's unstyled by default, giving you freedom over the look and
        feel.Yes. It's unstyled by default, giving you freedom over the look and
        feel.Yes. It's unstyled by default, giving you freedom over the look and
        feel.Yes. It's unstyled by default, giving you freedom over the look and
        feel.Yes. It's unstyled by default, giving you freedom over the look and
        feel.Yes. It's unstyled by default, giving you freedom over the look and
        feel.Yes. It's unstyled by default, giving you freedom over the look and
        feel.Yes. It's unstyled by default, giving you freedom over the look and
        feel.Yes. It's unstyled by default, giving you freedom over the look and
        feel.Yes. It's unstyled by default, giving you freedom over the look and
        feel.Yes. It's unstyled by default, giving you freedom over the look and
        feel.Yes. It's unstyled by default, giving you freedom over the look and
        feel.Yes. It's unstyled by default, giving you freedom over the look and
        feel.Yes. It's unstyled by default, giving you freedom over the look and
        feel.Yes. It's unstyled by default, giving you freedom over the look and
        feel.Yes. It's unstyled by default, giving you freedom over the look and
        feel.Yes. It's unstyled by default, giving you freedom over the look and
        feel.Yes. It's unstyled by default, giving you freedom over the look and
        feel.Yes. It's unstyled by default, giving you freedom over the look and
        feel.Yes. It's unstyled by default, giving you freedom over the look and
        feel.Yes. It's unstyled by default, giving you freedom over the look and
        feel.Yes. It's unstyled by default, giving you freedom over the look and
        feel.Yes. It's unstyled by default, giving you freedom over the look and
        feel.Yes. It's unstyled by default, giving you freedom over the look and
        feel.Yes. It's unstyled by default, giving you freedom over the look and
        feel.Yes. It's unstyled by default, giving you freedom over the look and
        feel.Yes. It's unstyled by default, giving you freedom over the look and
        feel.Yes. It's unstyled by default, giving you freedom over the look and
        feel.
      </AccordionContent>
    </Accordion.Item>

    <Accordion.Item className="AccordionItem" value="item-3">
      <AccordionTrigger>How do I create a SmartOwl account?</AccordionTrigger>
      <Accordion.Content className="AccordionContent">
        <div className="AccordionContentText">
          Yes! You can animate the Accordion with CSS or JavaScript.
        </div>
      </Accordion.Content>
    </Accordion.Item>

    <Accordion.Item className="AccordionItem" value="item-4">
      <AccordionTrigger>Is SmartOwl free to use?</AccordionTrigger>
      <Accordion.Content className="AccordionContent">
        <div className="AccordionContentText">
          Yes! You can animate the Accordion with CSS or JavaScript.
        </div>
      </Accordion.Content>
    </Accordion.Item>

    <Accordion.Item className="AccordionItem" value="item-5">
      <AccordionTrigger>How do I delete my SmartOwl account?</AccordionTrigger>
      <Accordion.Content className="AccordionContent">
        <div className="AccordionContentText">
          Yes! You can animate the Accordion with CSS or JavaScript.
        </div>
      </Accordion.Content>
    </Accordion.Item>

    <Accordion.Item className="AccordionItem" value="item-6">
      <AccordionTrigger>Can I use SmartOwl on mobile devices?</AccordionTrigger>
      <Accordion.Content className="AccordionContent">
        <div className="AccordionContentText">
          Yes! You can animate the Accordion with CSS or JavaScript.
        </div>
      </Accordion.Content>
    </Accordion.Item>

    <Accordion.Item className="AccordionItem" value="item-7">
      <AccordionTrigger>How do I reset my SmartOwl password?</AccordionTrigger>
      <Accordion.Content className="AccordionContent">
        <div className="AccordionContentText">
          Yes! You can animate the Accordion with CSS or JavaScript.
        </div>
      </Accordion.Content>
    </Accordion.Item>
  </Accordion.Root>
);

const AccordionTrigger = React.forwardRef(
  ({ children, className, ...props }, forwardedRef) => (
    <Accordion.Header className="AccordionHeader">
      <Accordion.Trigger
        className={classNames("AccordionTrigger", className)}
        {...props}
        ref={forwardedRef}
      >
        {children}
        <ChevronDownIcon className="AccordionChevron" aria-hidden />
      </Accordion.Trigger>
    </Accordion.Header>
  )
);

const AccordionContent = React.forwardRef(
  ({ children, className, ...props }, forwardedRef) => (
    <Accordion.Content
      className={classNames("AccordionContent", className)}
      {...props}
      ref={forwardedRef}
    >
      <div className="AccordionContentText">{children}</div>
    </Accordion.Content>
  )
);

export default AccordionFAQ;
