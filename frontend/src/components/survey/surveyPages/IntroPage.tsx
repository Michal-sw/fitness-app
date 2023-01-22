import { Button } from "@mui/material";
import useAuth from "../../../core/providers/AuthContext";
import axiosService from "../../../services/axiosService";
import { useEffect, useState } from "react";

const IntroPage = (props: { setPage: (page: number) => void }) => {
    const { user, token } = useAuth();
    const [surveys, setSurveys] = useState<string>("");

    useEffect(() => {
        console.log(user);
        axiosService.getCompletedSurveys(token || "", user._id)
            .then(res => {
                const surveys = res.data.surveys;
                if (surveys.length) setSurveys(surveys.length);
            })
            .catch(err => {
                console.log(err)
            });
    },[])
    
    return (
        <div className={'survey-body'}>
            <div className={"survey-header"}>
                <h2>
                    Hi, {user.login} this is your {surveys.length || "1st"} health survey!
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
