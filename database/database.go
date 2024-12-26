package database

import (
	"database/sql"
	"log"

	_ "github.com/mattn/go-sqlite3"
)

func InitDB() (*sql.DB, error) {
    db, err := sql.Open("sqlite3", "./users.db")
    if err != nil {
        log.Fatal(err)
        return nil, err
    }

    createTableSQL := `
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        email TEXT
    );
    `
    _, err = db.Exec(createTableSQL)
    if err != nil {
        log.Fatal(err)
        return nil, err
    }
    return db, nil
}
