/*这里是从Angular核心模块里面引入了component装饰器*/
import {Component} from '@angular/core';

/*用装饰器定义了一个组件以及组件的元数据  所有的组件都必须使用这个装饰器来注解*/
@Component({
  /*组件元数据  Angular会通过这里面的属性来渲染组件并执行逻辑
  * selector就是css选择器，它会告诉Angular ，
  一旦模板HTML 中找到了 这个选择器对应 的标签，就创建并插入 该组件的一个实例。
eg: index.html 中的 <app-root></app-root>

  *templateUrl  组件的模板，定义了组件的布局和内容,模板以html的形式存在，
  告诉Angular如何来渲染组件，一般来说，模板看起来很像html，
  但是我们可以在模板中使用Angular的数据绑定语法，来呈现  组件类 中的数据。

  另外你也可以使用 template属性的值 提供内联的HTML模板，这个模板定义了该组件的宿主视图



  *styleUrls   该模板引用那个css样式
  * */
  selector: 'app-root',
  templateUrl: './app.component.html',
//   template: `
//   <p>demo-template-property works!</p>
// `,
  styleUrls: ['./app.component.scss']
})
/*AppComponent本来就是一个普通的typescript类，但是上面的组件元数据装饰器告诉Angular，
AppComponent是一个组件，需要把一些元数据附加到这个类上，
Angular就会把AppComponent当组件来处理*/
export class AppComponent {
  /*这个类实际上就是该组件的控制器，我们的业务逻辑就是在这个类中编写*/
  title = '学习Angular';
}


/**除了上面的组件元素，还有一些其他 可选的元素，比如：
 *  providers:[] 这个是用来做依赖注入的
 * 输入属性（@inputs）  是用来接收外部传入的数据的
 * 输出属性（@Outputs）：用来定义一些其他组件可能需要的事件或者用来在组件之间共享数据
 * 生命周期钩子：一个组件从创建到销毁的过程中会有多个钩子会被触发
 */






