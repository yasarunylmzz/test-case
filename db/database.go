package database

import (
	"database/sql"
	"log"

	_ "github.com/mattn/go-sqlite3"
)
var DB *sql.DB


func InitDB() (*sql.DB, error) {
    var err error
    DB, err = sql.Open("sqlite3", "./user.db")
	if err != nil {
		log.Fatal(err)
		return DB, err
	}

    err = DB.Ping()
	if err != nil {
		log.Fatal("Error connecting to the database: ", err)
		return DB, err
	}
	return nil, err
}


func AddItem(name, surname, email string) error {
	_, err := DB.Exec("INSERT INTO user (name, surname, email) VALUES (?,?,?)", name, surname ,email)
	return err
}

func DeleteItem(id int) error {
    _, err := DB.Exec("DELETE FROM user WHERE ID = ?", id)
    return err
}

func UpdateItem(id int, name, surname, email string) error {
    _, err := DB.Exec("UPDATE user SET name = ?, surname = ?, email = ? WHERE ID = ?", name, surname, email, id)
    return err
}