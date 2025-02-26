// src/app/designs/page.tsx
"use client";

import { useEffect, useState } from "react";
import ImageCard from "@/components/ImageCard";
import ImageModal from "@/components/ImageModal";

// Define the Design type
interface Design {
  id: string;
  title: string;
  imageUrl: string;
}

const DesignsPage = () => {
  const [designs, setDesigns] = useState<Design[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    async function fetchDesigns() {
      try {
        const response = await fetch("/api/designs");
        const data: Design[] = await response.json();
        console.log("Fetched designs:", data);

        if (Array.isArray(data)) {
          setDesigns(data);
        } else {
          setDesigns([]);
        }
      } catch (error) {
        console.error("Error fetching designs:", error);
        setDesigns([]);
      }
    }

    fetchDesigns();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Browse Designs</h1>
      
      {/* Interactive Buttons */}
      <div className="flex justify-center gap-4 mb-6">
        {/* Generative Images Button */}
        <a
          href="https://in.pinterest.com/ideas/pinterest-images/939600730359/"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:shadow-lg hover:from-blue-600 hover:to-purple-700 transition"
        >
          Explore Generative Images
        </a>
        
        {/* Custom Stickers Button */}
        <a
          href="https://new.express.adobe.com/new?category=templates&height=500&width=500&unit=px&q=Sticker&referrer=https%3A%2F%2Fwww.google.com%2F&url=%2Fin%2Fexpress%2Fcreate%2Fsticker&placement=floating-button&locale=en-IN&contentRegion=in&_branch_match_id=1274632531418442612&_branch_referrer=H4sIAAAAAAAAAy2OzWoDMQyEnya%2BZTe06aVgylII9FJIesix2I5im%2FVKrqzF6aXPXvUHhPRJDJpJIrU9jqO7kIdWHc%2BVmgyu1qFknMew9%2BfpdEznyT8FJxCJP63AUosuzSTIMYl92O1MzxdJv7RiFltv5sO%2BSQ4zsGG4AjOwTT92m%2Ftpc3fQ6r0PkSgWGAItejArF6szoza4VYbWlAKDuim0%2F3%2FqHmABFHst5CRj3PpVhNAUCq6ABdy%2BvJpAKCo6QcyENqP5%2Bgui%2BnfP1Jsmek5MC3wDsShsXwcBAAA%3D"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gradient-to-r from-green-500 to-teal-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:shadow-lg hover:from-green-600 hover:to-teal-700 transition"
        >
          Create Custom Stickers
        </a>
      </div>

      {/* Designs Grid */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {designs.length > 0 ? (
          designs.map((design) => (
            <ImageCard
              key={design.id}
              imageUrl={design.imageUrl}
              title={design.title}
              onClick={() => setSelectedImage(design.imageUrl)}
            />
          ))
        ) : (
          <p className="text-center text-gray-600">No designs available</p>
        )}
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <ImageModal
          imageUrl={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </div>
  );
};

export default DesignsPage;