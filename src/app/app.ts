import { Component, OnInit, signal } from '@angular/core';
import { defaultThingsToDo, ThingToDo } from './defaultThingsToDo';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
   thingsToDo = signal<ThingToDo[]>([]);
   randomThingToDo = signal<ThingToDo | null>(null);

  ngOnInit(): void {
    this.thingsToDo.set(defaultThingsToDo);
  }

   createThingToDo(text: string) {
    const [name, duration] = text.split(',').map((part) => part.trim());

    if (!name || !duration) {
      alert('Please enter a valid thing to do in the format: "name, duration"');
      return;
    }
    const newThingToDo: ThingToDo = { name, duration };
    this.thingsToDo.update((things) => [...things, newThingToDo]);
  }

   selectRandomThingToDo() {
    const randomIndex = Math.floor(Math.random() * defaultThingsToDo.length);
    this.randomThingToDo.set(this.thingsToDo()[randomIndex]);
  }

  log(item: any) {
    console.log(item);
  }

  private saveOnlocalStorage() {
    localStorage.setItem('thingsToDo', JSON.stringify(this.thingsToDo()));
  }

   deleteThingToDo(thingToDo: ThingToDo) {
    this.thingsToDo.update((things) => things.filter(t => t !== thingToDo));
  }
}
