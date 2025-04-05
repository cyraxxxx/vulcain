import { MemoryManager } from "@/lib/memory";
import prismadb from "@/lib/prismadb";
import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { generalCompanionId: string } },
) {
  try {
    const user = await currentUser();

    if (!params.generalCompanionId) {
      return new NextResponse("Companion ID is required", { status: 400 });
    }

/*     if (!user || !user.id || !user.firstName) {
      return new NextResponse("Unauthorized", { status: 401 });
    } */
      if (!user || !user.id ) {
        return new NextResponse("Unauthorized", { status: 401 });
      }

    const memoryManager = await MemoryManager.getInstance();
    const companionKey = {
      generalCompanionId: params.generalCompanionId,
      userId: user.id,
      modelName: "gpt-3.5-turbo",
    };
    await memoryManager.clearHistory(companionKey);

    await prismadb.generalMessage.deleteMany({
      where: {
        generalCompanionId: params.generalCompanionId,
        userId: user.id,
      },
    });

    return NextResponse.json("Success");
  } catch (error) {
    console.log("[GENERALCOMPANION_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
