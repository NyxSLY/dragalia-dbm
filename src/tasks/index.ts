import { HZhenFeng } from "@/tasks/HZhenFeng";
import { HZhenShui } from "@/tasks/HZhenShui";
import { HZhenShuiAuto } from "@/tasks/HZhenShuiAuto";

export const taskRegistry: Record<
  string,
  (() => void | Promise<void>) | undefined
  > = {};

export function setupTaskRegistry(): void {
  taskRegistry.高级真风 = HZhenFeng;
  taskRegistry.高级真水 = HZhenShui;
  taskRegistry.自动真水 = HZhenShuiAuto;
}
