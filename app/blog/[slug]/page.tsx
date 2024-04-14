import PostBody from '@/app/_components/post-body';
import PostCategories from '@/app/_components/post-categories';
import PostHeader from '@/app/_components/post-header';
import TwoColumn from '@/app/_components/two-column';
import { htmlToText } from '@/app/_lib/html-to-text';
import { openGraphMetadata, siteMetadata, twitterMetadata } from '@/app/_lib/metadata';
import { getImageBlurData } from '@/app/_lib/plaiceholder';
import { getPrevAndNextPosts } from '@/app/_lib/prev-next-post';
import Pagination from '@/app/_components/pagination';
import type { Metadata } from 'next';
import { BLOG_PATH, eyecatchDefault } from '@/app/_const/site-config';
import { getAllPosts, getPostBySlug } from '@/app/_lib/apollo-client';
import PostTags from '@/app/_components/post-tags';
import PostEyecatch from '@/app/_components/post-eyecatch';
import ParseHTML from '@/app/_lib/html-react-parser';

// Define the interface for the static parameters
interface StaticParams {
  slug: string; 
}

// Define the interface for the dynamic parameters
interface Param {
  params: {
    slug: string;
  };
}

// Set the flag for dynamic parameters to false
export const dynamicParams = false; 

/**
 * Generate static parameters for the dynamic route.
 * @returns An array of static parameters.
 */
export async function generateStaticParams(): Promise<StaticParams[]> {
  const allslugs = (await getAllPosts()) ?? [];
  return allslugs.map(({ slug }) => ({ slug })); 
}

/**
 * Generate metadata for the dynamic route.
 * @param params - The dynamic parameters.
 * @returns The metadata for the page.
 */
export async function generateMetadata({ params }: Param): Promise<Metadata | undefined> {
  const { siteTitle, siteTitlePipe, siteUrl } = siteMetadata; 
  const post = await getPostBySlug(params.slug); 
  if (!post) return undefined;
  const description = htmlToText(post.content ? post.content : '');
  const ogpTitle = `${post.title} ${siteTitlePipe} ${siteTitle}`; 
  const pathName = `/${BLOG_PATH}/${post.slug}`; 
  const ogpUrl = new URL(pathName, siteUrl).toString();
  const eyecatch = post.featuredImage?.node ?? eyecatchDefault;
  const ogpImage = new URL(eyecatch.mediaItemUrl, siteUrl).toString();
  const ogpImageWidth = eyecatch.mediaDetails.width;
  const ogpImageHeight = eyecatch.mediaDetails.height;

  const metadata = {
    title: post.title,
    alternates: {
      canonical: ogpUrl,
    },
    description: description,
    openGraph: {
      ...openGraphMetadata,
      title: ogpTitle,
      description: description,
      url: ogpUrl,
      images: [
        {
          url: ogpImage,
          width: ogpImageWidth,
          height: ogpImageHeight,
        },
      ],
    },
    twitter: {
      ...twitterMetadata,
      title: ogpTitle,
      description: description,
      images: [ogpImage],
    },
  };
  return metadata;
}

/**
 * Render the post page.
 * @param params - The dynamic parameters.
 * @returns The rendered post page.
 */
async function Post({ params }: Param): Promise<React.ReactElement | undefined> {
  const subtitle = 'Blog Article';
  const post = await getPostBySlug(params.slug);
  if (!post) return <p>Post not found.</p>;
  const eyecatch = post.featuredImage?.node ?? eyecatchDefault;
  const blurDataURL = await getImageBlurData(eyecatch.mediaItemUrl);
  const allPosts = (await getAllPosts()) ?? [];
  if (!allPosts) return <p>No posts available.</p>;
  const [prevPost, nextPost] = getPrevAndNextPosts(allPosts, post.slug);

  return (
    <>
      <article>
        <PostHeader title={post.title} subtitle={subtitle} publishDate={post.dateGmt} />
        <PostEyecatch
          src={eyecatch.mediaItemUrl}
          alt={eyecatch.altText}
          priority
          blurDataURL={blurDataURL}
        />
        <TwoColumn>
          <TwoColumn.Main>
            <PostBody>
              <ParseHTML contentHTML={post.content ?? ''} />
            </PostBody>
          </TwoColumn.Main>

          <TwoColumn.Sidebar>
            <PostCategories categories={post.categories.nodes ?? []} />
            <PostTags tags={post.tags.nodes ?? []} />
          </TwoColumn.Sidebar>
        </TwoColumn>
        <Pagination
          prevText={prevPost?.title}
          prevUrl={`/${BLOG_PATH}/${prevPost?.slug}`}
          nextText={nextPost?.title}
          nextUrl={`/${BLOG_PATH}/${nextPost?.slug}`}
        />
      </article>
    </>
  );
}

export default Post;
