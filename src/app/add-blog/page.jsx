'use client';

import { useState } from "react";
// import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { BASE_URL } from "@/utils/BASE_URL";

// Dynamically import ReactQuill to avoid SSR issues
// const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
// import "react-quill/dist/quill.snow.css";

const AddBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [altTag, setAltTag] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleAddBlog = async (e) => {
    e.preventDefault();

    if (!title || !content || !image || !description || !altTag) {
      toast.error("All fields are required.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("image", image);
    formData.append("description", description);
    formData.append("alttag", altTag);

    try {
      setIsLoading(true);
      const response = await fetch(`${BASE_URL}/create-blog`, {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Failed to add blog");

      toast.success("Blog added successfully!");
      router.push("/blog");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-8 mb-10 p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-6">Add New Blog</h1>
      <form onSubmit={handleAddBlog}>
        <div className="mb-4">
          <label className="block font-medium mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-1">Meta Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-1">Content</label>
          {/* <ReactQuill value={content} onChange={setContent} className="h-80" /> */}
        </div>

        <div className="mb-6 mt-14">
          <label className="block font-medium mb-1">Upload Image</label>
          <div className="flex items-center">
            <label
              htmlFor="image-upload"
              className="cursor-pointer flex items-center justify-center px-4 py-2 bg-sky-500 text-white text-sm font-medium rounded-md hover:bg-sky-600"
            >
              Choose File
            </label>
            <input
              id="image-upload"
              type="file"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file && file.size > 2 * 1024 * 1024) {
                  toast.error("Image must be under 2MB");
                  return;
                }
                setImage(file);
              }}
              className="hidden"
              accept="image/*"
              required
            />
            <span className="ml-4 text-sm text-gray-500">
              {image ? image.name : "No file selected"}
            </span>
          </div>
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-1">Alt Tag</label>
          <input
            type="text"
            value={altTag}
            onChange={(e) => setAltTag(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => router.push("/blog")}
            className="bg-gray-300 text-black px-4 py-2 rounded mr-2 hover:bg-sky-500 hover:text-white"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="text-white px-4 py-2 rounded bg-sky-500 hover:bg-sky-600"
            disabled={isLoading}
          >
            Add Blog
          </button>
        </div>
      </form>

      {isLoading && (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex items-center justify-center z-50">
          <img src="/loader.gif" alt="Loading..." className="h-24" />
        </div>
      )}

      <Toaster />
    </div>
  );
};

export default AddBlog;
