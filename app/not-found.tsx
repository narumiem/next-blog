import Container from '@/app/_components/container';
import Hero from '@/app/_components/hero';

function NotFoundBoundary(): React.ReactElement {
  return (
    <>
      <title>404: ページが見つかりません</title>
      <Container>
        <Hero title="404" subtitle="お探しのページは見つかりませんでした。" />
      </Container>
    </>
  );
}

export default NotFoundBoundary;
