import supabase_server from '@/config/supabase_server';
 
export const getWaiverRequests = async () => {
    //TODO: get user id from session
    const user_id = '111060062';
    const { data, error } = await supabase_server.from('waivers').select('*').eq('user_id', user_id);

    if (error) {
        console.error(error);
        throw error;
    }
    return data;
}

export const getWaiversToReview = async () => {
    //TODO: get user id from session
    const user_id = 'X123456';
    const { data = [], error } = await supabase_server
        .from('waivers')
        .select('*, users!waivers_user_id_fkey (*)')
        .eq('reviewee', user_id)
        .eq('status', 'PENDING')

    if (error) {
        console.error(error);
        throw error;
    }

    const withEvidenceURL = await Promise.all((data ?? []).map(async (waiver) => {
        const evidenceURL = await Promise.all(waiver.evidence.map(async (uuid) => {
            const { data, error } = await supabase_server.storage.from('evidence').createSignedUrl(uuid, 3600);
            if (error) {
                throw error;
            }
            return data!.signedUrl;
        }));
        return {
            ...waiver,
            evidence: evidenceURL
        }
    }));

    return withEvidenceURL;
}