package db

import (
	"os"

	"github.com/jmoiron/sqlx"

	"github.com/proghax333/emitrr-game/apps/backend/modules/models"
	mysqlDriver "gorm.io/driver/mysql"
	"gorm.io/gorm"
)

func InitializeDb() (*gorm.DB, error) {
	dsn := os.Getenv("DB_URL")

	dbConn, err := sqlx.Open("mysql", dsn)

	if err != nil {
		panic(err)
	}

	db, err := gorm.Open(mysqlDriver.New(mysqlDriver.Config{
		Conn: dbConn,
	}), &gorm.Config{})
	if err != nil {
		return db, err
	}

	db.AutoMigrate(&models.User{})

	return db, nil
}
