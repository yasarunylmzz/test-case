package cmd

import (
	"database/sql"
	"log"
)

func migrate(db *sql.DB){

	createTableSQL := 
	`
	CREATE TABLE IF NOT EXISTS user {
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		EMAIL TEXT,
		name TEXT,
		surname TEXT,
		created_at DATETIME DEFAULT CURRENT_TIMESTAMP
	}
	`
	_, err := db.Exec(createTableSQL)
	if err != nil {
		log.Fatal(err)
	}
}