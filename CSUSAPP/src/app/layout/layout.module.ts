import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { LayoutComponent } from "./layout.component";
import { LayoutRoutes } from "./layout.routing";
import { HeaderComponent } from "../shared/header/header.component";


@NgModule({
    imports: [
      CommonModule,
      RouterModule.forChild(LayoutRoutes),
      FormsModule,ReactiveFormsModule,
    //  PagesModule
    ],
    declarations: [
      HeaderComponent,
      LayoutComponent
    ]
  })
  export class LayoutModule {}