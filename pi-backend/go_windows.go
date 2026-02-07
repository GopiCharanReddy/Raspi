//go:build windows

package main

import "fmt"

func initHardware() {
	fmt.Println("💻 Windows detected: Running in MOCK mode (No hardware)")
}

func setLight(state bool) {
	if state {
		fmt.Println(">>> [MOCK] LED ON (GPIO 18 HIGH)")
	} else {
		fmt.Println(">>> [MOCK] LED OFF (GPIO 18 LOW)")
	}
}
