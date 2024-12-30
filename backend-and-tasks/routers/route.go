package routers

import (
	"net/http"

	"github.com/rs/cors"
	"github.com/yasarunylmzz/test-case/handlers"
)

func SetupRoutes() http.Handler {
	mux := http.NewServeMux()

	c := cors.New(cors.Options{
		AllowedOrigins: []string{"http://localhost:3000"}, 
		AllowedMethods: []string{"GET", "POST", "PUT", "DELETE"},
		AllowedHeaders: []string{"Content-Type"},
	})


	mux.HandleFunc("/api/users", handlers.UserPost)
	mux.HandleFunc("/api/users/update", handlers.UserUpdate)
	mux.HandleFunc("/api/users/delete", handlers.UserDelete)
	mux.HandleFunc("/api/users/get", handlers.UserGet)
	return c.Handler(mux)
}