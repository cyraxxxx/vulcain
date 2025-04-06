import { auth, currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { checkSubscription } from "@/lib/subscription";

export async function PATCH(
  req: Request,
  { params }: { params: { generalCompanionId: string } },
) {
  try {
    const body = await req.json();
    const user = await currentUser();
    const { src, name, description, instructions, seed, generalCategoryId } = body;

    if (!params.generalCompanionId) {
      return new NextResponse("Companion ID required", { status: 400 });
    }

    /* if (!user || !user.id || !user.firstName) {
      return new NextResponse("Unauthorized", { status: 401 });
    } */

      if (!user || !user.id || !user.username) {
        return new NextResponse("Unauthorized", { status: 401 });
      }
    

    if (
      !src ||
      !name ||
      !description ||
      !instructions ||
      !seed ||
      !generalCategoryId
    ) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const isPro = await checkSubscription();

    if (!isPro) {
      return new NextResponse("Pro subscription required", { status: 403 });
    }

    const generalCompanion = await prismadb.generalCompanion.update({
      where: {
        id: params.generalCompanionId,
        userId: user.id,
      },
      data: {
        generalCategoryId,
        userId: user.id,
        //userName: user.firstName,
        userName: user.username,
        src,
        name,
        description,
        instructions,
        seed,
      },
    });

    return NextResponse.json(generalCompanion);
  } catch (error) {
    console.log("[GENERAL_COMPANION_PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { generalCompanionId: string } },
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const generalCompanion = await prismadb.generalCompanion.delete({
      where: {
        userId,
        id: params.generalCompanionId,
      },
    });

    return NextResponse.json(generalCompanion);
  } catch (error) {
    console.log("[GENERALCOMPANION_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
