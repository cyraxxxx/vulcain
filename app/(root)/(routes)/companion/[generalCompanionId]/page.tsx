import { redirect } from "next/navigation";
import { auth, redirectToSignIn } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";
import { checkSubscription } from "@/lib/subscription";

import { GeneralCompanionForm } from "./components/companion-form";

interface GeneralCompanionIdPageProps {
  params: {
    generalCompanionId: string;
  };
}

const GeneralCompanionIdPage = async ({ params }: GeneralCompanionIdPageProps) => {
  const { userId } = auth();

  if (!userId) {
    return redirectToSignIn();
  }

  const validSubscription = await checkSubscription();

  if (!validSubscription) {
    return redirect("/");
  }

  /* const generalCompanion = await prismadb.generalCompanion.findUnique({
    where: {
      id: params.generalCompanionId,
      userId,
    },
  }); */

  const generalCompanion = params.generalCompanionId
  ? await prismadb.generalCompanion.findUnique({
      where: {
        id: params.generalCompanionId,
        userId,
      },
    })
  : null;

  const generalCategories = await prismadb.generalCategory.findMany();

  return <GeneralCompanionForm initialData={generalCompanion} generalCategories={generalCategories} />;
};

export default GeneralCompanionIdPage;
