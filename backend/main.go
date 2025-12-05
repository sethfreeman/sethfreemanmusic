package main

import (
	"log"
	"net/http"
	"os"
	"path/filepath"

	"github.com/gorilla/mux"
)

func main() {
	r := mux.NewRouter()

	// Serve static files from the React build
	buildPath := "../frontend/build"
	r.PathPrefix("/").Handler(http.FileServer(http.Dir(buildPath)))

	// Fallback to index.html for client-side routing
	r.PathPrefix("/").HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, filepath.Join(buildPath, "index.html"))
	})

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	log.Printf("Server starting on port %s", port)
	log.Printf("Serving React app from %s", buildPath)
	log.Fatal(http.ListenAndServe(":"+port, r))
}
