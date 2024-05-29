# 12 21 13 31 14 41 15 51 16 61 17 71 18 81 19 91

a = 12
b = 21
lst = []

for _ in range(8):
    lst.append(a)
    lst.append(b)
    a = a + 1
    b = b + 10
for ele in lst:
    print(ele, end=' ')