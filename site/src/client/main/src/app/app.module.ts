import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatListModule} from '@angular/material/list';
import {MatTooltipModule} from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatBadgeModule} from '@angular/material/badge';
import { MatMenuModule } from '@angular/material/menu';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatDialogModule} from '@angular/material/dialog';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app/app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OverviewComponent } from './components/overview/overview.component';
import { DocumentationComponent } from './components/documentation/documentation.component';
import { CategoryComponent } from './components/category/category.component';
import { SamplesComponent } from './components/samples/samples.component';
import { TestingComponent } from './components/testing/testing.component';
import { CatalogComponent } from './components/catalog/catalog.component';
import { UserStoriesComponent } from './components/user-stories/user-stories.component';
import { CatalogHomeComponent } from './components/catalog-home/catalog-home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { TypeDocViewComponent } from './components/type-doc-view/type-doc-view.component';
import { TypeDocGlobalsComponent } from './components/type-doc-globals/type-doc-globals.component';
import { TypeDocTypesComponent } from './components/type-doc-types/type-doc-types.component';
import { TypeDocCommentComponent } from './components/type-doc-comment/type-doc-comment.component';
import { TypeDocModulesComponent } from './components/type-doc-modules/type-doc-modules.component';
import { TypeDocEnumsComponent } from './components/type-doc-enums/type-doc-enums.component';
import { TypeDocClassesComponent } from './components/type-doc-classes/type-doc-classes.component';
import { TypeDocSearchComponent } from './components/type-doc-search/type-doc-search.component';
import { APP_BASE_HREF, PlatformLocation } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatTreeModule } from '@angular/material/tree';
import { CatalogHomeNodeComponent } from './components/catalog-home-node/catalog-home-node.component';
import { PlotViewerExternalComponent } from './components/plot-viewer-external/plot-viewer-external.component';
import { PlotViewerComponent } from './components/plot-viewer/plot-viewer.component';
import { ShareServicesModule } from 'share-services/share-services.module';
import { CodeEditorComponent } from './components/code-editor/code-editor.component';
import { SnippetEditorComponent } from './components/snippet-editor/snippet-editor.component';
import { SelectElementComponent } from './components/select-element/select-element.component';
import { UseCaseListComponent } from './components/use-case-list/use-case-list.component';
import { UseCaseSnippetComponent } from './components/use-case-snippet/use-case-snippet.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { ToolsComponent } from './components/tools/tools.component';
import { ToolsHomeComponent } from './components/tools-home/tools-home.component';
import { ToolsCompareComponent } from './components/tools-compare/tools-compare.component';
import { CompareCatalogComponent } from './components/compare-catalog/compare-catalog.component';
import { ToolsComparisonComponent } from './components/tools-comparison/tools-comparison.component';
import { DiffDomComponent } from './components/diff-dom/diff-dom.component';
import { DiffCanvasComponent } from './components/diff-canvas/diff-canvas.component';
import { ReportListComponent } from './components/report-list/report-list.component';
import { ReportDetailsComponent } from './components/report-details/report-details.component';
import { ReportComponent } from './components/report/report.component';
import { ReportCatalogComponent } from './components/report-catalog/report-catalog.component';
import { ReportContentComponent } from './components/report-content/report-content.component';






@NgModule({
  declarations: [
    AppComponent,
    OverviewComponent,
    DocumentationComponent,
    CategoryComponent,
    SamplesComponent,
    TestingComponent,
    CatalogComponent,
    UserStoriesComponent,
    CatalogHomeComponent,
    NotFoundComponent,
    TypeDocViewComponent,
    TypeDocGlobalsComponent,
    TypeDocTypesComponent,
    TypeDocCommentComponent,
    TypeDocModulesComponent,
    TypeDocEnumsComponent,
    TypeDocClassesComponent,
    TypeDocSearchComponent,
    CatalogHomeNodeComponent,
    PlotViewerExternalComponent,
    PlotViewerComponent,
    CodeEditorComponent,
    SnippetEditorComponent,
    SelectElementComponent,
    UseCaseListComponent,
    UseCaseSnippetComponent,
    ToolsComponent,
    ToolsHomeComponent,
    ToolsCompareComponent,
    CompareCatalogComponent,
    ToolsComparisonComponent,
    DiffDomComponent,
    DiffCanvasComponent,
    ReportListComponent,
    ReportDetailsComponent,
    ReportComponent,
    ReportCatalogComponent,
    ReportContentComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    FormsModule,
    MatTreeModule,
    MatExpansionModule,
    MatListModule,
    MatTooltipModule,
    ShareServicesModule,
    MatSelectModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatCheckboxModule,
    MatBadgeModule,
    MatMenuModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule
  ],
  providers: [{
    provide: APP_BASE_HREF,
    deps: [PlatformLocation],
    useFactory(platformLocation: PlatformLocation): string {
      return platformLocation.getBaseHrefFromDOM();
    }
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
