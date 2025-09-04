
"use server";

import { auth } from "@/auth";
import slugify from "slugify";
import { client } from "./sanity/lib/client";
import { writeClient } from "./sanity/lib/write-client";

export const createStartup = async (state: any, form: FormData, pitch: string) => {
    const session = await auth();
    if (!session) {
        return JSON.stringify({ error: "Unauthorized", status: "ERROR" });
    }
    
    const { title, description, category, link } = Object.fromEntries(
        Array.from(form).filter(([key]) => key != 'pitch'),
    );
    
    const slug = slugify(title as string, { lower: true, strict: true });
    
    try {
        const startup = {
            _type:"startup",
            title,
            description,
            category,
            image: link,
            slug: {
                _type: "slug",
                current: slug,
            },
            author: {
                _type: "reference",
                _ref: (session as any)?.id
            },
            pitch,
        };
        
        const result = await writeClient.create(startup);
        return {error:"",status:"SUCCESS",startupId:result._id};
    
    } catch (error) {
        console.error("Error creating startup:", error);
        return JSON.stringify({ error: "Failed to create startup", status: "ERROR" });
    }
};