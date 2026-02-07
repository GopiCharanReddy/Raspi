# 🛸 Raspi-Led

A high-performance hardware bridge connecting a **Next.js Ground Control Station (GCS)** to **Raspberry Pi GPIO pins** via a **Go backend**. This architecture is designed for low-latency hardware triggers, serving as the foundation for a future drone flight controller.

## 🛠 Hardware Configuration (Direct Connection)

Since no breadboard is used, ensure all "Twist-and-Tape" connections are insulated to prevent shorts.

| Component | LED Pin | Raspberry Pi Pin | Role |
| --- | --- | --- | --- |
| **Jumper Wire 1** | Longest Pin | **Physical Pin 6** | Ground (GND) |
| **Resistor + Wire 2** | Red Pin | **Physical Pin 12** | Signal (GPIO 18) |

> **Note:** The resistor must be placed in series between Pin 12 and the LED to protect the Pi's GPIO circuitry.

---

## 📁 Project Setup

### 1. Backend (Go)

The Go service handles direct memory mapping to the Broadcom chip for near-instantaneous pin toggling.

```bash
# SSH into your Pi
ssh -i your_private_key pi@raspberrypi.local

# Navigate to backend
cd ~/pi-backend
go mod tidy

# Run with sudo (required for hardware memory access)
sudo go run .

```

### 2. Frontend (Next.js)

The GCS provides the user interface. It communicates with the Go service over the local network.

```bash
cd ~/pi-frontend
npm install
npm run build
npm start

```

---

## 🚀 Deployment Workflow

### Transferring Files from Laptop

If you make changes on your laptop, sync them to the Pi using `scp`:

```powershell
# Run from Windows PowerShell
scp -i ./id_rsa -r ./pi-backend pi@raspberrypi.local:~/

```

### Accessing the UI

Once the Next.js server is running on the Pi, you can access the toggle button from **any device** on your Wi-Fi:

* **URL:** `http://<your-pi-ip>:3000`

---

## 💻 Code Architecture

* **Cross-Platform:** The backend uses **Go Build Tags** (`//go:build linux`) to automatically switch between the real `go-rpio` hardware driver on the Pi and a terminal-based mock on Windows.
* **Concurrency:** The Go backend is structured to eventually handle high-frequency sensor polling (Gyro/Accel) alongside the HTTP server.

---

## 📡 Troubleshooting

* **Error: "invalid argument":** Ensure you are running the backend on the Pi, not WSL/Windows.
* **LED not glowing:** Swap the orientation of the LED (it is a diode and only works in one direction).
* **Connection Refused:** Ensure the Go server is running on port `8080` and that the Pi's firewall allows incoming traffic.

---

**Everything is ready to go! Would you like me to provide the final Go "Pulse" function so the LED fades in and out like a "breathing" status light?**
