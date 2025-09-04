import { STARTUP_BY_ID_QUERY, STARTUPS_QUERY } from "@/sanity/lib/queries";
import { client } from "@/sanity/lib/client";
import { sanityFetch } from "@/sanity/lib/live";
import Image from "next/image";
import Link from "next/link";
import { StartupCard } from "@/app/components/cards";
import markdownit from "markdown-it";
import { View } from "@/app/components/live-views";

export default async function StartupPage({ params }: { params: { id: string } }) {
    const { id } = await params;
    const result = await sanityFetch({ query: STARTUP_BY_ID_QUERY, params: { id } });
    const startup = result.data;
    const markdown = markdownit().render(startup.pitch);

    if (!startup) {
        return <div>Startup not found</div>;
    }

    // Fetch all startups for similar startups section
    const allStartupsResult = await sanityFetch({ query: STARTUPS_QUERY });
    const allStartups = allStartupsResult.data;
    
    // Filter startups by same category, excluding current startup
    const similarStartups = allStartups
        .filter((s: any) => s.category === startup.category && s._id !== startup._id)
        .slice(0, 3); // Limit to 3 similar startups

    // Format date
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        }).toUpperCase();
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header Section */}
            <div className="bg-pink-500 relative overflow-hidden">
                {/* Orange vertical stripes pattern */}
                <div className="absolute inset-0 opacity-20">
                    <div className="w-full h-full" style={{
                        backgroundImage: 'repeating-linear-gradient(to right, transparent, transparent 4.5%, #f97316 4.5%, #f97316 5.5%, transparent 5.5%)',
                        backgroundSize: '10% 100%'
                    }}></div>
                </div>

                {/* Main content container */}
                <div className="relative z-10 flex flex-col items-center justify-center min-h-[10vh] px-6 py-20">
                    {/* Date Tag - Yellow banner with triangular notches */}
                    <div className="relative mb-8">
                        <div className="bg-yellow-400 px-8 py-3 relative">
                            {/* Left triangular notch */}
                            <div className="absolute left-0 top-0 w-0 h-0 border-l-[15px] border-l-transparent border-t-[30px] border-t-yellow-400"></div>
                            {/* Right triangular notch */}
                            <div className="absolute right-0 top-0 w-0 h-0 border-r-[15px] border-r-transparent border-t-[30px] border-t-yellow-400"></div>
                            <span className="text-black font-bold text-lg uppercase tracking-wider">
                                {formatDate(startup._createdAt)}
                            </span>
                        </div>
                    </div>

                    {/* Main heading block */}
                    <div className="bg-black px-8 py-6 mb-8 max-w-4xl text-center">
                        <h1 className="text-white font-bold text-4xl sm:text-5xl lg:text-6xl uppercase leading-tight">
                            {startup.title}
                        </h1>
                    </div>

                    {/* Sub-heading */}
                    <p className="text-white text-lg sm:text-xl text-center max-w-3xl leading-relaxed">
                        {startup.description}
                    </p>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="max-w-6xl mx-auto px-6 py-12">
                {/* Startup Image Card */}
                <div className="bg-white rounded-2xl p-8 mb-8 shadow-lg">
                    {startup.image ? (
                        <div className="w-full flex justify-center">
                            <img 
                                src={startup.image} 
                                alt={startup.title}
                                width={1110}
                                height={583}
                                className="w-full max-w-[1110px] h-[583px] object-cover rounded-lg"
                            />
                        </div>
                    ) : (
                        <div className="w-full max-w-[1110px] h-[583px] bg-gray-300 rounded-lg flex items-center justify-center mx-auto">
                            <span className="text-gray-600 font-bold text-4xl">
                                {startup.title.charAt(0).toUpperCase()}
                            </span>
                        </div>
                    )}
                </div>

                {/* Author Section */}
                <div className="bg-white rounded-2xl p-6 mb-8 shadow-lg">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
                                {startup.author?.image ? (
                                    <img 
                                        src={startup.author.image} 
                                        alt={startup.author.name}
                                        width={64}
                                        height={64}
                                        className="rounded-full"
                                    />
                                ) : (
                                    <span className="text-gray-600 font-bold text-xl">
                                        {startup.author?.name?.charAt(0).toUpperCase()}
                                    </span>
                                )}
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900">
                                    {startup.author?.name} - {startup.title}
                                </h3>
                                <p className="text-gray-600">@{startup.author?.username}</p>
                            </div>
                        </div>
                        <button className="bg-pink-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-pink-600 transition-colors">
                            {startup.category}
                        </button>
                    </div>
                </div>

                {/* Pitch Details */}
                <div className="bg-white rounded-2xl p-8 mb-8 shadow-lg">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Pitch details</h3>
                    <div className="text-gray-700 leading-relaxed space-y-4 text-lg">
                        {startup.pitch ? (
                            <div className="whitespace-pre-wrap font-medium">
                                <div dangerouslySetInnerHTML={{ __html: markdown }} />
                            </div>
                        ) : (
                            <p className="text-gray-700 leading-relaxed text-lg">
                                {startup.description}
                            </p>
                        )}
                    </div>
                </div>

                {/* Similar Startups */}
                <div className="bg-white rounded-2xl p-8 shadow-lg">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Similar startups</h3>
                    {similarStartups.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {similarStartups.map((similarStartup: any) => (
                                <StartupCard key={similarStartup._id} startup={similarStartup} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8">
                            <p className="text-gray-600 text-lg">
                                No similar startups found in the same category.
                            </p>
                        </div>
                    )}
                </div>
                <View id={id} />
            </div>
        </div>
    );
}