import * as Accordion from '@radix-ui/react-accordion'
import { ChevronDownIcon } from '@radix-ui/react-icons'
import React from 'react'

const AccordionTrigger = React.forwardRef<HTMLButtonElement, Accordion.AccordionTriggerProps>(
  ({ children, className, ...props }, forwardedRef) => (
    <Accordion.Header>
      <Accordion.Trigger className={cn(className)} {...props} ref={forwardedRef}>
        {children}
        <ChevronDownIcon aria-hidden />
      </Accordion.Trigger>
    </Accordion.Header>
  ),
)

const AccordionContent = React.forwardRef<HTMLDivElement, Accordion.AccordionContentProps>(
  ({ children, className, ...props }, forwardedRef) => (
    <Accordion.Content className={cn(className)} {...props} ref={forwardedRef}>
      <div>{children}</div>
    </Accordion.Content>
  ),
)

const AccordionItem = React.forwardRef<HTMLDivElement, Accordion.AccordionItemProps>(
  ({ children, className, ...props }, forwardedRef) => (
    <Accordion.Item className={cn(className)} {...props} ref={forwardedRef}>
      <div>{children}</div>
    </Accordion.Item>
  ),
)
export { AccordionContent, AccordionItem, AccordionTrigger }
