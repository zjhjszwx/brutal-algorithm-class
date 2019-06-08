from time import time  # O(n)
t1 = time()
string = []
for i in range(1000000):
    string.append(str(i))
string = ''.join(string)
print(time() - t1, len(string))

from time import time  # O(n^2)
t1 = time()
string = ""
for i in range(1000000):
    string += str(i)
print(time() - t1, len(string))