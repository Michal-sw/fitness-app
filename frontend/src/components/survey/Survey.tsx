import '../../styles/survey/Survey.scss'
import { useCallback, useState } from "react";
import IntroPage from "./surveyPages/IntroPage";
import PageModal from "./PageModal";
import OutroPage from "./surveyPages/OutroPage";
import { Collapse, Fade, Slide } from '@mui/material';

interface ISurvey {
    visible: boolean,
    setVisible: (visible: boolean) => void;
    surveyId: string;
    surveyNumber: string;
    setPendingSurvey: (visible: boolean) => void;
}

const Survey = (props: ISurvey) => {

    const [page, setPage] = useState<number>(0);
    const [waterAnswer, setWaterAnswer] = useState<number>(1);
    const [sleepAnswer, setSleepAnswer] = useState<number>(1);
    const [trainingAnswer, setTrainingAnswer] = useState<number>(1);
   
    const renderPage = useCallback(() => {
        switch (page) {
            case 0: {
                return (
                    <IntroPage setPage={setPage} surveyNumber={props.surveyNumber} setVisible={props.setVisible}/>
                )
            }
            case 1: {
                return (
                    <PageModal 
                        header={'How many liters of water did You drink yesterday?'}
                        infoText={'Remember to stay hydrated!'}
                        setPage={setPage}
                        setAnswer={setWaterAnswer}
                        pageNumber={page}
                        setVisible={props.setVisible}
                    />
                )
            }
            case 2: {
                return (
                    <PageModal 
                        header={'How many hours of sleep did You get last night?'}
                        infoText={'Not enough sleep might be dangerous'}
                        setPage={setPage}
                        setAnswer={setSleepAnswer}
                        pageNumber={page}
                        setVisible={props.setVisible}
                    />
                )
            }
            case 3: {
                return (
                    <PageModal 
                        header={'How did You feel after Your last training?'}
                        infoText={'Remember to give Your body time to recover'}
                        setPage={setPage}
                        setAnswer={setTrainingAnswer}
                        pageNumber={page}
                        setVisible={props.setVisible}
                    />
                )
            }
            case 4: {
                return (
                    <OutroPage
                        setVisible={props.setVisible}
                        setPendingSurvey={props.setPendingSurvey}
                        setPage={setPage}
                        waterAnswer={waterAnswer}
                        sleepAnswer={sleepAnswer}
                        trainingAnswer={trainingAnswer}
                        surveyId={props.surveyId}
                    />
                )
            }
            default: {
                return;
            }
        }
    }, [page, props, sleepAnswer, trainingAnswer, waterAnswer]);

    return (
        <>
            <Slide in={props.visible} direction='up'>
                <div id={'survey-container'}>
                    {renderPage()}
                </div>
            </Slide>
            
            
        </>
    );
};

export default Survey;
