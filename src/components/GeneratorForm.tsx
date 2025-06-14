
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { useMutation } from "@tanstack/react-query"
import { supabase } from "@/integrations/supabase/client"
import { Loader2 } from "lucide-react"
import { useState } from "react"
import { Concept } from "@/types/Concept"
import { ConceptList } from "./ConceptList"

const formSchema = z.object({
  businessType: z.string().min(2, {
    message: "Business type must be at least 2 characters.",
  }),
  style: z.string().min(2, {
    message: "Style must be at least 2 characters.",
  }),
  palette: z.string().min(2, {
    message: "Color palette must be at least 2 characters.",
  }),
  pages: z.string().min(2, {
    message: "Please list at least one page.",
  }),
})

export function GeneratorForm() {
  const [concepts, setConcepts] = useState<Concept[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      businessType: "",
      style: "",
      palette: "",
      pages: "",
    },
  })

  const { mutate, isPending, error } = useMutation({
    mutationFn: (values: z.infer<typeof formSchema>) => {
      return supabase.functions.invoke('generate-site-ideas', {
        body: values,
      })
    },
    onSuccess: (response) => {
      if (response.error) {
        toast.error("Generation failed.", {
          description: response.error.message,
        })
        setConcepts([]);
      } else {
        toast.success("Concepts generated!", {
          description: "We've crafted a few ideas for your vision.",
        })
        console.log("Generated concepts:", response.data)
        setConcepts(response.data?.concepts || []);
      }
    },
    onError: (err) => {
        toast.error("An unexpected error occurred.", {
            description: err.message,
        });
        setConcepts([]);
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    setConcepts([]);
    mutate(values)
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="businessType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>What is your site for?</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., An Italian restaurant in Madrid" {...field} />
                </FormControl>
                <FormDescription>
                  Describe your business or project.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="style"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Desired Style</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Futuristic, elegant" {...field} />
                </FormControl>
                <FormDescription>
                  What's the vibe? (e.g., minimal, corporate, playful)
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="palette"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Color Palette</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Blue and grey" {...field} />
                </FormControl>
                <FormDescription>
                  What colors should we use?
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="pages"
            render={({ field }) => (
              <FormItem>
                <FormLabel>What pages do you need?</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="e.g., Menu, Contacts, Our Vision, Map"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  List the pages for your site, separated by commas.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" size="lg" className="w-full" disabled={isPending}>
             {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
             {isPending ? "Generating..." : "Generate My Site"}
          </Button>
        </form>
         {error && (
          <div className="mt-4 p-4 bg-destructive/10 text-destructive rounded-md">
            <p className="font-semibold">Error:</p>
            <p>{error.message}</p>
          </div>
        )}
      </Form>
      <ConceptList concepts={concepts} />
    </>
  )
}
