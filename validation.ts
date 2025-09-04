import { z } from "zod";
export const formSchema = z.object({
    title: z.string().min(3).max(100),
    description: z.string().min(20).max(1000),
    category: z.string().min(3).max(20),
    link: z.string().min(1, "Image link is required").url("Please enter a valid URL").refine((url) => url.startsWith("https://"), { message: "URL must start with https://" }),
    pitch: z.string().min(10),
})