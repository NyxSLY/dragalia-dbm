# encoding: utf-8

import os
import pandas as pd
import codecs
import re


dirname = os.path.dirname(__file__)
filepath = os.path.join(dirname, '..', 'src', 'assets', 'timeline')
print(filepath)


def write_timeline(input_file):
    name = os.path.basename(input_file).split('.csv')[0]
    out = codecs.open(os.path.join(
        filepath, '{}.ts'.format(name)), 'wb', encoding='utf-8')
    print(os.path.join(filepath, '{}.ts'.format(name)))
    # start_time = '4:59'
    input_file = os.path.join(filepath, input_file)

    # file head
    out.write(
        r'import { ITimelineCastTime } from "@/assets/timeline/type";'+'\n')

    out.write(
        f'export const {name}: Record<string, ITimelineCastTime> = {{}};\n\n\n')
    x = pd.read_csv(input_file, header=None).values.tolist()

    i = 'a'

    for line in x:
        skill_name = line[0]
        time = line[1]
        minute, second = translate1_time(time)
        outline = f'{name}.{i} = {{ name: \"{skill_name}\", time: {{minute: {str(minute)}, second: {str(second)}}}, castTime: 3 }};\n'
        out.write(outline)
        if i[-1] == 'z':
            i = len(i)*'a' + 'a'
        else:
            i = (len(i)-1)*'a'+chr(ord(i[-1])+1)
    outline = f'{name}.break = {{ name: \"BREAK\", time: {{minute: {str(0)}, second: {str(0)}}}, castTime: 8 }};\n'
    out.write(f'\nObject.freeze({name});\n')


def translate_time(start_time, end_time):
    start_min, start_sec = [int(x) for x in start_time.split(':')[:2]]
    end_min, end_sec = [int(x) for x in end_time.split(':')[:2]]
    if start_sec >= end_sec:
        sec_dif = start_sec - end_sec
        min_dif = start_min - end_min
    else:
        sec_dif = start_sec+60 - end_sec
        min_dif = start_min - end_min - 1
    return min_dif*60 + sec_dif


def translate1_time(time):
    end_min, end_sec = [int(x) for x in time.split(':')[:2]]
    return end_min, end_sec


def main():
    for file in os.listdir(filepath):
        if file.split('.')[-1] == 'csv':
            write_timeline(file)


if __name__ == "__main__":
    main()
