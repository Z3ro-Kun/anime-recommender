// src/components/SearchForm.tsx

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";

// Define the validation schema for the form
const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

// Define the props for the component
interface SearchFormProps {
  onSearch: (username: string) => void;
  isLoading: boolean;
}

export function SearchForm({ onSearch, isLoading }: SearchFormProps) {
  // Initialize the form with react-hook-form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  // Define the submit handler
  function onSubmit(values: z.infer<typeof formSchema>) {
    onSearch(values.username);
  }

  return (
    <div className="max-w-md mx-auto mb-12 animate-scale-in">
      <div className="gradient-border">
        <div className="gradient-border-content p-6 glass-card">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6"
            >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-semibold text-foreground">
                AniList Username
              </FormLabel>
              <FormControl>
                <Input 
                  placeholder="e.g., Josh" 
                  {...field}
                  className="glass-input border-primary/30 focus:border-accent text-lg py-3 transition-all duration-200"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button 
          type="submit" 
          className="w-full bg-gradient-to-r from-primary to-accent hover:from-accent hover:to-primary text-white font-semibold py-3 text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl" 
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              ✨ Searching...
            </>
          ) : (
            "🚀 Get Recommendations"
          )}
        </Button>
      </form>
    </Form>
        </div>
      </div>
    </div>
  );
}