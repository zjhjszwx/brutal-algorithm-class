from heapq import heapify
from random import randint
from time import time

# 快排实现摘抄致 https://www.geeksforgeeks.org/python-program-for-quicksort/
def partition(arr,low,high): 
    i = ( low-1 )         # index of smaller element 
    pivot = arr[high]     # pivot 
  
    for j in range(low , high): 
        if   arr[j] <= pivot: 
            i = i+1 
            arr[i],arr[j] = arr[j],arr[i] 
  
    arr[i+1],arr[high] = arr[high],arr[i+1] 
    return ( i+1 ) 

# 你需要将递归改为循环，不然在几千个数的时候就会爆栈。
def quickSort(arr,low,high): 
    if low < high: 
        pi = partition(arr,low,high) 
        quickSort(arr, low, pi-1) 
        quickSort(arr, pi+1, high)

size = 100_0000
bound = 100_0000

a1 = [x for x in range(0, size)]                    # 正序
a2 = [x for x in range(size, 0, -1)]                # 倒序
a3 = [randint(0, bound) for _ in range(0, size)]    # 乱序

def timeit(f, *args):
    t = time()
    f(*args)
    print(time() - t)

for i in range(100, 1001, 100):
    a1 = [x for x in range(0, i)]
    print(i)
    timeit(quickSort, a1, 0, len(a1)-1)
