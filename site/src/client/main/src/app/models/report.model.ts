export class ReportModel {
     startTime: string;
     endTime: string;
     totalCases: number;
     failedKeys: string[][];
     compareDate: string;
     render: string;
     duration: string;
  

    constructor(startTime: Date, endTime: Date, totalCases: number, failedKeys: string[][],compareDate:string, render: string ) {
        this.startTime = this.getTime(startTime);
        this.endTime = this.getTime(endTime);
        this.totalCases = totalCases;
        this.failedKeys = failedKeys;
        this.compareDate = compareDate;
        this.render =  render;
        this.duration = this.getDuration(endTime.getTime() - startTime.getTime());
    }

    private getTime(currentDate: Date): string {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth() < 9 ? '0' + (currentDate.getMonth() + 1) : currentDate.getMonth() + 1 ;
        const day = currentDate.getDate() < 10 ? '0' + currentDate.getDate() : currentDate.getDate() ;
        const hour = currentDate.getHours() < 10 ? '0' + currentDate.getHours() : currentDate.getHours() ;
        const minute = currentDate.getMinutes() < 10 ? '0' + currentDate.getMinutes() : currentDate.getMinutes() ;
        const second = currentDate.getSeconds() < 10 ? '0' + currentDate.getSeconds() : currentDate.getSeconds() ;
        const time = year + '-' + month + '-' + day + '-' + hour + '-' + minute + '-' + second;
        return time;
    }

    private getDuration(dateDiff: number): string {
        const dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000));
        const leave1=dateDiff%(24*3600*1000);  //计算天数后剩余的毫秒数
        const hours=Math.floor(leave1/(3600*1000)); //计算出小时数
        //计算相差分钟数
        const leave2=leave1%(3600*1000);  //计算小时数后剩余的毫秒数
        const minutes=Math.floor(leave2/(60*1000));//计算相差分钟数
        //计算相差秒数
        const leave3=leave2%(60*1000);
        const seconds=Math.round(leave3/1000);
        let timeFn = "";
        if (dayDiff !== 0 ){
            timeFn =  dayDiff +"d" + hours+"h" + minutes+"m" + seconds+"s"
        } else if(hours !== 0) {
            timeFn =  hours + "h" + minutes+"m" + seconds+"s"
        } else if (minutes !==0 ) {
            timeFn = minutes +"m" + seconds+"s"
        } else {
            timeFn =  seconds+"s"
        }
        return timeFn;
      }

}

