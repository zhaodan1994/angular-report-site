import { statSync, existsSync, readFileSync, writeFileSync, readdirSync } from 'fs';
import { versionPath} from './version-path';
import path = require('path');
import * as child_process from 'child_process';
import { CaseRelation } from './case-relation';
// import child_process = require('child_process');



interface IReport {
  [index: string]: object[];
}

export class ReportDetails {
   public version : string;

   constructor(version: string) {
     this.version = version;
   }

   getReportDetails(dirname: string): [] | null {
    const filePath = path.join(versionPath, this.version, 'report', dirname);  
    if (existsSync(filePath) && statSync(filePath).isFile()) {
      const buffer = readFileSync(filePath, 'utf8');
      try {
        return JSON.parse(buffer);
      } catch (e) {
        throw new Error('case file is invalid!');
      }
    } else {
      return null;
    }
  }

  getReportList(): IReport | null {
    const filePath = path.join(versionPath, this.version, 'report', 'report.json');
    if (existsSync(filePath) && statSync(filePath).isFile()) {
        const buffer = readFileSync(filePath, 'utf8');
        const result =  JSON.parse(buffer);
        return result;                    
      } else {
          return null;
      }
}

  getComparedReportList(): IReport | null {
    const report = this.getReportList();
    if (report) {
      const result: IReport  = {};
      for (const key in report) {
        if (report.hasOwnProperty(key)) {
          result[key] = [];
          report[key].forEach((element: any) => {
            result[key].push(element.start);
          });            
        }
      }
      return result;
    } else {
      return null;
    }
}

  deleteReport(): object {
    const status = {
      data : 'ok'
    };
    const reportPath = path.join(versionPath, this.version, 'report', 'report.json');
    const reportModel = this.getReportList();
    const deleteDirs = [];
    let svgCount = reportModel!.svg.length;
    let canvasCount = reportModel!.canvas.length;
    while(svgCount - 30 > 0) {
      const content = reportModel!.svg.shift();
      deleteDirs.push((content as any).start);
      svgCount-- ;
    }

    while(canvasCount - 30 > 0) {
      const content = reportModel!.canvas.shift();
      deleteDirs.push((content as any).start);
      canvasCount--;
    }

    if (deleteDirs.length > 0) {
      writeFileSync(reportPath, JSON.stringify(reportModel));
    }
   
    deleteDirs.forEach(dir => {
      const dirPath = path.join(versionPath, this.version, 'report', dir);
      if (existsSync(dirPath) && statSync(dirPath).isDirectory()) {
        child_process.exec(`rm -rf ${dirPath}`, 
        (error) => {
          if (error) {
              status.data = error.message;
          }
        })
      }

    });
    return this.deletePackage();

  }

  deletePackage(): object{
    const status = {
      data : 'ok'
    };
    const canvasCases = new CaseRelation(this.version, 'canvas');
    const svgCases = new CaseRelation(this.version, 'svg');
    
    const dateArray: string[] = [];
    canvasCases.getCaseRelation()!.forEach(element => {
      dateArray.push(element.date);
    });

    svgCases.getCaseRelation()!.forEach(element => {
      dateArray.push(element.date);
    });

    const packageList = readdirSync(path.join(versionPath, this.version, 'package'));
    packageList.forEach(element => {
      if (dateArray.indexOf(element) == -1) {

        const packagePath = path.join(versionPath, this.version, 'package', element);
        if (statSync(packagePath).isDirectory()) {
          child_process.exec(`rm -rf ${packagePath}`, 
          (error) => {
            if (error) {
              status.data = error.message;
            }
          })
        }

      }
    });

    return status;

  }


}


