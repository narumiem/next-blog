import Contact from '@/app/_components/contact';
import Container from '@/app/_components/container';
import Hero from '@/app/_components/hero';
import PostBody from '@/app/_components/post-body';
import TwoColumn from '@/app/_components/two-column';
import Image from 'next/image';
import { siteMeta } from '@/app/_const/site-meta';
import { openGraphMetadata, twitterMetadata } from '@/app/_lib/base-metadata';
import Accordion from '@/app/_components/accordion';

const pageTitle = 'アバウト';
const pageDesc = 'About development activities';
const pathName = '/about';
const pageImage = {
  src: '/images/about.jpg',
  width: 1920,
  height: 960,
};

const { siteTitle, siteTitlePipe, siteUrl } = siteMeta;
const ogpTitle = `${pageTitle} ${siteTitlePipe} ${siteTitle}`;
const ogpUrl = new URL(pathName, siteUrl).toString();
const ogpImage = new URL(pageImage.src, siteUrl).toString();

export const metadata = {
  title: pageTitle,
  alternates: {
    canonical: ogpUrl,
  },
  description: pageDesc,
  openGraph: {
    ...openGraphMetadata,
    title: ogpTitle,
    description: pageDesc,
    url: ogpUrl,
    images: [
      {
        url: ogpImage,
        width: pageImage.width,
        height: pageImage.height,
      },
    ],
  },
  twitter: {
    ...twitterMetadata,
    title: ogpTitle,
    description: pageDesc,
    images: [ogpImage],
  },
};

function About(): React.ReactElement {
  return (
    <Container>
      <Hero title="About" subtitle="About development activities" />

      <figure>
        <Image
          src={pageImage.src}
          width={pageImage.width}
          height={pageImage.height}
          alt=""
          sizes="(min-width: 1152px) 1152px, 100vw"
          style={{
            maxWidth: '100%',
            height: 'auto',
          }}
          priority
          placeholder="blur"
          blurDataURL={pageImage.src}
        />
      </figure>

      <TwoColumn>
        <TwoColumn.Main>
          <PostBody>
            <p>
              Cubeが得意とする分野はモノづくりです。3次元から2次元の造形、プログラミングやデザインなど、さまざまな技術を組み合わせることによって社会や環境と結びつけるクリエイティブを提案し続けています。
            </p>
            <h2>モノづくりで目指していること</h2>
            <p>
              モノづくりではデータの解析からクリエイティブまで幅広いことを担当しています。新しいことを取り入れながら、ユーザーにマッチした提案を実現するのが目標です。たくさんの開発・提供が数多くありますが、特にそこを磨く作業に力を入れています。
            </p>
            <p>
              単純に形にするだけでなく、作る過程や、なぜそのようにしたのかを大事にしながらものづくりをしています。毎回課題解決テーマをもって「モノ」と向き合い制作をし、フィードバックしてもらうことで自分の中にあるモヤモヤを言葉にして「問い」への答えを出しています。
            </p>
            <h3>新しいことへのチャレンジ</h3>
            <p>
              今までと違うものを作ることで愛着が湧いてきます。そこで興味を持ったことは小さなことでもいいから取り入れて、良いものを作れるようにしています。小さなヒントから新しいものを生み出すようなモノづくりは、これからも続けていきたいです。
            </p>

            <h2>FAQ</h2>
            <Accordion heading="プログラミングのポイントについて">
              <p>
                プログラミングのポイントは、作りたいものを作ることです。楽しいことから思いつき、目標とゴールを決め、そこに向かってさまざまな課題を設定していきながら、プログラムを作っていきます。
              </p>
            </Accordion>
            <Accordion heading="古代語の解読について">
              <p>
                古代語を解読するのに必要なのは、書かれた文字そのものだけです。古代の世界観や思考方法。それらを読み取ってこそ古代の世界観が理解できてきます。
              </p>
            </Accordion>
            <Accordion heading="公開リポジトリの活用について">
              <p>
                公開リポジトリを活用すると、全世界のどこからでもアクセスし、開発者が関連するプロジェクトのタスクを利用することができます。
              </p>
            </Accordion>
          </PostBody>
        </TwoColumn.Main>

        <TwoColumn.Sidebar>
          <Contact />
        </TwoColumn.Sidebar>
      </TwoColumn>
    </Container>
  );
}

export default About;
