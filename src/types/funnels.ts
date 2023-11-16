import {Course} from '@/types/course';

export type Funnel = {
    name: string;
    matcher: (course: Course) => boolean;
    countType: 'credits' | 'course';
    minCount?: number;
    disabled?: boolean;
}

export type FunnelCategory = {
    title: string;
    funnels: Funnel[];
    countType?: 'credits' | 'course'; // default to 'credits
    minCount?: number;
    disabled?: boolean;
}
