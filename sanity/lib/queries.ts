import { defineQuery } from "next-sanity";
export const startups_query=defineQuery(`*[_type == "startup"]| order(createdAt desc) {
    _id,
    title,
    description,
    image,
    views,
    author->{
        _id,
        name,
        username,
        email,
        image,
    },
    category,
    createdAt,
}`)