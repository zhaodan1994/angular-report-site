export interface ReportListModel {
    start: string;
    testResult: {
        success: number;
        failed: number;
        up: number;
        down: number;
    };
    end: string;
    duration: string;
  }