import csv

def camel_to_snake(s):
    s = s.lower()
    return s.replace(' ', '_')

file = open('DISTRITOS.csv')
csvreader = csv.reader(file)
info = {}

for row in csvreader:
    distrito = True
    distrito_nombre = ''
    for value in row:
        if distrito:
            distrito_nombre = camel_to_snake(value)
            info[distrito_nombre] = []
            distrito = False
        else:
            if value == '':
                break
            info[distrito_nombre].append(value)

print(info)