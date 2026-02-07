//go:build linux

package main

import (
	"fmt"
	"github.com/stianeikeland/go-rpio/v4"
)

var pin rpio.Pin

func initHardware() {
	if err := rpio.Open(); err != nil {
		fmt.Println("Error opening GPIO:", err)
		return
	}
	pin = rpio.Pin(18) // Physical Pin 12
	pin.Output()
	fmt.Println("✅ Real Hardware Initialized")
}

func setLight(state bool) {
	if state {
		pin.High()
	} else {
		pin.Low()
	}
}
