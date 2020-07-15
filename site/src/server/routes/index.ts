import { NextFunction, Request, Response, Router } from 'express';
import { join } from 'path';
import { versions } from '../models/version';
import { existsSync, readdirSync } from 'fs';
import { ReportDetails } from '../models/report-details';
import { CaseRelation } from '../models/case-relation';
import { createReport } from '../models/report.builder';
export const router: Router = Router();


router.get('/api/:version/deleteReport/', (req: Request, res: Response, next: NextFunction) => {
  const versionName: string = req.params.version;
  const reportDetails = new ReportDetails(versionName);
  try {
    res.json(reportDetails.deleteReport());
  } catch (e) {
    res.status(500).json(e.message);
  }
});


router.post('/api/:version/:render/updateCases',(req: Request, res: Response, next: NextFunction) =>{
  const versionName: string = req.params.version;
  const render: string = req.params.render;
  const keys = req.body;
  const caseRelation = new CaseRelation(versionName, render);
  try {
    res.json(caseRelation.updateCaseRelation(keys));
  } catch (e) {
    res.status(500).json(e.message);
  }
});

router.post('/api/:version/createReport',(req: Request, res: Response, next: NextFunction) =>{
  const versionName: string = req.params.version;
  const report = req.body;
  try {
   const result = createReport(report, versionName);
   res.json(result);
  } catch (e) {
    res.status(500).json(e.message);
  }
});

router.get('/api/:version/model/*', (req: Request, res: Response, next: NextFunction) => {
  const versionName: string = req.params.version;
  try {
    const version = versions[versionName];
    if (version == null) {
      next();
    } else {
      const keys = (req.params[0] as string).trim().split('/').filter((item) => item);
      res.json(version.modelFromKeys(keys, true));
    }
  } catch (e) {
    res.status(500).json(e.message);
  }
});

router.get('/api/:version/usecase/*', (req: Request, res: Response, next: NextFunction) => {
  const versionName: string = req.params.version;
  try {
    const version = versions[versionName];
    if (version == null) {
      next();
    } else {
      const keys = (req.params[0] as string).trim().split('/').filter((item) => item);
      res.json(version.modelFromKeys(keys, false));
    }
  } catch (e) {
    res.status(500).json(e.message);
  }
});

router.get('/api/:version/documentation/', (req: Request, res: Response, next: NextFunction) => {
  const versionName: string = req.params.version;
  try {
    const version = versions[versionName];
    if (version == null) {
      next();
    } else {
      res.json(version.documentation);
    }
  } catch (e) {
    res.status(500).json(e.message);
  }
});

router.get('/api/:version/reportDetails/*', (req: Request, res: Response, next: NextFunction) => {
  const versionName: string = req.params.version;
  const dirName = req.params[0]  + '.json';
  const reportDetails = new ReportDetails(versionName);
  try {
    res.json(reportDetails.getReportDetails(dirName));
  } catch (e) {
    res.status(500).json(e.message);
  }
});

router.get('/api/:version/reportList/', (req: Request, res: Response, next: NextFunction) => {
  const versionName: string = req.params.version;
  const reportDetails = new ReportDetails(versionName);
  try {
    res.json(reportDetails.getReportList());
  } catch (e) {
    res.status(500).json(e.message);
  }
});

router.get('/api/:version/comparedReportList/', (req: Request, res: Response, next: NextFunction) => {
  const versionName: string = req.params.version;
  const reportDetails = new ReportDetails(versionName);
  try {
    res.json(reportDetails.getComparedReportList());
  } catch (e) {
    res.status(500).json(e.message);
  }
});

router.get('/api/:version/:render/relation/', (req: Request, res: Response, next: NextFunction) => {
  const versionName: string = req.params.version;
  const render: string = req.params.render;
  const caseRelation = new CaseRelation(versionName, render);
  try {
    res.json(caseRelation.getCaseRelation());
  } catch (e) {
    res.status(500).json(e.message);
  }
});

