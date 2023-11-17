'use server';
import supabase_server from '@/config/supabase_server';
import { v4 as uuidv4 } from 'uuid';
import { revalidatePath } from 'next/cache'
import { WaiverReview } from '@/types/waiver';
import { Inputs } from '@/app/waiver/WaiverForm';

export const submitWaiverRequest = async (inputs: Omit<Inputs, 'evidence'> & { evidence: FormData }) => {
    //TODO: validate inputs

    //validate if the user has already submitted a waiver request the same to_course_code

    //convert FormData to array of files
    const evidenceFiles = Array.from(inputs.evidence.values()) as File[];

    //first upload the files to supabase storage with random UUIDs
    const evidences = await Promise.all(Array.from(evidenceFiles).map(async (file) => {
        const uuid = uuidv4();
        const ext = file.name.split('.').pop();
        const filename = `${uuid}.${ext}`;
        const { error } = await supabase_server.storage.from('evidence').upload(filename, file);
        if (error) {
            throw error;
        }
        return filename;
    }));
    const { error } = await supabase_server.from('waivers').insert([
        {
            user_id: '111060062',
            reviewee: 'X123456',
            reason: inputs.reason,
            from_code: inputs.from_course_code,
            from_name: inputs.from_name,
            from_department: inputs.from_department,
            from_grade: inputs.from_grade,
            from_instructor: inputs.from_instructor,
            from_credits: parseInt(inputs.from_credits),
            to_course_code: inputs.to_course_code,
            evidence: evidences,
            status: 'PENDING'
        }
    ]);
    if (error) {
        console.error(error);
        throw error;
    }
    revalidatePath('/waiver')
    return;
}


export const handleApprove = async (obj: WaiverReview, formData: FormData) => {
    'use server';
    //TODO: verify that user has access to approve this waiver
    const hasPermission = true;
    if (!hasPermission) return;

    const { error } = await supabase_server
        .from('waivers')
        .update({ status: 'APPROVED', updated_on: new Date().toISOString() })
        .match({ id: obj.id });

    if (error) {
        throw error;
    }

    //TODO: send email to user
    
    revalidatePath('/review');
}

export const handleReject = async (obj: WaiverReview, formData: FormData) => {
    'use server';
    //TODO: verify that user has access to approve this waiver
    const hasPermission = true;
    if (!hasPermission) return;

    const { error } = await supabase_server
        .from('waivers')
        .update({ status: 'REJECTED' })
        .match({ id: obj.id });

    if (error) {
        throw error;
    }

    //TODO: send email to user
    
    revalidatePath('/review');
}