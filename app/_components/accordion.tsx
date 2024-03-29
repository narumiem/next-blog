'use client';
import styles from '@/app/_components/accordion.module.css';
import { faCircleChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ReactNode, useRef, useState } from 'react';

interface AccordionProps {
  heading: string;
  children: ReactNode;
}

function Accordion({ heading, children }: AccordionProps): React.ReactElement {
  const [textIsOpen, setTextIsOpen] = useState<boolean>(false);
  const toggleText = () => {
    setTextIsOpen((prev) => !prev);
  };
  const refText = useRef<HTMLDivElement & { scrollHeight: number }>(null!);

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
