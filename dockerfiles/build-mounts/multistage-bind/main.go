package main

import (
	"encoding/json"
	"log"
	"net/http"
	"time"
)

type response struct {
	Message   string `json:"message"`
	Timestamp string `json:"timestamp"`
}

func main() {
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(response{
			Message:   "Kurs Dockera - multistage z bind mountem!",
			Timestamp: time.Now().Format(time.RFC3339),
		})
	})

	log.Println("Running on http://0.0.0.0:3000")
	log.Fatal(http.ListenAndServe(":3000", nil))
}
