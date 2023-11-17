import { getWaiverRequests } from "@/lib/waiver";
import WaiverForm from "./WaiverForm";
import {Waiver} from '@/config/supabase';

export const revalidate = 0;

const WaiverRequestList = async () => {
    const requests = await getWaiverRequests();
    
    const getStatusText = (status: Waiver['status']) => {
        switch (status) {
            case 'PENDING': return '審核中';
            case 'APPROVED': return '通過';
            case 'REJECTED': return '未通過';
            default: return '未知';
        }
    }

    return <div className="w-full">
        <h2 className="text-2xl font-bold">Waiver History</h2>
        <div className="flex flex-row gap-4 w-full overflow-x-auto">
            {requests.map(req => <div className="flex flex-col gap-1 w-56 p-4 rounded-md shadow-md">
                <h3 className="text-2xl font-semibold">{getStatusText(req.status)}</h3>
                <p className="text-sm">From: {req.from_code}</p>
                <p className="text-sm">To: {req.to_course_code}</p>
                <p className="text-sm">Reason: {req.reason}</p>
            </div>)}
        </div>
    </div>
    
}
const WaiverPage = () => {
    return (
        <div className="flex flex-col gap-4">
            <WaiverForm />
            <WaiverRequestList/>
        </div>
    )
}

export default WaiverPage;