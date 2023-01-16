import { Button } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useState } from "react";
import { validateSurver } from "../../../core/validators/SurveyValidator";

interface IOutroPage {
    setPage: (page: number) => void;
    setVisible: (visible: boolean) => void;
    waterAnswer: number;
    sleepAnswer: number;
    trainingAnswer: number;
}

const OutroPage = (props: IOutroPage) => {

    const [loading, setLoading] = useState<boolean>(false);

    const handleClose = async () => {
        setLoading(true);
        if (validateSurver(props.waterAnswer, props.sleepAnswer, props.trainingAnswer)) {
            await new Promise(_ => setTimeout(_, 2000));
            // send results to the backend
        } else console.log(props)
        // props.setVisible(false)
        props.setPage(0)
        setLoading(false);
    }

    return (
        <div className={'survey-body'}>
            {loading && 
                <Backdrop open={loading}>
                    <CircularProgress color="success"/>    
                </Backdrop>
            }
            <div className={"surveyHeader"}>
                <h2>
                    Survey Completed!
                    {/* Header fetched from backend */}
                </h2>
                <h3>
                    It is important to make daily
                    measurment on your health to
                    keep track of Your progress

                    {/* Bonus header also fetched from backend */}
                </h3>
            </div>
            <div className={'survey-buttons'}>
                <Button variant={'outlined'} onClick={() => props.setPage(3)}>
                    Return
                </Button>
                <Button variant={'contained'} onClick={() => handleClose()}>
                    Close survey
                </Button>    
            </div>
        </div>
    );
};

export default OutroPage;