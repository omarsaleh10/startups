import { notFound } from "next/navigation";
import Link from "next/link";
import { AUTHOR_BY_ID_QUERY, STARTUPS_BY_AUTHOR_QUERY } from "@/sanity/lib/queries";
import { client } from "@/sanity/lib/client";
import { StartupCard } from "@/app/components/cards";

interface AuthorProfilePageProps {
  params: { id: string };
}

export default async function AuthorProfilePage({ params }: AuthorProfilePageProps) {
  const { id } = await params;
  const author = await client.fetch(AUTHOR_BY_ID_QUERY, { id });
  const startups = await client.fetch(STARTUPS_BY_AUTHOR_QUERY, { authorId: id });

  if (!author) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-orange-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Panel - User Profile Card */}
          <div className="lg:w-1/3">
            <div className="bg-pink-500 rounded-3xl p-8 border-2 border-pink-600 shadow-xl relative">
              {/* Decorative dashed lines */}
              <div className="absolute top-4 left-4">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-black rounded-full"></div>
                  <div className="w-2 h-2 bg-black rounded-full"></div>
                  <div className="w-2 h-2 bg-black rounded-full"></div>
                </div>
              </div>

              {/* Name Tag */}
              <div className="bg-black rounded-xl px-4 py-2 mb-6 inline-block">
                <h1 className="text-white font-bold text-lg uppercase tracking-wider">
                  {author.name?.toUpperCase() || 'AUTHOR'}
                </h1>
              </div>

              {/* Avatar */}
              <div className="flex justify-center mb-6">
                <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-white shadow-lg">
                  <img
                    src={author.image || "/logo.png"}
                    alt={author.name}
                    width={192}
                    height={192}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* User Details */}
              <div className="text-center">
                <p className="text-white font-bold text-2xl mb-2">
                  @{author.username}
                </p>
                <p className="text-white/90 text-lg">
                  {author.bio || "Next.js Enthusiast & Educator"}
                </p>
              </div>

              {/* Stats */}
              <div className="mt-6 text-center">
                <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 inline-block">
                  <span className="text-white font-bold text-lg">
                    {startups.length} Startup{startups.length !== 1 ? 's' : ''}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel - Startups Grid */}
          <div className="lg:w-2/3">
            {/* Section Header */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                My Startups
              </h2>
              <p className="text-gray-600 text-lg">
                All the innovative ideas and projects I've created
              </p>
            </div>

            {/* Startups Grid */}
            {startups.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {startups.map((startup: any) => (
                  <StartupCard key={startup._id} startup={startup} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-3xl shadow-lg">
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
      </div>
    </div>
  );
}