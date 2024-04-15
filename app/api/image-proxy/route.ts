import { NextRequest, NextResponse } from 'next/server';

// Base URL for the image proxy API
export const API_BASE_URL = '/api/image-proxy?imagePath=';

/**
 * Route for fetching an image from a WordPress site.
 * @param {NextRequest} request - The incoming request object.
 * @returns {Promise<NextResponse>} The response object.
 */
export async function GET(request: NextRequest) {
  const wordpressUrl = process.env.WORDPRESS_URL || ''; // Get the WordPress URL from the environment variables
  const url = new URL(request.nextUrl); // Get the URL of the request
  const imagePath = url.searchParams.get('imagePath'); // Get the image path from the URL

  // Check if the imagePath is set
  if (!imagePath) {
    return new NextResponse('Image path is required', { status: 400 });
  }

  const imageUrl = `${wordpressUrl}${imagePath}`; // Generate the image URL

  // Fetch the image from the WordPress site
  try {
    const response = await fetch(decodeURIComponent(imageUrl), { redirect: 'follow' });
    if (!response.ok) {
      throw new Error(`Failed to fetch the image: ${response.statusText}`);
    }
    if (!response.headers.get('content-type')?.startsWith('image/')) {
      throw new Error('The fetched resource is not an image.');
    }

    const imageBlob = await response.blob(); // Get the image as a blob

    // Return the image as a response
    return new NextResponse(imageBlob, {
      status: response.status,
      headers: {
        'Content-Type': response.headers.get('Content-Type') || 'application/octet-stream',
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      return new Response(error.message, { status: 500 });
    }
    return new Response('An unexpected error occurred', { status: 500 });
  }
}
