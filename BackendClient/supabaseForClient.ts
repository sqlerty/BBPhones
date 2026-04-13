import { createBrowserClient } from '@supabase/ssr'

export const supabaseBrowser = createBrowserClient(
  process.env.NEXT_PUBLIC_BBP_URL!,
  process.env.NEXT_PUBLIC_BBP_KEY!
)