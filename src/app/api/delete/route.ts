import { NextRequest, NextResponse } from 'next/server';
import { readFile, writeFile, unlink } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const city = searchParams.get('city');
    const country = searchParams.get('country');
    const itemIndex = searchParams.get('itemIndex');

    if (!city || !country || itemIndex === null) {
      return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
    }

    const metadataPath = path.join(process.cwd(), 'public', 'uploads', country, city, 'metadata.json');
    
    if (!existsSync(metadataPath)) {
      return NextResponse.json({ error: 'Metadata file not found' }, { status: 404 });
    }

    // Read current metadata
    const metadataContent = await readFile(metadataPath, 'utf8');
    const metadata = JSON.parse(metadataContent);

    const index = parseInt(itemIndex);
    if (index < 0 || index >= metadata.length) {
      return NextResponse.json({ error: 'Invalid item index' }, { status: 400 });
    }

    const itemToDelete = metadata[index];

    // Delete the actual files
    try {
      if (itemToDelete.type === 'collection' && itemToDelete.images) {
        // Delete all images in the collection
        for (const image of itemToDelete.images) {
          const imagePath = path.join(process.cwd(), 'public', image.path);
          if (existsSync(imagePath)) {
            await unlink(imagePath);
          }
        }
      } else if (itemToDelete.path) {
        // Delete single image
        const imagePath = path.join(process.cwd(), 'public', itemToDelete.path);
        if (existsSync(imagePath)) {
          await unlink(imagePath);
        }
      }
    } catch (fileError) {
      console.error('Error deleting files:', fileError);
      // Continue with metadata update even if file deletion fails
    }

    // Remove item from metadata
    metadata.splice(index, 1);

    // Write updated metadata back to file
    await writeFile(metadataPath, JSON.stringify(metadata, null, 2));

    return NextResponse.json({ 
      success: true, 
      message: 'Item deleted successfully',
      deletedItem: itemToDelete 
    });

  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json({ error: 'Failed to delete item' }, { status: 500 });
  }
}
