import {
  Button,
  FormControl,
  FormControlLabel,
  IconButton,
  Radio,
  RadioGroup,
} from "@mui/material";

import { CloseOutlined } from "@mui/icons-material";
import { SurveyPageDT } from "../../core/types/SurveyPageDT";

const PageModal = (props: SurveyPageDT) => {
  return (
    <div className={"survey-body"}>
      <div className={"survey-header"}>
        <IconButton
          sx={{ alignSelf: "flex-end" }}
          onClick={() => props.setVisible(false)}
        >
          <CloseOutlined />
        </IconButton>
        <h2>{props.header}</h2>
        <h4>{props.infoText}</h4>
      </div>
      <FormControl>
        <RadioGroup
          row
          defaultValue={1}
          onChange={(event) => props.setAnswer(Number(event.target.value))}
        >
          <FormControlLabel value={1} control={<Radio />} label="1" />
          <FormControlLabel value={2} control={<Radio />} label="2" />
          <FormControlLabel value={3} control={<Radio />} label="3" />
          <FormControlLabel value={4} control={<Radio />} label="4" />
          <FormControlLabel value={5} control={<Radio />} label="5" />
          <FormControlLabel value={6} control={<Radio />} label="6" />
          <FormControlLabel value={7} control={<Radio />} label="7" />
          <FormControlLabel value={8} control={<Radio />} label="8" />
          <FormControlLabel value={9} control={<Radio />} label="9" />
        </RadioGroup>
      </FormControl>
      <div className={"survey-buttons"}>
        <Button
          variant={"outlined"}
          onClick={() => props.setPage(props.pageNumber - 1)}
        >
          Previous
        </Button>
        <Button
          variant={"contained"}
          onClick={() => props.setPage(props.pageNumber + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default PageModal;
