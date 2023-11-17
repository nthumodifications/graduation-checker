import { getWaiversToReview } from '@/lib/waiver';
import WaiverReviewItem from './WaiverReviewItem';

export const revalidate = 0;

const ReviewPage = async () => {
    //TODO: check if user has access to this page

    //get list of waivers to review
    const requests = await getWaiversToReview();

    return <div className="w-full">
        <h2 className="text-2xl font-bold">Waiver Review</h2>
        <div className="flex flex-col gap-2 w-full overflow-y-auto">
            {requests.map(req => <WaiverReviewItem key={req.id} req={req} />)}
            {requests.length == 0 && <p className="text-base mt-4">No waivers to review ^^</p>}
        </div>
    </div>
}

export default ReviewPage;