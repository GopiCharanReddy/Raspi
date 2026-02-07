package main

import (
    "fmt"
    "net/http"
    "github.com/stianeikeland/go-rpio/v4"
)

func main() {
    // Initialize GPIO
    if err := rpio.Open(); err != nil {
        fmt.Println("Error opening GPIO:", err)
        return
    }
    defer rpio.Close()

    // We'll use Pin 18 (Physical Pin 12)
    pin := rpio.Pin(18)
    pin.Output()

    // API Endpoint to handle the toggle
    http.HandleFunc("/toggle", func(w http.ResponseWriter, r *http.Request) {
        // Enable CORS so Next.js can talk to Go
        w.Header().Set("Access-Control-Allow-Origin", "*")

        state := r.URL.Query().Get("state")
        if state == "on" {
            pin.High()
            fmt.Println(">>> LED ON")
        } else {
            pin.Low()
            fmt.Println(">>> LED OFF")
        }
        w.WriteHeader(http.StatusOK)
    })

    fmt.Println("Go Backend listening on :8080...")
    http.ListenAndServe(":8080", nil)
}
