import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent {
    title = 'angular-jit-production';
    dynamicTemplate = '<h1>{{ data.title }}</h1><p>{{ data.paragraph }}</p>';
    data: any = { title: 'Dynamic heading', paragraph: 'This is the dynamic text that should display...' };
}
