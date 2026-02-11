import { DatePipe, SlicePipe } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { defaultThingsToDo, ThingToDo } from './defaultThingsToDo';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  standalone: true,
  imports: [DatePipe, SlicePipe],
})
export class App implements OnInit {
  thingsToDo = signal<ThingToDo[]>([]);
  randomThingToDo = signal<ThingToDo | null>(null);
  historyOfRandomThingsToDo = signal<{ name: string; date: Date }[]>([]);

  ngOnInit(): void {
    const thingsToDoFromStorage: ThingToDo[] = JSON.parse(
      localStorage.getItem('thingsToDo') || '[]',
    );
    this.thingsToDo.set(thingsToDoFromStorage || defaultThingsToDo);
    const historyOfRandomThingsToDoFromStorage: { name: string; date: Date }[] =
      JSON.parse(localStorage.getItem('historyOfRandomThingsToDo') || '[]');
    this.historyOfRandomThingsToDo.set(
      historyOfRandomThingsToDoFromStorage || [],
    );
  }

  createThingToDo(text: string) {
    const [name, duration] = text.split(',').map((part) => part.trim());
    const newThingToDo: ThingToDo = { name, duration };
    this.thingsToDo.update((things) => [...things, newThingToDo]);
    this.savethingsToDoOnlocalStorage();
  }

  selectRandomThingToDo() {
    const randomIndex = Math.floor(Math.random() * defaultThingsToDo.length);
    this.randomThingToDo.set(this.thingsToDo()[randomIndex]);
    this.historyOfRandomThingsToDo.update((history) => [
      { name: this.randomThingToDo()?.name || '', date: new Date() },
      ...history,
    ]);
    this.saveHistoryOfRandomThingsToDoOnlocalStorage();
  }

  deleteThingToDo(thingToDo: ThingToDo) {
    this.thingsToDo.update((things) => things.filter((t) => t !== thingToDo));
    this.savethingsToDoOnlocalStorage();
  }

  private savethingsToDoOnlocalStorage() {
    localStorage.setItem('thingsToDo', JSON.stringify(this.thingsToDo()));
  }

  private saveHistoryOfRandomThingsToDoOnlocalStorage() {
    localStorage.setItem(
      'historyOfRandomThingsToDo',
      JSON.stringify(this.historyOfRandomThingsToDo()),
    );
  }
}
