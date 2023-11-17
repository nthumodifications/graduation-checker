'use client';;
import InputFileUpload from '@/components/FormComponents/FileUploadControl';
import InputControl from '@/components/FormComponents/InputControl';
import SelectControl from '@/components/FormComponents/SelectControl';
import TextareaControl from '@/components/FormComponents/TextareaControl';
import {submitWaiverRequest} from '@/lib/waiver_action';
import {Button} from '@mui/joy';
import {useForm} from 'react-hook-form';
import {useState, useTransition} from 'react';
import {useSnackbar} from '@/components/Snackbar';

export type Inputs = {
    reason: string
    from_department: string,
    from_course_code: string,
    from_name: string,
    from_instructor: string,
    from_credits: string,
    from_grade: string,
    to_course_code: string,
    evidence: FileList | null
}


const WaiverForm = () => {
    const [submitted, setSubmitted] = useState(false);
    const { enqueueSnackbar } = useSnackbar();
    const { control, trigger, watch, reset, handleSubmit, formState: { errors } } = useForm<Inputs>({
        defaultValues: {
            reason: "",
            from_department: "",
            from_course_code: "",
            from_name: "",
            from_instructor: "",
            from_credits: "",
            from_grade: "",
            to_course_code: "",
            evidence: null
        },
        mode: "onChange"
    })
    const [isPending, startTransition] = useTransition();

    const values = watch();
    const onSubmit = async (form: Inputs) => {
        startTransition(async () => {
            try {
                // create a new FormData object to store files
                const formData = new FormData();
                // append each files to the FormData object
                for (let i = 0; i < form.evidence!.length; i++) {
                    formData.append('evidence', form.evidence![i]);
                }
                await submitWaiverRequest({
                    ...form,
                    evidence: formData
                });
                setSubmitted(true);
            } catch (e) {
                enqueueSnackbar('Something went wrong when submitting', { variant: "error" });
            }
        });
        
    }

    if(!submitted) return (
        <form className="flex flex-col gap-2 max-w-md" onSubmit={handleSubmit(onSubmit)}>
            <h1 className="text-2xl font-bold">Waiver Request</h1>
            <TextareaControl
                control={control}
                rules={{ required: true }}
                minRows={2}
                variant="soft"
                name="reason"
                placeholder="Reason"
            />
            <h2 className="text-sm font-bold">Course to Waive</h2>
            <InputControl
                control={control}
                rules={{ required: true }}
                variant="soft"
                name="from_department"
                placeholder="Department"
            />
            <InputControl
                control={control}
                rules={{ required: true }}
                variant="soft"
                name="from_course_code"
                placeholder="Course Code"
            />
            <InputControl
                control={control}
                rules={{ required: true }}
                variant="soft"
                name="from_name"
                placeholder="Course Name"
            />
            <InputControl
                control={control}
                rules={{ required: true }}
                variant="soft"
                name="from_instructor"
                placeholder="Instructor"
            />
            <InputControl
                control={control}
                rules={{ required: true }}
                variant="soft"
                name="from_credits"
                type="number"
                placeholder="Credits"
            />
            <SelectControl
                // @ts-ignore
                control={control}
                rules={{ required: true }}      
                variant="soft"                            
                name="from_grade"
                placeholder="Grade"
                options={[
                    { value: "A+", label: "A+" },
                    { value: "A", label: "A" },
                    { value: "A-", label: "A-" },
                    { value: "B+", label: "B+" },
                    { value: "B", label: "B" },
                    { value: "B-", label: "B-" },
                    { value: "C+", label: "C+" },
                    { value: "C", label: "C" },
                    { value: "C-", label: "C-" },
                    { value: "D+", label: "D+" },
                    { value: "D", label: "D" },
                    { value: "D-", label: "D-" },
                    { value: "F", label: "F" },
                ]}
            />
            <h2 className="text-sm font-bold">Course to Replace</h2>
            <InputControl
                control={control}
                rules={{ required: true }}
                variant="soft"
                name="to_course_code"
                placeholder="Course Code"
            />
            <InputFileUpload
                control={control}
                rules={{ required: true }}
                name="evidence"
                label="Evidence"
            />
            <Button
                type="submit"
                variant="outlined"
                color="primary"
            >
                Submit
            </Button>
        </form>
    )
    else return (
        <div className="flex flex-col gap-2 max-w-md">
            <h1 className="text-2xl font-bold">Waiver Request</h1>
            <p>Your waiver request has been submitted. You will be notified via email once it has been processed.</p>
            <Button
                variant="outlined"
                color="primary"
                onClick={() => {
                    setSubmitted(false)
                    reset()
                }}
            >
                Submit another request
            </Button>
        </div>
    )
}

export default WaiverForm;