router.get('/api/:version/data/*', (req: Request, res: Response, next: NextFunction) => {
  const versionName: string = req.params.version;
  try {
    const version = versions[versionName];
    if (version == null) {
      next();
    } else {
      const keys = (req.params[0] as string).trim().split('/').filter((item) => item);
      res.json(version.dataFromKeys(keys));
    }
  } catch (e) {
    res.status(500).json(e.message);
  }
});

router.get('/api/:version/geojson/*', (req: Request, res: Response, next: NextFunction) => {
  const versionName: string = req.params.version;
  try {
    const version = versions[versionName];
    if (version == null) {
      next();
    } else {
      const keys = (req.params[0] as string).trim().split('/').filter((item) => item);
      res.json(version.geojsonFromKeys(keys));
    }
  } catch (e) {
    res.status(500).json(e.message);
  }
});

router.get('/api/*', (req: Request, res: Response, next: NextFunction) => {
  res.status(404).json('Not Found!');
})

router.get('/lib/:version/calcengine/*', (req: Request, res: Response, next: NextFunction) => {
  const versionName: string = req.params.version;
  try {
    const version = versions[versionName];
    if (version == null) {
      next();
    } else {
      let folderPath: string;
      if (process.env.NODE_ENV === 'development') {
        folderPath = join(__dirname, './../../../src/test-versions/' + versionName + '/lib/calcengine');
      } else {
        folderPath = join(__dirname, './../../../versions/' + versionName + '/lib/calcengine');
      }
      const urlFileName = (req.params[0] as string).trim().toLowerCase().split('/').filter((item) => item).join('/');
      if (!readdirSync(folderPath).some((name) => {
        const fileName = name.trim().toLowerCase().split('.').filter((item) => item && isNaN(Number.parseInt(item, 10))).join('.');
        if (fileName === urlFileName) {
          res.sendFile(join(folderPath, name));
          return true;
        } else {
          return false;
        }
      })) {
        next();
      }
    }
  } catch (e) {
    res.status(500).json(e.message);
  }
});

router.get('/lib/:version/dv/*', (req: Request, res: Response, next: NextFunction) => {
  const versionName: string = req.params.version;
  try {
    const version = versions[versionName];
    if (version == null) {
      next();
    } else {
      let fileName: string;
      if (process.env.NODE_ENV === 'development') {
        fileName = join(__dirname, './../../../src/test-versions/' + versionName + '/lib/dv/') + (req.params[0] as string).trim().toLowerCase().split('/').filter((item) => item).join('/');
      } else {
        fileName = join(__dirname, './../../../versions/' + versionName + '/lib/dv/') + (req.params[0] as string).trim().toLowerCase().split('/').filter((item) => item).join('/');
      }
      if (existsSync(fileName)) {
        res.sendFile(fileName);
      } else {
        next();
      }
    }
  } catch (e) {
    res.status(500).json(e.message);
  }
});

router.get('/package/:version/*', (req: Request, res: Response, next: NextFunction) => {
  const versionName: string = req.params.version;
  try {
    const version = versions[versionName];
    if (version == null) {
      next();
    } else {
      let fileName: string;
      if (process.env.NODE_ENV === 'development') {
        fileName = join(__dirname, './../../../src/test-versions/' + versionName + '/package/') + (req.params[0] as string).trim().toLowerCase().split('/').filter((item) => item).join('/');
      } else {
        fileName = join(__dirname, './../../../versions/' + versionName + '/package/') + (req.params[0] as string).trim().toLowerCase().split('/').filter((item) => item).join('/');
      }
      if (existsSync(fileName)) {
        res.sendFile(fileName);
      } else {
        next();
      }
    }
  } catch (e) {
    res.status(500).json(e.message);
  }
});





/* GET home page. */

router.get('/plot/*', (req: Request, res: Response, next: NextFunction) => {
  res.sendFile(join(__dirname, '../../client/plot/index.html'));
});

router.get('*', (req: Request, res: Response, next: NextFunction) => {
  res.sendFile(join(__dirname, '../../client/main/index.html'));
});

