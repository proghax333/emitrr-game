package main

import "fmt"

func main() {
	x := 0

	defer (func() {
		fmt.Println("x =", x)
	})()

	x = 10
	x = 20
	x = 30
}
