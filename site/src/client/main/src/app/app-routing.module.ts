import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OverviewComponent } from './components/overview/overview.component';
import { DocumentationComponent } from './components/documentation/documentation.component';
import { SamplesComponent } from './components/samples/samples.component';
import { TestingComponent } from './components/testing/testing.component';
import { CatalogHomeComponent } from './components/catalog-home/catalog-home.component';
import { UserStoriesComponent } from './components/user-stories/user-stories.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { TypeDocGlobalsComponent } from './components/type-doc-globals/type-doc-globals.component';
import { TypeDocModulesComponent } from './components/type-doc-modules/type-doc-modules.component';
import { TypeDocEnumsComponent } from './components/type-doc-enums/type-doc-enums.component';
import { TypeDocClassesComponent } from './components/type-doc-classes/type-doc-classes.component';
import { TypeDocViewComponent } from './components/type-doc-view/type-doc-view.component';
import { UseCaseListComponent } from './components/use-case-list/use-case-list.component';
import { ToolsComponent } from './components/tools/tools.component';
import { ToolsHomeComponent } from './components/tools-home/tools-home.component';
import { ToolsCompareComponent } from './components/tools-compare/tools-compare.component';


const routes: Routes = [
  {path: 'overview', component: OverviewComponent, data: { hasSideBar: false } },
  { path: 'documentation',  component: DocumentationComponent,  data: { hasSideBar: false } , children: [
    { path: 'globals', component: TypeDocGlobalsComponent },
    { path: 'modules/:page', component: TypeDocModulesComponent },
    { path: 'enums/:page', component: TypeDocEnumsComponent },
    { path: 'interfaces/:page', component: TypeDocClassesComponent, data: { type: 'interfaces' } },
    { path: 'classes/:page', component: TypeDocClassesComponent, data: { type: 'classes' } },
    { path: '', component: TypeDocViewComponent }
  ]},
  {path: 'samples', component: SamplesComponent, data: { hasSideBar: true }, children: [
    { path: 'edit', component: CatalogHomeComponent },
    { path: '', component: CatalogHomeComponent },
    { path: '**', component: UseCaseListComponent }
  ]},
  {path: 'testing', component: TestingComponent, data: { hasSideBar: true }, children: [
    { path: 'edit', component: CatalogHomeComponent },
    { path: '', component: CatalogHomeComponent },
    { path: '**', component: UseCaseListComponent }
  ]},
  {path: 'userstories', component: UserStoriesComponent, data: { hasSideBar: true }, children: [
    { path: 'edit', component: CatalogHomeComponent },
    { path: '', component: CatalogHomeComponent },
    { path: '**', component: UseCaseListComponent }
  ]},
  {path: 'tools', component: ToolsComponent, data: { hasSideBar: false }, children: [
    { path: 'compare', component: ToolsCompareComponent , data: { hasSideBar: true }, children: [
      { path: '', component: ToolsCompareComponent },
      { path: '**', component: ToolsCompareComponent }
    ]},
    { path: '', component: ToolsHomeComponent }
  ]},
  { path: '', redirectTo: 'overview', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent, data: { hasSideBar: false } }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
