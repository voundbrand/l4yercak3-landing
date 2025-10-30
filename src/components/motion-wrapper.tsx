"use client";

import { motion, MotionProps } from "framer-motion";
import { ReactNode, forwardRef } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface MotionWrapperProps extends MotionProps {
  children: ReactNode;
  as?: keyof typeof motion;
}

export const MotionWrapper = forwardRef<HTMLElement, MotionWrapperProps>(
  ({ children, as = "div", ...props }, ref) => {
    const prefersReducedMotion = useReducedMotion();
    const MotionComponent = motion[as] as any;

    if (prefersReducedMotion) {
      // Strip out motion props and render as regular element
      const {
        initial,
        animate,
        exit,
        variants,
        transition,
        whileHover,
        whileTap,
        whileFocus,
        whileInView,
        layout,
        layoutId,
        ...restProps
      } = props;

      const Component = as as any;
      return (
        <Component ref={ref} {...restProps}>
          {children}
        </Component>
      );
    }

    return (
      <MotionComponent ref={ref} {...props}>
        {children}
      </MotionComponent>
    );
  }
);

MotionWrapper.displayName = "MotionWrapper";