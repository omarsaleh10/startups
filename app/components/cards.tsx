"use client";
import Link from "next/link";
import Image from "next/image";


import { useSearchParams } from "next/navigation";
import { startups_query } from "@/sanity/lib/queries";
import { client } from "@/sanity/lib/client";

export default function Cards() {
    const searchParams = useSearchParams();
    const currentQuery = searchParams.get("q");
    // const startups = await client.fetch(startups_query);
    // console.log(startups);
    
    const startups = [
        {
            id: 1,
            description: "A mobile app that helps users track and reduce their carbon footprint through smart monitoring and personalized eco-friendly recommendations.",
            image: "/cardimage.png",
            views: 232,
            author: {
                id: 1,
                name: "Steven Smith",
            },
            category: "Senior level",
            title: "EcoTrack",
            createdAt: "20 May, 2023",
        },
        {
            id: 2,
            description: "An AI-powered platform that connects freelancers with clients through intelligent matching algorithms and automated project management.",
            image: "/cardimage.png",
            views: 189,
            author: {
                id: 2,
                name: "Sarah Johnson",
            },
            category: "Mid level",
            title: "FreelanceAI",
            createdAt: "18 May, 2023",
        },
        {
            id: 3,
            description: "A blockchain-based solution for secure digital identity verification and decentralized authentication systems.",
            image: "/cardimage.png",
            views: 156,
            author: {
                id: 3,
                name: "Michael Chen",
            },
            category: "Senior level",
            title: "BlockID",
            createdAt: "15 May, 2023",
        },
        {
            id: 4,
            description: "A comprehensive health monitoring platform that integrates wearable devices with AI-driven health insights and personalized wellness plans.",
            image: "/cardimage.png",
            views: 203,
            author: {
                id: 4,
                name: "Emily Davis",
            },
            category: "Mid level",
            title: "HealthSync",
            createdAt: "12 May, 2023",
        },
    ];

    // Filter startups based on search query
    const filteredStartups = currentQuery 
        ? startups.filter((startups: any) => {
            const query = currentQuery.toLowerCase();
            const title = startups.title.toLowerCase();
            // const description = startup.description.toLowerCase();
            const category = startups.category.toLowerCase();
            
            return title.includes(query) || category.includes(query);
        })
        : startups;

    // Show message if no results found
    if (currentQuery && filteredStartups.length === 0) {
        return (
            <div className="max-w-7xl mx-auto px-6 py-12 text-center">
                <p className="text-gray-600 text-lg">
                    No startups found matching "{currentQuery}"
                </p>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredStartups.map((startups: any) => (
                    <div key={startups.id} className="bg-white rounded-2xl shadow-lg border-3 border-black overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                        {/* Top Section */}
                        <div className="p-4 flex justify-between items-start">
                            {/* Date Tag */}
                            <div className="bg-pink-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                                {startups.createdAt}
                            </div>
                            
                            {/* View Count */}
                            <div className="flex items-center gap-2 bg-pink-100 text-gray-800 px-3 py-1 rounded-full">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                                <span className="text-sm font-medium">{startups.views}</span>
                            </div>
                        </div>

                        {/* Header Section */}
                        <div className="px-4 pb-3">
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    {/* Author Name */}
                                    <p className="text-gray-700 text-sm font-medium mb-1">{startups.author.name}</p>
                                    
                                    {/* Project Title */}
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">{startups.title}</h3>
                                    
                                    {/* Project Description */}
                                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
                                        {startups.description}
                                    </p>
                                </div>
                                
                                {/* Author Avatar */}
                                <Link href={`/profile/${startups.author.id}`}>
                                <div className="ml-4 flex-shrink-0">
                                    <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center">
                                        <span className="text-pink-600 font-semibold text-lg">
                                            {startups.author.name.charAt(0).toUpperCase()}
                                        </span>
                                    </div>
                              
                                </div>
                                </Link>
                            </div>
                        </div>

                        {/* Main Image */}
                        <div className="px-4 pb-4">
                            <div className="relative w-full h-48 bg-gray-100 rounded-lg overflow-hidden">
                                <Image 
                                    src={startups.image} 
                                    alt={startups   .title}
                                    width={400}
                                    height={400}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>

                        {/* Bottom Section */}
                        <div className="px-4 pb-4 flex justify-between items-center">
                            {/* Level Indicator */}
                            <span className="text-gray-700 text-sm font-medium">{startups.category}</span>
                            
                            {/* Details Button */}
                            <Link
                                href={`/startup/${startups.id}`}
                                className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors duration-200"
                            >
                                Details
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}