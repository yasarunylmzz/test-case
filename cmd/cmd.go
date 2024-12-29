package cmd

import (
	"database/sql"
	"fmt"
	"log"
	"net/http"

	_ "github.com/mattn/go-sqlite3"

	"github.com/yasarunylmzz/test-case/routers"
)

func CmdServer(){
	db, err := sql.Open("sqlite3","../user.db")
	if err != nil{
		log.Fatal(err)
	}
	log.Println(db)

	server := http.Server{
		Addr: ":3030",
		Handler: routers.SetupRoutes(), // SetupRoutes() returns http.Handler
	}

	fmt.Println("Listening on :3030") // Fixed typo in "Listening"
	if err := server.ListenAndServe(); err != nil {
		log.Fatal(err) // Handle potential server errors
	}
}