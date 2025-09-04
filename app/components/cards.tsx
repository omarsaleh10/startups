
import Link from "next/link";
import Image from "next/image";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";
import { client } from "@/sanity/lib/client";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";

interface CardsProps {
  searchParams: { q?: string };
}

// Reusable card component
export function StartupCard({ startup }: { startup: any }) {
    return (
        <div key={startup._id} className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-2 border-gray-100 overflow-hidden relative">
            {/* Gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-pink-50/0 to-purple-50/0 group-hover:from-pink-50/30 group-hover:to-purple-50/30 transition-all duration-500 pointer-events-none"></div>
            
            {/* Top Section */}
            <div className="p-5 flex justify-between items-start relative z-10">
                {/* Date Tag */}
                <div className="bg-gradient-to-r from-pink-100 to-purple-100 text-gray-800 px-4 py-2 rounded-full text-sm font-semibold shadow-sm border border-pink-200">
                    {startup.createdAt || 'Recent'}
                </div>
                
                {/* View Count */}
                <div className="flex items-center gap-2 bg-gradient-to-r from-blue-50 to-indigo-50 text-gray-700 px-3 py-2 rounded-full shadow-sm border border-blue-200">
                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    <span className="text-sm font-semibold">{startup.views || '0'}</span>
                </div>
            </div>

            {/* Main Image */}
            <div className="px-5 pb-4 relative z-10">
                <div className="relative w-full h-52 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl overflow-hidden group-hover:rounded-3xl transition-all duration-500">
                    <img 
                        src={startup.image} 
                        alt={startup.title}
                        width={400}
                        height={400}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Image overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-500"></div>
                </div>
            </div>

            {/* Content Section */}
            <div className="px-5 pb-5 relative z-10">
                {/* Author and Title Section */}
                <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                        {/* Author Name */}
                        <div className="flex items-center gap-2 mb-2">
                            <Link href={`/profile/${startup.author._id}`} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                                <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-pink-200">
                                    <img 
                                        src={startup.author.image} 
                                        alt={startup.author.name} 
                                        width={32} 
                                        height={32} 
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <p className="text-gray-600 text-sm font-medium hover:text-gray-800 transition-colors">{startup.author.name}</p>
                            </Link>
                        </div>
                        
                        {/* Project Title */}
                        <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-gray-800 transition-colors">
                            {startup.title}
                        </h3>
                        
                        {/* Project Description */}
                        <p className="text-gray-600 text-sm leading-relaxed line-clamp-2 mb-4">
                            {startup.description}
                        </p>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="flex justify-between items-center">
                    {/* Category Badge */}
                    <div className="text-black font-bold">
                        {startup.category}
                    </div>
                    
                    {/* Details Button */}
                    <Link
                        href={`/startup/${startup._id}`}
                        className="bg-gray-900 text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-gray-800 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
                    >
                        View Details
                    </Link>
                </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-4 right-4 w-2 h-2 bg-pink-400 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
            <div className="absolute bottom-4 left-4 w-1 h-1 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
        </div>
    );
}

export default async function Cards({ searchParams }: CardsProps) {
    const result = await sanityFetch({ query: STARTUPS_QUERY });
    const posts = result.data;
    
    // Filter posts based on search query
    const { q: currentQuery } = await searchParams;

    const filteredPosts = currentQuery 
        ? posts.filter((startup: any) => {
            const query = currentQuery.toLowerCase();
            const title = startup.title.toLowerCase();
            const category = startup.category.toLowerCase();
            
            return title.includes(query) || category.includes(query);
        })
        : posts;

        return (
        <>
            <div className="max-w-7xl mx-auto px-6 py-12">
                {/* Show message if no results found */}
                {currentQuery && filteredPosts.length === 0 && (
                    <div className="text-center mb-8">
                        <p className="text-gray-600 text-lg">
                            No startups found matching "{currentQuery}"
                        </p>
                    </div>
                )}
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {filteredPosts.map((startup: any) => (
                        <StartupCard key={startup._id} startup={startup} />
                    ))}
                </div>
            </div>
            <SanityLive />
        </>
    );
}