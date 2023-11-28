import nthumods from "@/config/nthumods"
import supabase_server from "@/config/supabase_server";
import { Course } from "@/types/course";

export const getCourse = async (id: string) => {
    const { data, error } = await nthumods.from('courses').select('*').eq('id', id).single();
    if (error) {
        throw error;
    }
    return {
        raw_id: data.raw_id,
        type: 'normal',
        name: data.name_zh,
        credits: data.credits
    };
}

export const getUserCourses = async (user_id: string) => {
    const { data, error } = await supabase_server.from('taken_courses').select('*').eq('user_id', user_id).single();

    if (error ) {
        throw error;
    }

    const { data: courses, error: error2 } = await nthumods.from('courses').select('*').in('id', data.courses);

    if (error2) {
        throw error2;
    }

    return courses.map((course) => ({
        raw_id: course.raw_id,
        type: 'normal',
        name: course.name_zh,
        credits: course.credits
    }) as Course);

}