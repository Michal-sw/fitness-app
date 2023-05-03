import { Button, IconButton } from "@mui/material";
import { CloseOutlined } from "@mui/icons-material";

interface IIntroPage {
  setPage: (page: number) => void;
  setVisible: (visible: boolean) => void;
  surveyNumber: string;
}

const IntroPage = (props: IIntroPage) => {
  return (
    <div className={"survey-body"}>
      <div className={"survey-header"}>
        <IconButton
          sx={{ alignSelf: "flex-end" }}
          onClick={() => props.setVisible(false)}
        >
          <CloseOutlined />
        </IconButton>
        <h2>
          Hi this is your {props.surveyNumber} health survey!
          {/* Header fetched from backend */}
        </h2>
        <h4>
          It is important to make daily measurment on your health to keep track
          of Your progress
          {/* Bonus header also fetched from backend */}
        </h4>
      </div>
      <span>Wanna get started?</span>
      <div className={"survey-buttons"}>
        <Button variant={"outlined"} onClick={() => props.setVisible(false)}>
          Not now
        </Button>
        <Button variant={"contained"} onClick={() => props.setPage(1)}>
          Let's go!
        </Button>
      </div>
    </div>
  );
};

export default IntroPage;
