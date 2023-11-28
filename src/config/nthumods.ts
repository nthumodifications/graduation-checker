import { Database } from "@/types/supabase";
import { createClient } from "@supabase/supabase-js";

const nthumods = createClient<Database>(process.env.NEXT_PUBLIC_NTHUMODS_URL ?? "", process.env.NEXT_PUBLIC_NTHUMODS_ANON_KEY ?? "");

export type Waiver = Database["public"]["Tables"]["waivers"]["Row"];
export type User = Database["public"]["Tables"]["users"]["Row"];
export type Override = Database["public"]["Tables"]["overrides"]["Row"];

export default nthumods;