import path = require('path');
import { versionPath } from './version-path';
import { existsSync, statSync, readFileSync, writeFileSync, mkdirSync} from 'fs';



interface IReportModel {
    startTime: string,
    endTime: string,
    failedKeys: string[][],
    compareDate: string,
    render: string,
    totalCases: number,
    duration : string

}

interface IFailedCase {
    [index : string]: string[]
}


export function createReport(report: IReportModel, version: string):object {
        const filePath = path.join(versionPath, version, 'report', 'report.json');
       
        const status = {
            data : 'ok'
        };
        try {
            const dirPath = path.join(versionPath, version, 'report', report.startTime);
            // make report dir
            mkdirSync(dirPath);

            // create report of all failed cases
            createAllReport(report, version);

            // update the report.json  
            if (existsSync(filePath) && statSync(filePath).isFile()) {
                const buffer = readFileSync(filePath, 'utf8');
                const result =  JSON.parse(buffer);
                if (report.render === 'Canvas') {
                    result.canvas.push(buildModel(report, version));
                } else {
                    result.svg.push(buildModel(report, version))
                }                     
                writeFileSync(filePath, JSON.stringify(result));            

              } 
  
        } catch (error) {
            status.data = "run cases failed !" + error ;
        }

        return status;
      }


    function buildModel(report: IReportModel, version: string): object {
        const model = {
            start : "",
            end : "",
            testResult : {
                success : 0,
                failed : 0,
                up : 0,
                down : 0
            },
            duration : ""
        }
        model.start =  report.startTime;
        model.end = report.endTime.slice(0,10) + '(' + report.endTime.slice(11).replace(/-/g, ':') + ')';
        model.testResult.failed = report.failedKeys.length;
        model.testResult.success = report.totalCases - model.testResult.failed;
        model.duration = report.duration;
        if (report.compareDate === '') {
            model.testResult.up = report.failedKeys.length;
        } else {
            const caseCount = createNewReport(report, version);
            model.testResult.up = caseCount[0];
            model.testResult.down = caseCount[1];
        }
     
        return model;

      }

    function createAllReport(report: IReportModel, version: string) {
        const model : IFailedCase = {};
        report.failedKeys.forEach(keys => {
            const key = keys.slice(1, keys.length-1).join('-');
            if (!model[key]) {
                model[key] = [];
            }         
            model[key].push(keys[keys.length-1]);
        });

        const fileName = report.render.toLocaleLowerCase() + '-all.json';
        const reportPath = path.join(versionPath, version, 'report', report.startTime, fileName);
        writeFileSync(reportPath, JSON.stringify(model));
    }

    function createNewReport(report: IReportModel, version: string): number[] {
        const result = [];
        const fileName = report.render.toLocaleLowerCase() + '-all.json';
        const reportPath = path.join(versionPath, version, 'report', report.compareDate, fileName);
        const buffer = readFileSync(reportPath, 'utf8');
        const model =  JSON.parse(buffer);
        const oldArray: string[] = [];
        for (const key in model) {
            if (model.hasOwnProperty(key)) {
               model[key].forEach((element: string) => {
                   oldArray.push(key + '-' + element)
               });               
            }
        }
        const newArray: string[] = [];
        report.failedKeys.forEach(element => {
            newArray.push(element.slice(1).join('-'));
        });

        const newCases = newArray.filter(function(v){ return oldArray.indexOf(v) == -1 });
        result.push(newCases.length);
        const closedCases = oldArray.filter(function(v){ return newArray.indexOf(v) == -1 });
        result.push(closedCases.length);

        const newCasesModel : IFailedCase = {};
        newCases.forEach(name => {
            const index = name.lastIndexOf('-');
            const key = name.substring(0, index);
            if (!newCasesModel[key]) {
                newCasesModel[key] = [];
            }          
            newCasesModel[key].push(name.substring(index + 1));
        });

        // create report of new failed cases
        if (newCases.length > 0) {
            const newFileName = report.render.toLocaleLowerCase() + '-new.json';
            const newRportPath = path.join(versionPath, version, 'report', report.startTime, newFileName);
            writeFileSync(newRportPath, JSON.stringify(newCasesModel));
        }     
        return result;
        
    }

     