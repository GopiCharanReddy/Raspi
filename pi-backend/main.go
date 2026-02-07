package main

import (
	"fmt"
	"net/http"
)

func main() {
	initHardware()

	http.HandleFunc("/toggle", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		state := r.URL.Query().Get("state")

		if state == "on" {
			setLight(true)
		} else {
			setLight(false)
		}
		w.WriteHeader(http.StatusOK)
	})

	fmt.Println("📡 Server running on http://localhost:8080")
	http.ListenAndServe(":8080", nil)
}
