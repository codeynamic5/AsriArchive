import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir, readFile } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const files = formData.getAll('files') as File[];
    const city = formData.get('city') as string;
    const country = formData.get('country') as string;
    
    if (!files || files.length === 0) {
      return NextResponse.json({ error: 'No files uploaded' }, { status: 400 });
    }

    const uploadedFiles = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!file || file.size === 0) {
        continue;
      }

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Create directory if it doesn't exist
      const uploadDir = path.join(process.cwd(), 'public', 'uploads', country, city);
      await mkdir(uploadDir, { recursive: true });

      // Create unique filename
      const fileName = `${Date.now()}-${i}-${file.name}`;
      const filePath = path.join(uploadDir, fileName);

      // Write the file
      await writeFile(filePath, buffer);

      // Get the caption for this file
      const caption = formData.get(`caption_${i}`) as string || `Photo in ${city}`;

      uploadedFiles.push({
        fileName,
        originalName: file.name,
        path: `/uploads/${country}/${city}/${fileName}`,
        caption,
        size: file.size
      });
    }

    // Save metadata to a JSON file
    const metadataPath = path.join(process.cwd(), 'public', 'uploads', country, city, 'metadata.json');
    let existingMetadata = [];
    
    try {
      if (existsSync(metadataPath)) {
        const data = await readFile(metadataPath, 'utf8');
        existingMetadata = JSON.parse(data);
      }
    } catch (err) {
      console.log('Starting fresh metadata file:', err);
      // File doesn't exist or is invalid, start fresh
    }

    // Add new files to metadata
    const newMetadata = uploadedFiles.map(file => ({
      ...file,
      uploadDate: new Date().toISOString()
    }));

    const updatedMetadata = [...existingMetadata, ...newMetadata];
    await writeFile(metadataPath, JSON.stringify(updatedMetadata, null, 2));

    return NextResponse.json({ 
      success: true, 
      files: uploadedFiles,
      message: `Successfully uploaded ${uploadedFiles.length} files` 
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
