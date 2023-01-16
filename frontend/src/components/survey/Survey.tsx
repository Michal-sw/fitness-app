import '../../styles/survey/Survey.scss'
import { useCallback, useState } from "react";
import IntroPage from "./surveyPages/IntroPage";
import PageModal from "./PageModal";
import OutroPage from "./surveyPages/OutroPage";

interface ISurvey {
    visible: boolean,
    setVisible: (visible: boolean) => void;
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
                    <IntroPage setPage={setPage}/>
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
                    />
                )
            }
            case 3: {
                return (
                    <PageModal 
                        header={'How do You feel after Your last training?'}
                        infoText={'Remember to give Your body time to recover'}
                        setPage={setPage}
                        setAnswer={setTrainingAnswer}
                        pageNumber={page}
                    />
                )
            }
            case 4: {
                return (
                    <OutroPage
                        setVisible={props.setVisible}
                        setPage={setPage}
                        waterAnswer={waterAnswer}
                        sleepAnswer={sleepAnswer}
                        trainingAnswer= {trainingAnswer}
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
            {props.visible &&
            <div id={'survey-container'}>
                {renderPage()}
            </div>}
        </>
    );
};

export default Survey;