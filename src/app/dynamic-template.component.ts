import { CommonModule } from '@angular/common';
import { Compiler, Component, ComponentRef, Directive, Input, ModuleWithComponentFactories, NgModule, OnChanges, OnDestroy, Type, ViewContainerRef } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

//#region GridColumnViewTemplate

@Component({
    selector: 'app-dynamic-template',
    template: '<ng-container *appDynamicTemplateCompiler="{ template: template, data: data }; context: this"></ng-container>'
})
export class DynamicTemplateComponent {
    //#region Variables

    @Input() template: string;
    @Input() data: any;

    //#endregion
    //#region constructor

    constructor() { }

    //#endregion
}

//#endregion
//#region GridColumnViewTemplateContainerDirective

@Directive({ selector: '[appDynamicTemplateCompiler]' })
export class DynamicTemplateContainerDirective implements OnChanges, OnDestroy {
    //#region Variables

    @Input() appDynamicTemplateCompiler: { template: string; data: any };
    @Input() appDynamicTemplateCompilerContext: DynamicTemplateComponent;

    private _componentRef?: ComponentRef<any>;

    //#endregion
    //#region Constructor

    constructor(private readonly $compiler: Compiler, private readonly $viewContainerRef: ViewContainerRef) { }

    //#endregion

    // Component lifecycle events
    //#region ngOnChanges

    ngOnChanges(): void {
        if (this._componentRef !== undefined && this._componentRef !== null) {
            this.updateProperties();
            return;
        }

        this.$viewContainerRef.clear();
        this._componentRef = undefined;

        const componentType = this.createDynamicComponent(this.appDynamicTemplateCompiler.template);
        const moduleType = this.createDynamicModule(componentType);

        this.$compiler.compileModuleAndAllComponentsAsync(moduleType)
            .then((moduleWithFactories: ModuleWithComponentFactories<any>) => {
                const compFactory = moduleWithFactories.componentFactories.find(x => x.componentType === componentType);
                if (compFactory) {
                    this._componentRef = this.$viewContainerRef.createComponent(compFactory);
                    this.updateProperties();
                }
            })
            .catch(error => {
                console.log(error);
            });
    }

    //#endregion
    //#region ngOnDestroy

    ngOnDestroy(): void {
        this.$viewContainerRef.clear();
        this._componentRef = undefined;
    }

    //#endregion

    // Private methods
    //#region updateProperties

    private updateProperties(): void {
        if (this._componentRef === undefined && this._componentRef === null)
            return;

        this._componentRef.instance.data = this.appDynamicTemplateCompiler.data;
    }

    //#endregion
    //#region createDynamicComponent

    private createDynamicComponent(template: string): Type<any> {
        const dynamicComponent = Component({
            template: `<ng-container>${template}</ng-container>`
        })(
            class GridColumnDynamicComponent {
                data: any;
            });
        return dynamicComponent;
    }

    //#endregion
    //#region createDynamicModule

    private createDynamicModule(component: Type<any>): Type<any> {
        // We might need other modules, providers, etcetera. Whatever components we want to be able to render dynamically must be known to this module.
        const dynamicModule = NgModule({
            declarations: [component],
            imports: [CommonModule, ReactiveFormsModule],
        })(class GridColumnDynamicModule { })
        return dynamicModule;
    }

    //#endregion
}

//#endregion
