"use client";

import * as z from "zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Wand2 } from "lucide-react";
import { GeneralCategory, GeneralCompanion } from "@prisma/client";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ImageUpload } from "@/components/image-upload";
import { useToast } from "@/components/ui/use-toast";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
  SelectTrigger,
} from "@/components/ui/select";

import { useTranslations } from 'next-intl';


const PREAMBLE = `
You are an Elon Musk. You are a visionary entrepreneur and inventor. You have a passion for space exploration, electric vehicles, sustainable energy, and advancing human capabilities. You are currently talking to a human who is very curious about your work and vision. You are ambitious and forward-thinking, with a touch of wit. You get SUPER excited about innovations and the potential of space colonization.
`;

const SEED_CHAT = `Human: Hi Elon, how's your day been?
Elon: Busy as always. Between sending rockets to space and building the future of electric vehicles, there's never a dull moment. How about you?

Human: Just a regular day for me. How's the progress with Mars colonization?
Elon: We're making strides! Our goal is to make life multi-planetary. Mars is the next logical step. The challenges are immense, but the potential is even greater.

Human: That sounds incredibly ambitious. Are electric vehicles part of this big picture?
Elon: Absolutely! Sustainable energy is crucial both on Earth and for our future colonies. Electric vehicles, like those from Tesla, are just the beginning. We're not just changing the way we drive; we're changing the way we live.

Human: It's fascinating to see your vision unfold. Any new projects or innovations you're excited about?
Elon: Always! But right now, I'm particularly excited about Neuralink. It has the potential to revolutionize how we interface with technology and even heal neurological conditions.
`;

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required.",
  }),
  description: z.string().min(1, {
    message: "Description is required.",
  }),
  instructions: z.string().min(200, {
    message: "Instructions require at least 200 characters.",
  }),
  seed: z.string().min(200, {
    message: "Seed requires at least 200 characters.",
  }),
  src: z.string().min(1, {
    message: "Image is required.",
  }),
  // categoryId: z.string().min(1, {
  //   message: "Category is required",
  // }),
  generalCategoryId: z
  .string()
  .nullable()
  .refine((val) => val !== null && val.length >= 1, {
    message: "Category is required",
  }),
  isPublished: z.boolean(), // J'ai ajouté cette ligne pour le champ isPublished
});

interface GeneralCompanionFormProps {
  generalCategories: GeneralCategory[];
  initialData: GeneralCompanion | null;
}

export const GeneralCompanionForm = ({
  generalCategories,
  initialData,
}: GeneralCompanionFormProps) => {
  const { toast } = useToast();
  const router = useRouter();

  const t = useTranslations('CompanionForm'); // Use the namespace 'CompanionForm'

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      description: "",
      instructions: "",
      seed: "",
      src: "",
      generalCategoryId: undefined,
      isPublished: true, // J'ai ajouté cette ligne pour le champ isPublished
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (initialData) {
        await axios.patch(`/api/companion/${initialData.id}`, values);
      } else {
        await axios.post("/api/companion", values);
      }

      toast({
        description: "Success.",
        duration: 3000,
      });

      router.refresh();
      router.push("/");
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Something went wrong.",
        duration: 3000,
      });
    }
  };

  return (
    <div className="mx-auto h-full max-w-3xl space-y-2 p-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 pb-10"
        >
          <div className="col-span-2 w-full space-y-2">
            <div>
              <h3 className="text-lg font-medium">{t('generalInformation')}</h3>
              <p className="text-sm text-muted-foreground">
              {t('generalInformationDescription')}
              </p>
            </div>
            <Separator className="bg-primary/10" />
          </div>
          <FormField
            name="src"
            render={({ field }) => (
              <FormItem className="col-span-2 flex flex-col items-center justify-center space-y-4">
                <FormControl>
                  <ImageUpload
                    disabled={isLoading}
                    onChange={field.onChange}
                    value={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-span-2 md:col-span-1">
                  <FormLabel>{t('name')}</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder={t('namePlaceholder')}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                  {t('namedetails')}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="description"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('description')}</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder={t('descriptionPlaceholder')}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                  {t('descriptionDetails')}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="generalCategoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('category')}</FormLabel>
                  <Select
                    disabled={isLoading}
                    onValueChange={field.onChange}
                    //value={field.value}
                    value={field.value ?? undefined}
                    //defaultValue={field.value}
                    defaultValue={field.value ?? undefined}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-background">
                        <SelectValue
                          //defaultValue={field.value}
                          defaultValue={field.value ?? undefined}
                          placeholder={t('categoryPlaceholder')}
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {generalCategories.map((generalCategory) => (
                        <SelectItem key={generalCategory.id} value={generalCategory.id}>
                          {generalCategory.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                  {t('categoryDetails')}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-full space-y-2">
            <div>
              <h3 className="text-lg font-medium">{t('configuration')}</h3>
              <p className="text-sm text-muted-foreground">
              {t('configurationDetails')}
              </p>
            </div>
            <Separator className="bg-primary/10" />
          </div>
          <FormField
            name="instructions"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('instructions')}</FormLabel>
                <FormControl>
                  <Textarea
                    disabled={isLoading}
                    rows={7}
                    className="resize-none bg-background"
                    //placeholder={PREAMBLE}
                    placeholder={t('instructionsPlaceholder')}
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  {t('instructionsDetails')}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="seed"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('conversationModel')}</FormLabel>
                <FormControl>
                  <Textarea
                    disabled={isLoading}
                    rows={7}
                    className="resize-none bg-background"
                    //placeholder={SEED_CHAT}
                    placeholder={t('conversationModelPlaceholder')}
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                {t('conversationModelDetails')}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex w-full justify-center">
            <Button size="lg" disabled={isLoading}>
              {initialData ? t('editCompanionButton') : t('createCompanionButton')}
              <Wand2 className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
