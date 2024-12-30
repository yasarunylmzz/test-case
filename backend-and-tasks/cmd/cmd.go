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
	db, err := sql.Open("sqlite3","./user.db")
	if err != nil{
		log.Fatal(err)
	}
	log.Println(db)
	if err := db.Ping(); err != nil {
		log.Fatal("Not connected Database:", err)
	}
	
	server := http.Server{
		Addr: ":3030",
		Handler: routers.SetupRoutes(), 
	}

	fmt.Println("Listening on :3030") 
	if err := server.ListenAndServe(); err != nil {
		log.Fatal(err) 
	}
}