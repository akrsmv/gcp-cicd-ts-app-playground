

import { MutableRefObject, useCallback, useEffect, useRef, useState } from "react";
import { useWhatIsHoveredStore } from "../stores/HoveredElementStore";


/**
 * modified version of https://usehooks.com/useHover/ wich puts the id of parent element into global store
 * I use it to track where the mouse is, and to show some info in the footer
 * 
 * hook returns tuple(array) with type [any, boolean]
 * And also stores the id of the parent of the element in which the hook is used
 * 
 * T - could be any type of HTML element like: HTMLDivElement, HTMLParagraphElement and etc.
 **/ 
export function useHover<T>(): [MutableRefObject<T>, boolean] {
    const [value, setValue] = useState<boolean>(false); 
    const ref: any = useRef<T | null>(null);
    const handleMouseOver = (e:any): void => {
      if (e.toElement?.id) {
        updateWhatIsHovered(e.toElement?.id)
      }
      setValue(true);
    }
    const handleMouseOut = (): void => {
      // updateWhatIsHovered('') // TODO,make it more reactive, let subscribers of the store know something changed
      setValue(false);
    }
    
    const hoveredStore = useWhatIsHoveredStore()
    const updateWhatIsHovered = useCallback(
      (whatIsHovered: string) => hoveredStore.update(whatIsHovered), [ref.current])

    useEffect(
      () => {
        const node: any = ref.current;
        if (node) {
          node.addEventListener("mouseover", handleMouseOver);
          node.addEventListener("mouseout", handleMouseOut);
          return () => {
            node.removeEventListener("mouseover", handleMouseOver);
            node.removeEventListener("mouseout", handleMouseOut);
          };
        }
      },
      [ref.current] // Recall only if ref changes
    );
    return [ref, value];
  }