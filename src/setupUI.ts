import layoutTemplateXml from '@/layoutTemplate.xml';
import { store } from '@/store';
import { taskRegistry } from '@/tasks';

interface IButton {
  click(callback: () => void): void;
  setText(text: string): void;
  setOnTouchListener(
    listener: (view: object, event: ITouchEvent) => boolean
  ): void;
}
interface ISpinner {
  setOnTouchListener(
    listener: (view: object, event: ITouchEvent) => boolean
  ): void;
  setOnItemSelectedListener(listener: {
    onItemSelected(
      parent: object,
      view: object,
      position: number,
      id: number
    ): void;
    onNothingSelected(parent: object): void;
  }): void;
  getSelectedItem(): string;
  setSelection(pos: number): void;
}
interface ITouchEvent {
  ACTION_UP: object;
  ACTION_DOWN: object;
  ACTION_MOVE: object;
  getAction(): object;
  getRawX(): number;
  getRawY(): number;
}
type IWindow = floaty.FloatyWindow & {
  taskSpinner: ISpinner;
};

const idleText: string = '停止';

export function setupUI(): {
  window: IWindow;
  spinnerItems: string[];
} {
  const spinnerItems: string[] = [idleText, ...Object.keys(taskRegistry)];
  const layout: string = layoutTemplateXml.replace(
    /\${entries}/g,
    spinnerItems.join('|')
  );
  const window: IWindow = <IWindow>floaty.window(layout);
  window.setAdjustEnabled(true);
  window.exitOnClose();

  setupSpinner(window, spinnerItems);

  // Empty timer for async syntax
  // https://hyb1996.github.io/AutoJs-Docs/#/floaty?id=floaty
  // tslint:disable-next-line:no-empty
  setInterval(() => {}, 1e3);

  return { window, spinnerItems };
}

function setupSpinner(window: IWindow, spinnerItems: string[]): void {
  window.taskSpinner.setOnItemSelectedListener({
    onItemSelected(): void {
      const taskName: string = window.taskSpinner.getSelectedItem();
      if (taskName === idleText) {
        store.currentTask = undefined;
      } else {
        store.currentTask = taskName;
      }
    },
    onNothingSelected(): void {
      throw new Error('This should never happen');
    }
  });
  store.taskChangeListeners.push((newValue?: string) => {
    ui.run(() => {
      window.taskSpinner.setSelection(
        spinnerItems.indexOf(newValue || idleText)
      );
    });
  });
}
