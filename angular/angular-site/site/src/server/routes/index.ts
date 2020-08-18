import { NextFunction, Request, Response, Router } from 'express';
import { existsSync, readdirSync } from 'fs';
import { join } from 'path';
import { versions } from '../models/version';
export const router: Router = Router();

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

router.get('/api/:version/reportList/', (req: Request, res: Response, next: NextFunction) => {
  const versionName: string = req.params.version;
  try {
    const version = versions[versionName];
    if (version == null) {
      next();
    } else {
      res.json(version.reportList);
    }
  } catch (e) {
    res.status(500).json(e.message);
  }
});

router.get('/api/:version/relation/', (req: Request, res: Response, next: NextFunction) => {
  const versionName: string = req.params.version;
  try {
    const version = versions[versionName];
    if (version == null) {
      next();
    } else {
      res.json(version.relation);
    }
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
});

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
