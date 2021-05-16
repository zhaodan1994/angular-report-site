/*开发者模式的配置*/
import { enableProdMode } from '@angular/core';
/*告诉Angular使用哪个模块启动应用*/
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
/*导入主模块*/
import { AppModule } from './app/app.module';
/*倒入环境配置*/
import { environment } from './environments/environment';

/*如果是生产环境  关闭开发者模式*/
if (environment.production) {
  enableProdMode();
}

/*程序的起点，整个程序就是从这里运行的，AppModule指向的是/app/app.module
，也就是说程序启动时会去加载/app/app.module这个文件*/

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));


  // 总的来说， main.ts告诉Angular主模块是AppModule,
  // Angular也就知道了去加载AppModule
