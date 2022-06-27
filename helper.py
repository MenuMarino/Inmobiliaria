with open('info.txt') as f:
    lines = f.readlines()

final = []
for line in lines:
    final.append(line.replace('\n', ''))

print(final)