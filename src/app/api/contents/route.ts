// import connectToDatabase from "@/lib/mongodb";
// import Content from "@/models/Content";
// import { NextResponse } from "next/server";

// export async function GET() {
//   await connectToDatabase();
//   const contents = await Content.find({});
//   return NextResponse.json(contents);
// }
import connectToDatabase from "@/lib/mongodb";
import Content from "@/models/Content";
import { NextResponse } from "next/server";

// ✅ コンテンツの取得 (GET)
export async function GET() {
  try {
    await connectToDatabase();
    const contents = await Content.find({});
    return NextResponse.json(contents);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch contents" }, { status: 500 });
  }
}

// ✅ 新しいコンテンツの追加 (POST)
export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const { title, description, url, image, tags } = await req.json();

    if (!title || !description || !image || !tags) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const newContent = new Content({ title, description, url, image, tags });
    await newContent.save();
    return NextResponse.json(newContent, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to add content" }, { status: 500 });
  }
}

// ✅ コンテンツの更新 (PUT)
export async function PUT(req: Request) {
  try {
    await connectToDatabase();
    const { id, title, description, url, image, tags } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "Missing content ID" }, { status: 400 });
    }

    const updatedContent = await Content.findByIdAndUpdate(id, { title, description, url, image, tags }, { new: true });

    if (!updatedContent) {
      return NextResponse.json({ error: "Content not found" }, { status: 404 });
    }

    return NextResponse.json(updatedContent);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update content" }, { status: 500 });
  }
}

// ✅ コンテンツの削除 (DELETE)
export async function DELETE(req: Request) {
  try {
    await connectToDatabase();
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "Missing content ID" }, { status: 400 });
    }

    const deletedContent = await Content.findByIdAndDelete(id);

    if (!deletedContent) {
      return NextResponse.json({ error: "Content not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Content deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete content" }, { status: 500 });
  }
}