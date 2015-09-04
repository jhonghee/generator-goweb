package main

import (
  "fmt"
  "net/http"

  "<%= projectImport %>"
)

func main() {
	http.ListenAndServe(":8888", http.HandlerFunc(func (w http.ResponseWriter, r *http.Request) {
		fmt.Fprintln(w, <%= packageName %>.Greeting())
	}));
}
