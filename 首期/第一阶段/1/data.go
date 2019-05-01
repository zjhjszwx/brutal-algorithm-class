package main

import "fmt"

func matrixMul(a, b [][]int) [][]int {
	mat := [][]int{}
	for i, row := range a { // i = 0, 1
		mat = append(mat, []int{})
		for j := range b[0] { // j = 0 1 2
			num := vectorDot(row, getCol(b, j))
			mat[i] = append(mat[i], num)
		}
	}
	return mat
}

func getCol(m [][]int, j int) []int {
	c := make([]int, len(m))
	for i, row := range m {
		c[i] = row[j]
	}
	return c
}

func vectorDot(a, b []int) int {
	sum := 0
	for i := range a {
		sum += a[i] * b[i]
	}
	return sum
}

func main() {
	fmt.Println(
		matrixMul(
			[][]int{
				{1, 2, 3},
				{2, 3, 4},
			},
			[][]int{
				{1, 2, 3},
				{2, 3, 4},
				{2, 3, 4},
			},
		),
	)
}
