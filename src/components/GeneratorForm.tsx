
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
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      businessType: "",
      style: "",
      palette: "",
      pages: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Form values:", values)
    toast.success("Preferences submitted!", {
      description: "We've received your vision. Let the magic begin!",
    })
  }

  return (
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
        <Button type="submit" size="lg" className="w-full">Generate My Site</Button>
      </form>
    </Form>
  )
}
