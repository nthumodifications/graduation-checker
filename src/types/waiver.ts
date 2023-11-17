import {User, Waiver} from '@/config/supabase';

export type WaiverReview = Waiver & { users: User | null }