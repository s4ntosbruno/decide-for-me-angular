import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  protected readonly title = signal('decide-for-me');

  private defaultThingsToDo = [
    {
      name: 'tft',
      duration: 'md3, se ganhar continua',
    },
    {
      name: 'dos2',
      duration: 'ate parar',
    },
    {
      name: 'tabuleiro',
      duration: 'uma rodada',
    },
    {
      name: 'lego',
      duration: 'ate acabar',
    },
    {
      name: 'alone',
      duration: 'ate parar',
    },
    {
      name: 'filme',
      duration: 'ate acabar',
    },
    {
      name: 'serie',
      duration: 'um ep',
    },
    {
      name: 'caminhada',
      duration: 'volta no parque/visitar sogra',
    },
    {
      name: 'leitura',
      duration: '10m',
    },
    {
      name: 'exercicio',
      duration: '10m',
    },
    {
      name: 'estudo/todolist',
      duration: '10m',
    },
    {
      name: 'quebra cabeça',
      duration: '10m',
    },
    {
      name: 'brincar com as gatas',
      duration: '5m',
    },
    {
      name: 'arrumar a casa',
      duration: '5m',
    },
  ];

  ngOnInit(): void {
    this.showDefaultThigsToDo();
  }

  private showDefaultThigsToDo() {
    const list = document.getElementById('things-to-do');
    this.defaultThingsToDo.forEach((thing) => {
      this.createThingToDo(thing.name);
    });
  }

  public createThingToDo(text: string) {
    const list = document.getElementById('things-to-do');
    const para = document.createElement('li');
    const node = document.createTextNode(text);
    para.appendChild(node);
    list?.appendChild(para);
  }

  public selectRandomThingToDo() {
    const randomIndex = Math.floor(Math.random() * this.defaultThingsToDo.length);
    // const randomThingToDo = this.defaultThingsToDo[randomIndex];

    const list = document
      ?.getElementById('things-to-do')
      ?.getElementsByTagName('li');

    if (!list) return;

    const randomThingToDo = list[randomIndex].textContent;

    const p = document.getElementById('random-thing-to-do');
    if (p) p.textContent = `${randomThingToDo}`;
  }
}
