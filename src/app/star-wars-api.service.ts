import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {StarWarsCharacterInterface} from "./star-wars-character.interface";
import {map, shareReplay, switchMap} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class StarWarsApiService {

    constructor(
        private httpClient: HttpClient
    ) {
    }

    characters$ = this.httpClient.get<any>('https://swapi.dev/api/people/')
        .pipe(
            map((characters) => {
                const firstFemaleCharacter = characters.results.find((character: any) => {
                    return character.gender === "female"
                }) ?? {}

                return {
                    name: firstFemaleCharacter.name,
                    homeworld: firstFemaleCharacter.homeworld
                }
            }),
            switchMap(({name, homeworld}) => {
                return this.httpClient.get(homeworld).pipe(
                    map((homeworldData: any) => {
                        return {
                            homeworldName: homeworldData.name,
                            name
                        }
                    })
                );
            }),
            shareReplay({refCount: true, bufferSize: 1})
        );



}
