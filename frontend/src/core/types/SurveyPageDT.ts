export interface SurveyPageDT {
  header: string;
  infoText: string;
  setAnswer: (answer: number) => void;
  setPage: (page: number) => void;
  pageNumber: number;
  setVisible: (visible: boolean) => void;
}
