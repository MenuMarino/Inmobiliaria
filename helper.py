import csv
file = open('dab.csv')
csvreader = csv.reader(file)
rows = []
info = {}

for row in csvreader:
    key = row[1].lower().replace(' ', '_')
    if key in info:
        info[key].append(row[0])
    else:
        info[key] = [row[0]]

with open('readme.txt', 'w') as f:
    f.write(f"distritos: {info},")
