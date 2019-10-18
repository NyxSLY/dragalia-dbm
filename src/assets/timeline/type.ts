export interface ITimeline {
  name: string;
  time: number;
}

interface ITime {
  minute: number;
  second: number;
}

export interface ITimelineCastTime {
  name: string;
  time: ITime;
  castTime: number;
}

export interface ITimelineMore {
  name: string;
  time: ITime;
}
