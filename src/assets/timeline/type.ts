export interface ITimeline {
    name: string;
    time: number;
}

interface ITime {
    minute: number;
    second: number;
}


export interface ITimelineMore {
    name: string;
    time: ITime
}

export type TimelineAssets = Readonly<
  Record<
    | 'a'
    | 'b'
    | 'c'
    | 'd'
    | 'e'
    | 'f'
    | 'g'
    | 'h'
    | 'i'
    | 'g'
    | 'k'
    | 'l'
    | 'm'
    | 'n'
    | 'o'
    | 'p'
    | 'q'
    | 'r'
    | 's'
    | 't'
    | 'u'
    | 'v'
    | 'w'
    | 'x'
    | 'z'
    | 'y'
    | 'aa'
    | 'ab'
    | 'ac'
    | 'ad'
    | 'ae'
    | 'af'
    | 'ag'
    | 'ah'
    | 'ai'
    | 'aj'
    | 'ak'
    | 'al'
    | 'am'
    | 'an'
    | 'ao'
    | 'ap'
    | 'aq'
    | 'ar'
    | 'as'
    | 'at'
    | 'au'
    | 'av'
    | 'aw'
    | 'ax'
    | 'ay'
    | 'az',
    ITimelineMore
  >
>;
