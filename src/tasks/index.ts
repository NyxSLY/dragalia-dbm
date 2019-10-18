import { HZhenFeng } from "@/tasks/HZhenFeng";

export const taskRegistry: Record<
  string,
  (() => void | Promise<void>) | undefined
> = {};

export function setupTaskRegistry(): void {
  taskRegistry.高级真风 = HZhenFeng;
}
