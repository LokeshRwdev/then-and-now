import { NextRequest, NextResponse } from 'next/server';
import {
  getPageSections,
  savePageSection,
  deletePageSection,
  getProcessSteps,
  saveProcessStep,
  deleteProcessStep,
  getStories,
  saveStory,
  deleteStory,
  getProducts,
  saveProduct,
  deleteProduct,
} from '@/lib/content/contentService';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || 'sections';
    const page = searchParams.get('page') || 'home';
    const category = searchParams.get('category') || undefined;

    if (type === 'sections') {
      const data = await getPageSections(page);
      return NextResponse.json({ success: true, data });
    }

    if (type === 'products') {
      const data = await getProducts(category);
      return NextResponse.json({ success: true, data });
    }

    if (type === 'steps') {
      const data = await getProcessSteps();
      return NextResponse.json({ success: true, data });
    }

    if (type === 'stories') {
      const data = await getStories();
      return NextResponse.json({ success: true, data });
    }

    return NextResponse.json({ error: 'Invalid entity type requested' }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, action, data } = body;

    if (!type || !data) {
      return NextResponse.json({ error: 'Missing type or data' }, { status: 400 });
    }

    let result: any = { success: false };

    if (type === 'section') {
      result = await savePageSection(data);
    } else if (type === 'product') {
      result = await saveProduct(data);
    } else if (type === 'step') {
      result = await saveProcessStep(data);
    } else if (type === 'story') {
      result = await saveStory(data);
    } else {
      return NextResponse.json({ error: `Unknown type: ${type}` }, { status: 400 });
    }

    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const id = searchParams.get('id');

    if (!type || !id) {
      return NextResponse.json({ error: 'Missing type or id' }, { status: 400 });
    }

    let result: any = { success: false };

    if (type === 'section') {
      result = await deletePageSection(id);
    } else if (type === 'product') {
      result = await deleteProduct(id);
    } else if (type === 'step') {
      result = await deleteProcessStep(id);
    } else if (type === 'story') {
      result = await deleteStory(id);
    } else {
      return NextResponse.json({ error: `Unknown type: ${type}` }, { status: 400 });
    }

    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
