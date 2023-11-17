'use client';
import { useModal } from '@/hooks/useModal';
import {Button, DialogContent, DialogTitle, ModalClose, ModalDialog, Tab, TabList, TabPanel, Tabs} from '@mui/joy';
import {Eye} from 'react-feather';

const ViewEvidence = ({ urls }: { urls: string[] }) => {
    const [openModal, closeModal] = useModal();
    console.log(urls)

    const getExtension = (url: string) => {
        const split = url.split("?")[0].split(".").pop();
        if (split === undefined) return "";

        return split;
    }


    const handleViewEvidence = () => {
        openModal({
            children: <ModalDialog layout='fullscreen'>
                <ModalClose/>
                <DialogTitle>Evidence</DialogTitle>
                <DialogContent>
                <Tabs aria-label="Evidence tabs" defaultValue={0} sx={{ flex: '1'}}>
                    <TabList>
                        {urls.map((url, index) => <Tab key={index}>{`#${index}`}</Tab>)}
                    </TabList>
                    {urls.map((url, index) => <TabPanel value={index} key={index}>
                        {getExtension(url) == 'pdf' ? 
                            <iframe src={url} width="100%" height="100%"/> : 
                            <img src={url} alt={`evidence-${index}`}/>
                        }
                    </TabPanel>)}
                </Tabs>
                </DialogContent>
            </ModalDialog>
        })
    }

    return <Button variant="soft" color="primary" size="sm" startDecorator={<Eye/>} onClick={handleViewEvidence}>Evidence</Button>
}

export default ViewEvidence;