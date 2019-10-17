# encoding: utf-8

import os
import pandas as pd
import codecs
import ntpath
import re


dirname = ntpath.dirname(__file__)
filepath = ntpath.join(dirname, '..\\src\\assets\\timeline')

def write_timeline(input_file):
    name = ntpath.basename(input_file).split('.csv')[0]
    out = codecs.open(ntpath.join(filepath, '{}.ts'.format(name)), 'wb', encoding='utf-8')
    print(ntpath.join(filepath, '{}.ts'.format(name)))
    start_time = '4:59'
    input_file = ntpath.join(filepath, input_file)

    # file head
    out.write(r'import {ITimeline} from "@/assets/timeline/type";'+'\n')

    out.write(f'export const {name}: Record<string, ITimeline> = {{}};\n\n\n')
    x = pd.read_csv(input_file, header=None).values.tolist()

    i = 'a'

    for line in x:
        skill_name = line[0]
        time = line[1]
        trans_time = translate_time(start_time, time)
        outline = f'{name}.{i} = {{ name: \"{skill_name}\", time: {str(trans_time)} }};\n'
        out.write(outline)
        if i[-1] == 'z':
            i = len(i)*'a' + 'a'
        else:
            i = (len(i)-1)*'a'+chr(ord(i[-1])+1)

    out.write(f'\nObject.freeze({name});\n')
    

def translate_time(start_time, end_time):
    start_min, start_sec = [int(x) for x in start_time.split(':')[:2]]
    end_min, end_sec = [int(x) for x in end_time.split(':')[:2]]
    if start_sec >= end_sec:
        sec_dif = start_sec - end_sec
        min_dif = start_min - end_min
    else:
        sec_dif = start_sec+60 - end_sec
        min_dif = start_min - end_min -1 
    return min_dif*60 + sec_dif


def main():
    for file in os.listdir(filepath):
        if file.split('.')[-1] == 'csv':
            write_timeline(file)

if __name__ == "__main__":
    main()



    
