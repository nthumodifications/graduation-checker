'use client';;
import InputFileUpload from '@/components/FormComponents/FileUploadControl';
import InputControl from '@/components/FormComponents/InputControl';
import SelectControl from '@/components/FormComponents/SelectControl';
import TextareaControl from '@/components/FormComponents/TextareaControl';
import {submitWaiverRequest} from '@/lib/waiver_action';
import {Button} from '@mui/joy';
import {useForm} from 'react-hook-form';
import {useState} from 'react';
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
    const { control, trigger, watch, reset, formState: { errors } } = useForm<Inputs>({
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
    const values = watch();
    const onSubmit = async () => {
        const valid = await trigger();
        if (!valid) return;
        const form = new FormData();
        form.append("reason", values.reason);
        form.append("from_department", values.from_department);
        form.append("from_course_code", values.from_course_code);
        form.append("from_name", values.from_name);
        form.append("from_instructor", values.from_instructor);
        form.append("from_credits", values.from_credits);
        form.append("from_grade", values.from_grade);
        form.append("to_course_code", values.to_course_code);
        for (let i = 0; i < values.evidence!.length; i++) {
            form.append("evidence", values.evidence![i]);
        }
        try {
            await submitWaiverRequest(form);
            setSubmitted(true);
        } catch (e) {
            enqueueSnackbar('Something went wrong when submitting', { variant: "error" });
        }
    }

    if(!submitted) return (
        <form action={onSubmit} className="flex flex-col gap-2 max-w-md">
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