import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { PokeService } from '../../services/poke-service';

@Component({
    selector: 'app-pokemon-gift',
    standalone: true,
    imports: [CommonModule, TitleCasePipe],
    templateUrl: './pokemon-gift.html',
    styleUrl: './pokemon-gift.css',
})
export class PokemonGift implements OnInit {
    pokemon: any = null;
    rarity: string = '';
    isLoading: boolean = false;
    isOpening: boolean = false;
    hasGift: boolean = false; // The gift is open?
    giftMessage: string = '';

    constructor(
        private pokeService: PokeService,
        private cdr: ChangeDetectorRef
    ) {}

    ngOnInit(): void { // first message
        this.giftMessage = '¡Haz clic en el botón para descubrir tu regalo sorpresa!';
    }

    openGift(): void {
        this.isOpening = true;
        this.hasGift = false;
        this.pokemon = null;
        this.cdr.detectChanges();

        setTimeout(() => {
            this.getRandomPokemon();
        }, 2000);
    }

    getRandomPokemon(): void {
        this.isLoading = true;
        this.cdr.detectChanges();

        this.pokeService.getRandomPokemon().subscribe({
            next: (data) => {
                this.pokemon = data;
                this.pokeService.getPokemonSpecies(data.id).subscribe((species: any) => {
                    
                    if (species.is_mythical) {
                    this.rarity = 'Mítico';
                    } else if (species.is_legendary) {
                    this.rarity = 'Legendario';
                    } else {
                    this.rarity = 'Común';
                    }

                    this.isLoading = false;
                    this.isOpening = false;
                    this.hasGift = true;

                    this.giftMessage = '¡Felicidades! Has recibido un Pokémon especial. Enviaremos mercancía oficial en tu pedido!';
                    this.cdr.detectChanges();
                });
                },
            error: (err) => {
                console.error('Error al obtener Pokémon', err);
                this.isLoading = false;
                this.isOpening = false;
                this.giftMessage = 'Hubo un error. ¡Inténtalo de nuevo!';
                this.cdr.detectChanges();
            }
        });
    }

    getPokemonId(id: number): string {
        return id.toString().padStart(3, '0');
    }

    getPokemonImage(pokemon: any): string {
        return pokemon?.sprites?.other?.['official-artwork']?.front_default 
            || pokemon?.sprites?.front_default
            || 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png';
    }

    onImageError(event: Event): void {
        const img = event.target as HTMLImageElement;
        img.src = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png';
    }

}