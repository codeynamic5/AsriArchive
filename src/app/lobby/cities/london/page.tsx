// src/app/lobby/cities/london/page.tsx
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { db } from "@/lib/firebase";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  DocumentData,
} from "firebase/firestore";

interface CityCollection {
  title: string;
  images: Array<{
    url: string;
    name: string;
  }>;
}

export default function LondonPage() {
  const [collections, setCollections] = useState<CityCollection[]>([]);

  useEffect(() => {
    const q = query(
      collection(db, "cities", "london", "collections"),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snap) => {
      const cols: CityCollection[] = snap.docs.map((doc) => {
        const data = doc.data() as DocumentData;

        // assert the shape from Firestore into our interface
        const title = typeof data.title === "string" ? data.title : "Untitled";

        // We expect data.images to be an array of objects with url & name
        const rawImages = Array.isArray(data.images)
          ? data.images
          : [];

        const images = rawImages.map((img) => ({
          url: String((img as Record<string, unknown>).url || ""),
          name: String((img as Record<string, unknown>).name || ""),
        }));

        return { title, images };
      });

      setCollections(cols);
    });

    return () => unsubscribe();
  }, []);

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">London</h1>
      <div className="grid grid-cols-3 gap-4">
        {collections.map((col, idx) => (
          <div key={idx} className="border rounded p-4">
            <h2 className="font-semibold mb-2">{col.title}</h2>
            {col.images[0] && (
              <Image
                src={col.images[0].url}
                alt={col.title}
                width={300}
                height={200}
                className="rounded object-cover"
                priority={idx === 0}
              />
            )}
          </div>
        ))}
      </div>
    </main>
  );
}
