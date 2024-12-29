package routers

import (
	"net/http"

	"github.com/yasarunylmzz/test-case/handlers"
)

func SetupRoutes() http.Handler {
	mux := http.NewServeMux()
	mux.HandleFunc("/api/users", handlers.UserPost)
	mux.HandleFunc("/api/users/update", handlers.UserUpdate)
	mux.HandleFunc("/api/users/delete", handlers.UserDelete)
	return mux
}