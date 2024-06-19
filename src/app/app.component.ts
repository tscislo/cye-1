import {Component, inject} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {StarWarsApiService} from "./star-wars-api.service";
import {AsyncPipe, JsonPipe} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        RouterOutlet,
        AsyncPipe,
        JsonPipe,
        HttpClientModule
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {

    public starWarsApiService = inject(StarWarsApiService);

}
