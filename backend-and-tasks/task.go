package main

import (
	"fmt"
	"sort"
	"strings"
)

func task(){
	exampleA([]string{"aaaasd", "a", "aab", "aaabcd", "ef", "cssssssd", "fdz", "kf", "zc", "lklklklklklklklkl", "l"})
	exampleB(9)
}

func exampleA(input []string) map[int][]string {
	
	 m := make(map[int][]string)
	var result []string
	 number :=0;
	for i:= 0; i<len(input);i++{
		temp := strings.Split(input[i], "")
		for j :=0 ; j < len(temp);j++{
			// fmt.Println(temp[j])
			if temp[j] == "a"{
				number++;
			}
		}
		m[number] = append(m[number], input[i])
		number = 0;

	}
	if strings := m[0]; len(strings) > 0 {
		sort.Slice(strings, func(i, j int) bool {
			return len(strings[i]) > len(strings[j]) 
		})
		m[0] = strings  
	}
		fmt.Println(m)

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
// need to fix
func exampleB(a int) int{
	for i := 1; i <= a;i++{
		if i % 2 == 0{
			fmt.Println(i)
		}
		
	}
	fmt.Println(a)
	return 0
}