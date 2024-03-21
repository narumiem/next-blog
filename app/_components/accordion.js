'use client';
import styles from '@/app/_components/accordion.module.css';
import { faCircleChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRef, useState } from 'react';

export default function Accordion({ heading, children }) {
  const [textIsOpen, setTextIsOpen] = useState(false);
  const toggleText = () => {
    setTextIsOpen((prev) => !prev);
  };
  const refText = useRef({ scrollHeight: 0 });

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
        style={{
          '--text-height': `${refText.current.scrollHeight}px`,
        }}
      >
        <div className={styles.textInner}>{children}</div>
      </div>
    </div>
  );
}
