
import Link from "next/link";
import Image from "next/image";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";
import { client } from "@/sanity/lib/client";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";

interface CardsProps {
  searchParams: { q?: string };
}

export default async function Cards({ searchParams }: CardsProps) {
    const result = await sanityFetch({ query: STARTUPS_QUERY });
    const posts = result.data;
    
    // Filter posts based on search query
    const currentQuery = searchParams?.q;
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
                        <div key={startup._id} className="bg-white rounded-2xl shadow-lg border-3 border-black overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                            {/* Top Section */}
                            <div className="p-4 flex justify-between items-start">
                                {/* Date Tag */}
                                <div className="bg-pink-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                                    {startup.createdAt || 'Recent'}
                                </div>
                                
                                {/* View Count */}
                                <div className="flex items-center gap-2 bg-pink-100 text-gray-800 px-3 py-1 rounded-full">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                    <span className="text-sm font-medium">{startup.views}</span>
                                </div>
                            </div>

                            {/* Header Section */}
                            <div className="px-4 pb-3">
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        {/* Author Name */}
                                        <p className="text-gray-700 text-sm font-medium mb-1">{startup.author.name}</p>
                                        
                                        {/* Project Title */}
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">{startup.title}</h3>
                                        
                                        {/* Project Description */}
                                        <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
                                            {startup.description}
                                        </p>
                                    </div>
                                    
                                    {/* Author Avatar */}
                                    <Link href={`/profile/${startup.author._id}`}>
                                    <div className="ml-4 flex-shrink-0">
                                        <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center">
                                            <span className="text-pink-600 font-semibold text-lg">
                                                {startup.author.name.charAt(0).toUpperCase()}
                                            </span>
                                        </div>
                                  
                                    </div>
                                    </Link>
                                </div>
                            </div>

                            {/* Main Image */}
                            <div className="px-4 pb-4">
                                <div className="relative w-full h-48 bg-gray-100 rounded-lg overflow-hidden">
                                    <img 
                                        src={startup.image} 
                                        alt={startup.title}
                                        width={400}
                                        height={400}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>

                            {/* Bottom Section */}
                            <div className="px-4 pb-4 flex justify-between items-center">
                                {/* Level Indicator */}
                                <span className="text-gray-700 text-sm font-medium">{startup.category}</span>
                                
                                {/* Details Button */}
                                <Link
                                    href={`/startup/${startup._id}`}
                                    className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors duration-200"
                                >
                                    Details
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <SanityLive />
        </>
    );
}