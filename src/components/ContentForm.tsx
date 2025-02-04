"use client";
import { useState } from "react";

interface Content {
  _id?: string;
  title: string;
  description: string;
  url: string;
  image: string;
  tags: string[];
}

interface ContentFormProps {
  content?: Content;
  onSuccess: () => void;
}

export default function ContentForm({ content, onSuccess }: ContentFormProps) {
  const [formData, setFormData] = useState<Content>(
    content || { title: "", description: "", url: "", image: "", tags: [] }
  );
  const [newTag, setNewTag] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddTag = () => {
    if (newTag && !formData.tags.includes(newTag)) {
      setFormData({ ...formData, tags: [...formData.tags, newTag] });
    }
    setNewTag("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = content ? "PUT" : "POST";
    const endpoint = "/api/contents";

    const res = await fetch(endpoint, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(content ? { ...formData, id: content._id } : formData),
    });

    if (res.ok) {
      onSuccess();
    } else {
      alert("Failed to save content");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 shadow-md rounded-md">
      <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Title" required className="w-full p-2 border mb-2" />
      <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" required className="w-full p-2 border mb-2" />
      <input type="text" name="url" value={formData.url} onChange={handleChange} placeholder="URL (optional)" className="w-full p-2 border mb-2" />
      <input type="text" name="image" value={formData.image} onChange={handleChange} placeholder="Image Path" required className="w-full p-2 border mb-2" />
      <div className="flex gap-2">
        <input type="text" value={newTag} onChange={(e) => setNewTag(e.target.value)} placeholder="New Tag" className="p-2 border flex-1" />
        <button type="button" onClick={handleAddTag} className="bg-blue-500 text-white p-2 rounded">Add Tag</button>
      </div>
      <div className="flex flex-wrap gap-2 mt-2">
        {formData.tags.map((tag, index) => (
          <span key={index} className="bg-gray-200 px-2 py-1 rounded-full">{tag}</span>
        ))}
      </div>
      <button type="submit" className="w-full mt-4 bg-green-500 text-white p-2 rounded">
        {content ? "Update Content" : "Add Content"}
      </button>
    </form>
  );
}