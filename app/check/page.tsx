import Container from '@/app/_components/container';
import { getAllCategories, getAllPosts, getAllPostsByCategory, getAllPostsByTag, getAllSlugs, getAllTags, getCategoryBySlug, getPostBySlug, getTagBySlug } from '@/app/_lib/apollo-client';
import ConvertDate from '@/app/_lib/dayjs';
import ParseHTML from '@/app/_lib/html-react-parser';

async function APITest(): Promise<React.ReactElement> {

  const slug = 'recipe';
  const posts = await getAllPosts(4);
  if (!posts) return <p>no post.</p>;


  return (
    <Container>
      {/* <h1>{title}</h1> */}
      {/* <p>
        <span>投稿日: </span>
        <ConvertDate dateISO={dateGmt} />
      </p>
      <p>
        <span>更新日:</span>
        <ConvertDate dateISO={modifiedGmt} />
      </p> */}
      <hr />
      {/* <p>カテゴリー</p>
      <ul>
        {categories.map(({ databaseId, name }) => (
          <li key={id}>・{name}</li>
        ))}
      </ul> */}
      {/* <p>タグ</p>
      <ul>
        {tags.map(({ databaseId, name }) => (
          <li key={id}>・{name}</li>
        ))}
      </ul> */}
      <hr />
      {/* <ParseHTML contentHTML={content} /> */}
      <hr />
      {/* {slugs.map(({ databaseId, slug, title }) => (
        <p key={id}>{slug} : {title}</p>
      ))} */}
      <hr />
      {posts.map(({ id, slug,title }) => (
        <p key={id}>・{slug} : {title}</p>
      ))}
    </Container>
  );
}
export default APITest;
