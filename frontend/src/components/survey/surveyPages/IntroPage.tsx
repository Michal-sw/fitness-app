import { Button } from "@mui/material";

const IntroPage = (props: { setPage: (page: number) => void, surveyNumber: string }) => {
    
    return (
        <div className={'survey-body'}>
            <div className={"survey-header"}>
                <h2>
                    Hi this is your {props.surveyNumber} health survey!
                    {/* Header fetched from backend */}
                </h2>
                <h4>
                    It is important to make daily
                    measurment on your health to
                    keep track of Your progress

                    {/* Bonus header also fetched from backend */}
                </h4>
            </div>
            <span>
                Wanna get started?
            </span>
            <Button variant={'contained'} onClick={() => props.setPage(1)}>
                Let's go!
            </Button>
        </div>
    );
};

export default IntroPage;
