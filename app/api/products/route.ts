import { NextRequest, NextResponse } from 'next/server';
import { INITIAL_PRODUCTS } from '@/data/mockProducts';
import { Product } from '@/types/ecommerce';

// Server-side product management endpoint
let serverProducts: Product[] = [...INITIAL_PRODUCTS];

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const brand = searchParams.get('brand');
    const q = searchParams.get('q');

    let filtered = [...serverProducts];

    if (category && category !== 'All') {
      filtered = filtered.filter(
        (p) => p.category.toLowerCase() === category.toLowerCase()
      );
    }

    if (brand) {
      filtered = filtered.filter(
        (p) => p.brand.toLowerCase() === brand.toLowerCase()
      );
    }

    if (q) {
      const query = q.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.brand.toLowerCase().includes(query) ||
          p.fabric.toLowerCase().includes(query) ||
          p.tags.some((t) => t.toLowerCase().includes(query))
      );
    }

    return NextResponse.json({
      success: true,
      count: filtered.length,
      products: filtered,
    });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.title || !body.price || !body.brand) {
      return NextResponse.json(
        { success: false, error: 'Title, Brand, and Price are required' },
        { status: 400 }
      );
    }

    const newProduct: Product = {
      id: `peh-custom-${Date.now()}`,
      sku: body.sku || `PEH-SKU-${Math.floor(1000 + Math.random() * 9000)}`,
      title: body.title,
      slug: body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      brand: body.brand,
      category: body.category || 'Luxury Lawn',
      fabric: body.fabric || 'Pure Lawn',
      suitType: body.suitType || '3-Piece Unstitched',
      price: Number(body.price),
      originalPrice: Number(body.originalPrice || body.price * 1.25),
      discountPercent: body.originalPrice ? Math.round(((body.originalPrice - body.price) / body.originalPrice) * 100) : 20,
      rating: 5.0,
      reviewCount: 0,
      inStock: body.inStock !== false,
      stockCount: Number(body.stockCount || 10),
      isBestseller: !!body.isBestseller,
      isNewArrival: true,
      isFastDispatch24h: !!body.isFastDispatch24h,
      images: body.images?.length
        ? body.images
        : ['/images/products/pink_lawn_suit.jpg', '/images/products/blue_cutwork_suit.jpg'],
      colors: body.colors || [{ name: 'Multi', hex: '#8B1E3F' }],
      availableSizes: body.availableSizes || ['Unstitched', 'XS', 'S', 'M', 'L', 'XL', 'XXL', 'Custom Stitching'],
      pieceDetails: body.pieceDetails || {
        shirt: 'Embroidered Pure Lawn Front + Digital Print Back & Sleeves',
        dupatta: 'Digital Printed Pure Organza / Chiffon Dupatta (2.5m)',
        trouser: 'Dyed Cambric Trouser (2.5m)',
      },
      description: body.description || 'Authentic Pakistani designer suit with rich embroidery.',
      origin: '100% Authentic Pakistani Designer Original - Direct Import',
      careInstructions: ['Dry Clean or gentle hand wash', 'Iron on reverse'],
      tags: body.tags || ['Pakistani Suit', 'Lawn 2026'],
      readyToShipDays: 1,
      reviews: [],
    };

    serverProducts = [newProduct, ...serverProducts];

    return NextResponse.json({
      success: true,
      message: 'Product created successfully',
      product: newProduct,
    }, { status: 201 });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Failed to create product' },
      { status: 500 }
    );
  }
}
