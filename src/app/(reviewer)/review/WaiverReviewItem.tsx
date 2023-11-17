import {Button} from '@mui/joy';
import ViewEvidence from '@/app/(reviewer)/review/ViewEvidence';
import {WaiverReview} from '@/types/waiver';
import {handleApprove, handleReject} from '@/lib/waiver_action';

const WaiverReviewItem = ({ req }: { req: WaiverReview }) => {
    const handleApproveWithData = handleApprove.bind(null, req);
    const handleRejectWithData = handleReject.bind(null, req);
    

    return <div className="flex flex-row gap-8 p-4 rounded-md shadow-md">
        <div className="flex flex-row flex-1 justify-between">
            <div className=''>
                <p className="text-base font-bold">Applicant</p>
                <p className="text-sm">{req.users?.name_zh} {req.users?.name_en}</p>
                <p className="text-sm">{req.users?.user_id}</p>
                <a href={`mailto:${req.users?.email}`} className="text-sm text-blue-500 underline">Email</a>
            </div>
            <div className=''>
                <p className="text-base font-bold">From</p>
                <p className="text-sm">{req.from_department}</p>
                <p className="text-sm">{req.from_code} {req.from_name}</p>
                <p className="text-sm">{req.from_instructor}</p>
                <p className="text-sm">{req.from_credits}學分 - {req.from_grade} </p>
            </div>
            <div>
                <p className="text-base font-bold">To</p>
                <p className="text-sm">To: {req.to_course_code}</p>
                <p className="text-sm">Reason: {req.reason}</p>
            </div>
        </div>
        <div className='flex flex-col justify-center'>
            <form className='flex flex-row'>
                <ViewEvidence urls={req.evidence} />
                <Button variant="soft" color="primary" size="sm" type="submit" formAction={handleApproveWithData}>Approve</Button>
                <Button variant="soft" color="danger" size="sm" type="submit" formAction={handleRejectWithData}>Reject</Button>
            </form>
        </div>
    </div>
}

export default WaiverReviewItem;