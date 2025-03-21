"use client";

import {
  DndContext,
  useSensor,
  useSensors,
  PointerSensor,
} from "@dnd-kit/core";
import { useCallback, useRef, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useSchematicEntitlement } from "@schematichq/schematic-react";
import uploadPDF from "@/actions/uploadPDF";

export default function PDFDropzone() {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [isDragggingOver, setIsDragggingOver] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const { user } = useUser();
  const router = useRouter();

  // Schematic Entitlement Check
  const {
    value: isFeatureEnabled,
    featureUsage,
    featureUsageExceeded,
    featureAllocation,
  } = useSchematicEntitlement("scans");

  
  // Sensors setup for drag and drop detection...
  const sensors = useSensors(useSensor(PointerSensor));

  // Handle Upload
  const handleUpload = useCallback(async (files: FileList | File[]) => {
    if(!user) {
      alert("Please sign in to upload files");
      return;
    }

   //  Check wether it's a PDF file..
   const fileArray = Array.from(files);
   const pdfFiles = fileArray.filter(
      (file) => 
         file.type === "application/pdf" || 
      file.name.toLowerCase().endsWith(".pdf")
   );

   if(pdfFiles.length === 0) {
    alert("Please upload a PDF file only");
    return;
   }
   
   setIsUploading(true);

   try {
      // Upload files to Convex
      const newUploadedFiles: string[] = [];
      for(const file of pdfFiles) {
        const formData = new FormData();
        formData.append("file", file);
        
      //   Call server action to upload files
      const result = await uploadPDF(formData);

      if(!result?.success) {
         throw new Error(result?.error || "Upload failed");
      }

      newUploadedFiles.push(file.name);
      }

      setUploadedFiles((prev) => [...prev, ...newUploadedFiles]);

      // Clear uploaded files after 5 seconds
      setTimeout(() => {
        setUploadedFiles([]);
      }, 5000);

      // Redirect user to receipts page
      router.push("/receipts");
   } catch (error) {
      console.error("Error uploading files:", error);
      alert("Error uploading files. Please try again.");
   } finally {
      setIsUploading(false);
   }

   
      
  }, [user, router]);

  // Drag and drop event handlers...
  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragggingOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragggingOver(false);
  }, []);

  
  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragggingOver(false);
    
    if(!user) {
      alert("Please sign in to upload files");
      return;
    }

    if(e.dataTransfer.files && e.dataTransfer.files.length > 0) {
     handleUpload(e.dataTransfer.files);
    }
  }, [user, handleUpload]);

  //   canUpload is a boolean, if the user can upload a file(schematic, Free Tier)
  //   const canUpload = isUserSignedIn && isFeatureEnabled;
  const canUpload = true;

  return (
    <DndContext sensors={sensors}>
      <div className="w-full h-full border border-gray-300 rounded-lg p-4">
        <div
          onDragOver={canUpload ? handleDragOver : undefined}
          onDragLeave={canUpload ? handleDragLeave : undefined}
          onDrop={
            canUpload
              ? handleDrop
              : (e) => {
                  e.preventDefault();
                }
          }
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors${
            isDragggingOver ? "border-blue-500 bg-blue-50" : "border-gray-300"
          } ${!canUpload ? "opacity-70 cursor-not-allowed" : ""}`}
        ></div>
      </div>
    </DndContext>
  );
}
