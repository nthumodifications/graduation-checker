'use server';
import supabase_server from '@/config/supabase_server';
import { v4 as uuidv4 } from 'uuid';
import { revalidatePath } from 'next/cache'
import { WaiverReview } from '@/types/waiver';
import { Inputs } from '@/app/waiver/WaiverForm';
import nthumods from '@/config/nthumods';

export const submitWaiverRequest = async (inputs: Omit<Inputs, 'evidence'> & { evidence: FormData }) => {
    //TODO: validate inputs

    //to_course_code must be a valid course code
    const { data: course, error: error0 } = await nthumods.from('courses').select('*').eq('raw_id', inputs.to_course_code).single();
    if (error0) {
        throw error0;
    }
    if (!course) {
        throw new Error('目標課程代碼無效');
    }

    //validate if the user has already submitted a waiver request the same to_course_code
    const { error: error1 } = await supabase_server.from('waivers').select('*').eq('user_id', '111060062').eq('from_code', inputs.to_course_code).not('status', 'eq', 'REJECTED').single();
    const { error: error2 } = await supabase_server.from('waivers').select('*').eq('user_id', '111060062').eq('to_course_code', inputs.to_course_code).not('status', 'eq', 'REJECTED').single();
    //We expect both queries to return an error, which means the user has not submitted a waiver request for this course
    if (!error1 || !error2) {
        throw new Error('已經提交過免修申請');
    }

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

    //get the complete waiver object
    const { data: waiver, error: error0 } = await supabase_server.from('waivers').select('*').eq('id', obj.id).single();
    if (error0) {
        throw error0;
    }
    
    //get the waiving course object
    const { data: course, error: error2 } = await nthumods.from('courses').select('*').eq('raw_id', waiver.to_course_code).single();
    if (error2) {
        throw error2;
    }

    //TODO: send email to user
    
    //check if the target course is in the user's taken courses
    const { data: taken_courses, error: error1 } = await supabase_server.from('taken_courses').select('*').eq('user_id', obj.user_id).single();
    if (error1) {
        throw error1;
    }
    if(!taken_courses.courses.includes(obj.from_code)) {
        //create add request
        const { error: error2 } = await supabase_server.from('overrides').insert([
            {
                user_id: obj.user_id,
                target: 'course',
                target_id: course.raw_id,
                action: 'add',
                name: '免修課程',
                data: {
                    raw_id: course.raw_id,
                    type: 'normal',
                    name: course.name_zh,
                    credits: course.credits,
                }
            }
        ]);
    } else {
        //create override request
        const { error: error2 } = await supabase_server.from('overrides').insert([
            {
                user_id: obj.user_id,
                target: 'course',
                target_id: obj.from_code,
                action: 'replace',
                name: '免修課程',
                data: {
                    raw_id: 'LANG101010',
                    type: 'normal',
                    name: '中高級英文一',
                    credits: 2,
                }
            }
        ]);

    }
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