'use client';
import styles from '@/app/_components/accordion.module.css';
import { faCircleChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ReactNode, useRef, useState } from 'react';

// Define the props interface for the Accordion component
interface AccordionProps {
  heading: string; // The heading of the accordion
  children: ReactNode; // The content of the accordion
}

/**
 * Accordion component that can be toggled open or closed.
 * @param {AccordionProps} props - The props for the Accordion component.
 * @returns {React.ReactElement} The rendered Accordion component.
 */
function Accordion({ heading, children }: AccordionProps): React.ReactElement {
  const [textIsOpen, setTextIsOpen] = useState<boolean>(false); // State to track whether the accordion content is open or closed
  const toggleText = () => {
    setTextIsOpen((prev) => !prev); // Toggle the state of textIsOpen
  };
  const refText = useRef<HTMLDivElement & { scrollHeight: number }>(null!); // Reference to the text content div with scrollHeight property

  return (
    <div className={textIsOpen ? styles.open : styles.close}>
      <h3 className={styles.heading}>
        <button onClick={toggleText}>
          {heading}
          <FontAwesomeIcon icon={faCircleChevronDown} className={styles.icon} />
        </button>
      </h3>
      <div
        className={styles.text}
        ref={refText}
        style={
          {
            '--text-height': `${refText.current?.scrollHeight}px`,
          } as React.CSSProperties
        }
      >
        <div className={styles.textInner}>{children}</div>
      </div>
    </div>
  );
}

export default Accordion;
