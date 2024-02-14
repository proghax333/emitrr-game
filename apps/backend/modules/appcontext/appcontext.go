package appcontext

import (
	"log"

	"github.com/redis/go-redis/v9"
	"gorm.io/gorm"
)

type AppContext struct {
	Db     *gorm.DB
	Logger *log.Logger
	Redis  *redis.Client
}
