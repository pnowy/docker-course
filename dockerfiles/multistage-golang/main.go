package main

import (
	"fmt"
	"net/http"
)

func index(w http.ResponseWriter, req *http.Request) {
	fmt.Fprintf(w, "Hello Docker Course!")
}

func main()  {
	http.HandleFunc("/", index)
	http.ListenAndServe(":8080", nil)
}