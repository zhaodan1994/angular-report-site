import { join } from 'path';

export let versionPath = join(__dirname, '../../../versions');
if (process.env.NODE_ENV === 'development') {
  versionPath = join(__dirname, '../../../src/test-versions');
}
