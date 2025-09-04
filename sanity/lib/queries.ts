import { defineQuery } from "next-sanity";
export const STARTUPS_QUERY=defineQuery(`*[_type == "startup"]| order(createdAt desc) {
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

export const STARTUP_BY_ID_QUERY=
defineQuery(`*[_type == "startup" && _id == $id][0] {
   _id,
  title,
  slug,
  _createdAt,
  author->{
    _id,name,username,image,bio
  },
  views,
  description,
  category,
  image,
  pitch
}`)
export const UPDATE_VIEWS_QUERY=defineQuery(`*[_type == "startup" && _id == $id] {
  _id,
  views
}`)
export const AUTHOR_BY_GITHUB_ID_QUERY=defineQuery(
  `*[_type == "author" && id == $id][0] {
  id,
  _id,
  name,
  username,
  email,
  image,
  bio
}`)