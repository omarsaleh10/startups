"use client";
import { Send } from "lucide-react";
import MDEditor from "@uiw/react-md-editor";
import { useActionState, useState, useEffect } from "react";
import { formSchema } from "@/validation";
import { createStartup } from "@/actions";
import { useRouter } from "next/navigation";

export default function StartupForm(){
    const [pitch, setPitch] = useState("");
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [toastType, setToastType] = useState<"success" | "error">("success");
    const router = useRouter();
    

    const handleformsubmit= async(prevState:any,formData:FormData)=>{
        console.log("🚀 Form action function called!");
        console.log("FormData received:", formData);
        try {
            const formValues={
                title:formData.get("title") as string,
                description:formData.get("description") as string,
                category:formData.get("category") as string,
                link:formData.get("link") as string,
                pitch,
            }
            
            // Debug logging
            console.log("=== FORM SUBMISSION DEBUG ===");
            console.log("Raw FormData values:");
            console.log("title:", formData.get("title"));
            console.log("description:", formData.get("description"));
            console.log("category:", formData.get("category"));
            console.log("link:", formData.get("link"));
            console.log("pitch (from state):", pitch);
            console.log("Processed formValues:", formValues);
            console.log("================================");
            
            await formSchema.parseAsync(formValues);
            console.log("✅ Validation passed!");
            console.log("Final validated data:", formValues);
            
            const result = await createStartup(prevState,formData,pitch)
            
            if (result && typeof result === 'object' && result.status === "SUCCESS" && result.startupId) {
                return {error:"",status:"SUCCESS",startupId:result.startupId};
            }
            
            return {error:"Failed to create startup",status:"ERROR"};
        }
        catch(error){
            console.log("❌ Validation failed!");
            console.log("Error details:", error);
            if (error instanceof Error) {
                return {error: error.message, status:"ERROR"};
            }
            return {error:"Validation failed",status:"ERROR"};
        }
    }
    const [state,formAction,ispending]=useActionState(handleformsubmit,{error:"",status:"INITIAL"});
    

    // Show toast when state changes and handle redirect
    useEffect(() => {
        if (state.status === "SUCCESS") {
            setToastMessage("Startup submitted successfully! Redirecting...");
            setToastType("success");
            setShowToast(true);
            
            // Redirect to the newly created startup page after 2 seconds
            if (state.startupId) {
                setTimeout(() => {
                    router.push(`/startup/${state.startupId}`);
                }, 2000);
            }
        } else if (state.status === "ERROR") {
            setToastMessage(state.error || "Something went wrong!");
            setToastType("error");
            setShowToast(true);
        }
    }, [state, router]);

    // Auto-hide toast after 5 seconds
    useEffect(() => {
        if (showToast) {
            const timer = setTimeout(() => {
                setShowToast(false);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [showToast]);
   
    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-orange-50 py-12 px-4">
            {/* Toast Notification */}
            {showToast && (
                <div className={`fixed top-4 right-4 z-50 max-w-sm w-full bg-white rounded-lg shadow-lg border-l-4 ${
                    toastType === "success" ? "border-green-500" : "border-red-500"
                } transform transition-all duration-300 ease-in-out`}>
                    <div className="p-4">
                        <div className="flex items-start">
                            <div className="flex-shrink-0">
                                {toastType === "success" ? (
                                    <svg className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                ) : (
                                    <svg className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                )}
                            </div>
                            <div className="ml-3 w-0 flex-1">
                                <p className={`text-sm font-medium ${
                                    toastType === "success" ? "text-green-800" : "text-red-800"
                                }`}>
                                    {toastMessage}
                                </p>
                            </div>
                            <div className="ml-4 flex-shrink-0 flex">
                                <button
                                    onClick={() => setShowToast(false)}
                                    className="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                                >
                                    <span className="sr-only">Close</span>
                                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-5xl font-bold text-gray-900 mb-3">Submit Your Startup</h1>
                    <p className="text-gray-600 text-xl">Share your innovative idea with the world</p>
                </div>
                
                <form action={formAction} className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100" onSubmit={(e) => {
                    console.log("Form submitted!");
                    console.log("Form action triggered");
                }}>
                    <div className="space-y-6"> 
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="title" className="block text-base font-semibold text-gray-700 mb-2 text-xl">Startup Title</label>
                                <input 
                                    type="text" 
                                    id="title" 
                                    name="title" 
                                    placeholder="Enter your startup name"
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-pink-500 focus:ring-4 focus:ring-pink-100 transition-all duration-200 text-base" 
                                />
                            </div>
                            
                            <div>
                                <label htmlFor="description" className="block text-base font-semibold text-gray-700 mb-2 text-xl">Short Description</label>
                                <textarea 
                                    id="description" 
                                    name="description" 
                                    placeholder="Brief overview of your startup idea"
                                    rows={3}
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-pink-500 focus:ring-4 focus:ring-pink-100 transition-all duration-200 resize-none text-base" 
                                />
                            </div>
                            
                            <div>
                                <label htmlFor="category" className="block text-base font-semibold text-gray-700 mb-2 text-xl">Category</label>
                                <select 
                                    id="category" 
                                    name="category" 
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-pink-500 focus:ring-4 focus:ring-pink-100 transition-all duration-200 text-base"
                                >
                                    <option value="">Select a category</option>
                                    <option value="tech">Technology</option>
                                    <option value="health">Healthcare</option>
                                    <option value="education">Education</option>
                                    <option value="finance">Finance</option>
                                    <option value="ecommerce">E-commerce</option>
                                    <option value="sustainability">Sustainability</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                            
                            <div>
                                <label htmlFor="link" className="block text-base font-semibold text-gray-700 mb-2 text-xl">Image Link</label>
                                <input 
                                    type="url" 
                                    id="link" 
                                    name="link" 
                                    placeholder="https://your-demo-link.com"
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-pink-500 focus:ring-4 focus:ring-pink-100 transition-all duration-200 text-base" 
                                />
                            </div>
                            
                            <div data-color-mode="light">
                                <label htmlFor="pitch" className="block text-base font-semibold text-gray-700 mb-2 text-xl ">Pitch Details</label>
                               <MDEditor 
                               value={pitch}
                               onChange={(value)=>setPitch(value || "")}
                               id="pitch"
                               preview="edit"
                               height={400}
                               className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-pink-500 focus:ring-4 focus:ring-pink-100 transition-all duration-200 text-base"
                               data-color-mode="light"
                               data-hide-card={true}
                               style={{borderRadius: "10px"}}
                               />
                            </div>
                        </div>
                        
                        <div className="pt-4">
                            <button 
                                type="submit" 
                                disabled={ispending}
                                onClick={() => console.log("Submit button clicked!")}
                                className="w-full bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
                            >
                                <span className="text-lg">{ispending ? "SUBMITTING..." : "SUBMIT YOUR PITCH"}</span>
                                <Send className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}