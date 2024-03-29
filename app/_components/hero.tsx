import styles from '@/app/_components/hero.module.css';
import Image from 'next/image';

interface HeroProps {
  title: string;
  subtitle: string;
  imageOn?: boolean;
}

function Hero({
  title,
  subtitle,
  imageOn = false,
}: HeroProps): React.ReactElement {
  return (
    <div className={styles.flexContainer}>
      <div className={styles.text}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.subtitle}>{subtitle}</p>
      </div>
      {imageOn && (
        <figure>
          <Image
            src="/images/cube.jpg"
            width={1500}
            height={1300}
            alt=""
            sizes="(min-width: 1152px) 576px, (min-width: 768px) 50vw, 100vw"
            style={{
              maxWidth: '100%',
              height: 'auto',
            }}
            priority
            placeholder="blur"
            blurDataURL="/images/cube.jpg"
          />
        </figure>
      )}
    </div>
  );
}

export default Hero;
