
-- Create generations table to store user prompts and AI generated concepts
CREATE TABLE public.generations (
    id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid NOT NULL,
    prompt jsonb NOT NULL,
    concepts jsonb,
    created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Add comments to the table and columns
COMMENT ON TABLE public.generations IS 'Stores the prompts and generated concepts for each user.';
COMMENT ON COLUMN public.generations.user_id IS 'The ID of the user who created the generation, from auth.users.';
COMMENT ON COLUMN public.generations.prompt IS 'The user''s input/prompt for the generation.';
COMMENT ON COLUMN public.generations.concepts IS 'The JSON array of generated concepts from the AI.';

-- Enable Row Level Security
ALTER TABLE public.generations ENABLE ROW LEVEL SECURITY;

-- Create policy for users to view their own generations
CREATE POLICY "Users can view their own generations"
ON public.generations
FOR SELECT
USING (auth.uid() = user_id);

-- Create policy for users to insert their own generations
CREATE POLICY "Users can insert their own generations"
ON public.generations
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Create policy for users to update their own generations
CREATE POLICY "Users can update their own generations"
ON public.generations
FOR UPDATE
USING (auth.uid() = user_id);

-- Create policy for users to delete their own generations
CREATE POLICY "Users can delete their own generations"
ON public.generations
FOR DELETE
USING (auth.uid() = user_id);
