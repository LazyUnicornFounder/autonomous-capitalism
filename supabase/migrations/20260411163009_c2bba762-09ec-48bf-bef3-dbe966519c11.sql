
CREATE POLICY "Service role can insert blog posts"
ON public.blog_posts
FOR INSERT
TO service_role
WITH CHECK (true);

CREATE POLICY "Service role can delete blog posts"
ON public.blog_posts
FOR DELETE
TO service_role
USING (true);
