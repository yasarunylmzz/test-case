package cmd

import (
	"database/sql"
	"fmt"
	"log"
	"net/http"

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
		Handler: routers.Routes(),
	}

	fmt.Println("Listing on :3030")
	server.ListenAndServe()
}