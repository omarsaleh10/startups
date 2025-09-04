import { notFound } from "next/navigation";

import Link from "next/link";
import { AUTHOR_BY_ID_QUERY, STARTUPS_BY_AUTHOR_QUERY } from "@/sanity/lib/queries";
import { client } from "@/sanity/lib/client";
import { StartupCard } from "@/app/components/cards";

interface AuthorProfilePageProps {
  params: { id: string };
}

export default async function AuthorProfilePage({ params }: AuthorProfilePageProps) {
  const author = await client.fetch(AUTHOR_BY_ID_QUERY, { id: params.id });
  const startups = await client.fetch(STARTUPS_BY_AUTHOR_QUERY, { authorId: params.id });

  if (!author) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-orange-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Author Avatar */}
            <div className="relative">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-xl">
                <img
                  src={author.image || "/logo.png"}
                  alt={author.name}
                  width={128}
                  height={128}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white"></div>
            </div>

            {/* Author Info */}
            <div className="text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
                {author.name}
              </h1>
              <p className="text-xl text-white/90 mb-4">
                @{author.username}
              </p>
              {author.bio && (
                <p className="text-white/80 text-lg max-w-2xl">
                  {author.bio}
                </p>
              )}
              <div className="mt-6 flex flex-wrap gap-4 justify-center md:justify-start">
                <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-2 text-white font-semibold">
                  {startups.length} Startup{startups.length !== 1 ? 's' : ''}
                </div>
                <Link
                  href="/"
                  className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-2 text-white font-semibold hover:bg-white/30 transition-all duration-300"
                >
                  Back to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Startups by {author.name}
          </h2>
          <p className="text-gray-600 text-lg">
            Discover all the innovative ideas and projects created by this entrepreneur
          </p>
        </div>

        {/* Startups Grid */}
        {startups.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {startups.map((startup: any) => (
              <StartupCard key={startup._id} startup={startup} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">
              No Startups Yet
            </h3>
            <p className="text-gray-600 mb-6">
              {author.name} hasn't created any startups yet. Check back later!
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-orange-500 text-white px-6 py-3 rounded-full font-semibold hover:from-pink-600 hover:to-orange-600 transition-all duration-300"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Home
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}