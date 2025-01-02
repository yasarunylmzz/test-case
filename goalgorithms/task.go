package main

import (
	"fmt"
	"sort"
	"strings"
)

func main() {
	task()
}

func task() {
	exampleA([]string{"aaaasd", "a", "aab", "aaabcd", "ef", "cssssssd", "fdz", "kf", "zc", "lklklklklklklklkl", "l"})
	exampleB(9)
	exampleC([]string{"apple", "pie", "apple", "red", "red", "red"})
}

func exampleA(input []string) map[int][]string {
	m := make(map[int][]string)
	var result []string
	number := 0
	for i := 0; i < len(input); i++ {
		temp := strings.Split(input[i], "")
		for j := 0; j < len(temp); j++ {
			if temp[j] == "a" {
				number++
			}
		}
		m[number] = append(m[number], input[i])
		number = 0
	}

	if strings := m[0]; len(strings) > 0 {
		sort.Slice(strings, func(i, j int) bool {
			return len(strings[i]) > len(strings[j])
		})
		m[0] = strings
	}
	//fmt.Println(m)

	keys := make([]int, 0, len(m))
	for k := range m {
		keys = append(keys, k)
	}
	sort.Sort(sort.Reverse(sort.IntSlice(keys)))

	for _, k := range keys {
		result = append(result, m[k]...)
	}
	fmt.Println(result)
	return m
}

func exampleB(a int) int {
	var result []int
	for i := 1; i < a; i++ {
		if a%i == 0 {
			result = append(result, i+1) 
		}
	}
	result = append(result, a)
	fmt.Println(result)
	return len(result)
}


func exampleC(a []string) string {
	m := make(map[int]string)

	counts := make(map[string]int)
	for _, v := range a {
		counts[v]++
	}

	for str, count := range counts {
		m[count] = str
	}

	maxIndex := -1
	for index := range m {
		if index > maxIndex {
			maxIndex = index
		}
	}
	fmt.Println(m[maxIndex])
	return m[maxIndex]
}

