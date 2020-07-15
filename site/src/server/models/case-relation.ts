import path = require('path');
import { versionPath } from './version-path';
import { existsSync, statSync, readFileSync, writeFileSync, readdirSync } from 'fs';


interface IRelation {
    keys: string[];
    date: string
}

export class CaseRelation {
    public version: string;
    public render: string;

    constructor(version: string, render: string) {
        this.version = version;
        this.render = render;
    }

    getCaseRelation(): IRelation[] | null {
        const filePath = path.join(versionPath, this.version, 'package', this.render +'-relation.json');
        if (existsSync(filePath) && statSync(filePath).isFile()) {
            const buffer = readFileSync(filePath, 'utf8');
            const result =  JSON.parse(buffer);
            return result;                    
          } else {
              return null;
          }
    }

    updateCaseRelation(keys: string[][]):object {
        const filePath = path.join(versionPath, this.version, 'package', this.render +'-relation.json');
        const dirlist = readdirSync(path.join(versionPath, this.version, 'package'));
        const fileDate = dirlist[dirlist.length-4];
        const status = {
            data : 'ok'
        };
        try {
            const relationModel =  this.getCaseRelation();
            if (relationModel) {
                let i;
                for (i = 0; i < relationModel.length; i++) {
                    for(let j = 0; j < keys.length; j ++ ) {
                        if (JSON.stringify(relationModel[i].keys) === JSON.stringify(keys[j])) {
                            relationModel[i].date = fileDate;
                            keys.splice(j, 1);
                            break;
                        }
                    }
                    if (keys.length == 0 ){
                        break;
                    } 
                }

                keys.forEach(key => {
                    relationModel.push({
                      keys : key,
                      date : fileDate
                  })
                });
                writeFileSync(filePath, JSON.stringify(relationModel));
            } else {
                const relation: IRelation[] = [];
                keys.forEach(key => {
                    relation.push({
                      keys : key,
                      date : fileDate
                  })
                });
                writeFileSync(filePath, JSON.stringify(relation));       
      
              }
        } catch (error) {
            status.data = "update failed !" + error ;
        }

        return status;
      }


}


