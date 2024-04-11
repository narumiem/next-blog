import PostBody from '@/app/_components/post-body';
import PostCategories from '@/app/_components/post-categories';
import PostHeader from '@/app/_components/post-header';
import TwoColumn from '@/app/_components/two-column';
import { htmlToText } from '@/app/_lib/html-to-text';
import { siteMeta } from '@/app/_const/site-meta';
import { openGraphMetadata, twitterMetadata } from '@/app/_lib/base-metadata';
import { getImageBlurData } from '@/app/_lib/plaiceholder';
import { getPrevAndNextPosts } from '@/app/_lib/prev-next-post';
import Pagination from '@/app/_components/pagination';
import type { Metadata } from 'next';
import { BLOG_PATH, eyecatchDefault } from '@/app/_const/site-config';
import { getAllPosts, getPostBySlug } from '@/app/_lib/apollo-client';
import PostTags from '@/app/_components/post-tags';
import PostEyecatch from '@/app/_components/post-eyecatch';
import ParseHTML from '@/app/_lib/html-react-parser';

interface StaticParams {
  slug: string; // Slug of the post
}
interface Param {
  params: {
    slug: string; // Dynamic parameter for post slug
  };
}

export const dynamicParams = false; // Indicates static generation does not use dynamic params

// Generates static parameters for post pages
export async function generateStaticParams(): Promise<StaticParams[]> {
  const allslugs = (await getAllPosts()) ?? []; // Fetch all posts
  return allslugs.map(({ slug }) => ({ slug })); // Return slugs for static paths
}

// Generates metadata for each post page
export async function generateMetadata({ params }: Param): Promise<Metadata | undefined> {
  const { siteTitle, siteTitlePipe, siteUrl } = siteMeta; // Site metadata
  const post = await getPostBySlug(params.slug); // Fetch post by slug
  if (!post) return undefined; // Return undefined if post does not exist
  const description = htmlToText(post.content ? post.content : ''); // Convert post content to text for description
  const ogpTitle = `${post.title} ${siteTitlePipe} ${siteTitle}`; // OGP title
  const pathName = `/${BLOG_PATH}/${post.slug}`; // Path for the current post
  const ogpUrl = new URL(pathName, siteUrl).toString(); // Full OGP URL
  const eyecatch = post.featuredImage?.node ?? eyecatchDefault; // Use post's featured image or default
  const ogpImage = new URL(eyecatch.mediaItemUrl, siteUrl).toString(); // Full image URL for OGP
  const ogpImageWidth = eyecatch.mediaDetails.width; // Image width for OGP
  const ogpImageHeight = eyecatch.mediaDetails.height; // Image height for OGP

  // Combined metadata object
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

// Main Post component
async function Post({ params }: Param): Promise<React.ReactElement | undefined> {
  const subtitle = 'Blog Article'; // Subtitle for the post
  const post = await getPostBySlug(params.slug); // Fetch post by slug
  if (!post) return <p>Post not found.</p>; // Display message if post does not exist
  const eyecatch = post.featuredImage?.node ?? eyecatchDefault; // Use post's featured image or default
  const blurDataURL = await getImageBlurData(eyecatch.mediaItemUrl); // Get blur data URL for the eyecatch image
  const allPosts = (await getAllPosts()) ?? []; // Fetch all posts
  if (!allPosts) return <p>No posts available.</p>; // Display message if no posts are available
  const [prevPost, nextPost] = getPrevAndNextPosts(allPosts, post.slug); // Get previous and next posts

  // Render post page
  return (
    <>
      <article>
        <PostHeader title={post.title} subtitle={subtitle} publishDate={post.dateGmt} />{' '}
        {/* Post header*/}
        <PostEyecatch
          src={eyecatch.mediaItemUrl}
          alt={eyecatch.altText}
          priority
          blurDataURL={blurDataURL}
        />
        {/* Post eyecatch image */}
        <TwoColumn>
          <TwoColumn.Main>
            <PostBody>
              <ParseHTML contentHTML={post.content ?? ''} /> {/* Parse and display post content */}
            </PostBody>
          </TwoColumn.Main>

          <TwoColumn.Sidebar>
            <PostCategories categories={post.categories.nodes ?? []} /> {/* Post categories */}
            <PostTags tags={post.tags.nodes ?? []} /> {/* Post tags */}
          </TwoColumn.Sidebar>
        </TwoColumn>
        <Pagination
          prevText={prevPost?.title}
          prevUrl={`/${BLOG_PATH}/${prevPost?.slug}`}
          nextText={nextPost?.title}
          nextUrl={`/${BLOG_PATH}/${nextPost?.slug}`}
        />
        {/* Pagination for previous and next posts */}
      </article>
    </>
  );
}

export default Post;
