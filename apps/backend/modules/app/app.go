package app

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"strconv"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/proghax333/emitrr-game/apps/backend/modules/appcontext"
	"github.com/proghax333/emitrr-game/apps/backend/modules/db"
	"github.com/proghax333/emitrr-game/apps/backend/modules/routers"
	"github.com/redis/go-redis/v9"

	"github.com/gin-contrib/sessions"
	"github.com/gin-contrib/sessions/cookie"
)

func CreateApp() *gin.Engine {
	appContext := &appcontext.AppContext{}

	// Initialize logger
	logger := log.Default()
	appContext.Logger = logger

	// Initialize DB
	db, err := db.InitializeDb()
	if err != nil {
		log.Panic("[DB] Could not connect to db. Reason: ", err.Error())
	}

	appContext.Db = db
	logger.Printf("[DB] Database connected.")

	// Initialize redis
	host := os.Getenv("REDIS_HOST")
	port := os.Getenv("REDIS_PORT")
	dbIndex := os.Getenv("REDIS_DB")

	if host == "" {
		host = "127.0.0.1"
	}

	var portNum uint = 6379
	if i, err := strconv.ParseUint(port, 10, 32); err == nil {
		portNum = uint(i)
	}

	REDIS_HOST := host
	REDIS_PORT := portNum

	var redisDb int = 0
	if i, err := strconv.ParseUint(dbIndex, 10, 32); err == nil {
		redisDb = int(i)
	}
	REDIS_DB := redisDb

	redisOptions := &redis.Options{
		Addr:     fmt.Sprintf("%v:%v", REDIS_HOST, REDIS_PORT),
		Username: os.Getenv("REDIS_USERNAME"),
		Password: os.Getenv("REDIS_PASSWORD"),
		DB:       REDIS_DB,
	}
	redis := redis.NewClient(redisOptions)
	appContext.Redis = redis

	// Initialize HTTP Server
	app := gin.Default()

	store := cookie.NewStore([]byte(os.Getenv("SESSION_SECRET")))
	store.Options(sessions.Options{
		Path:     "/",
		MaxAge:   60 * 60 * 24,
		HttpOnly: true,
		SameSite: http.SameSiteNoneMode,
		Secure:   true,
	})

	app.Use(sessions.Sessions("session", store))

	app.Use(gin.Logger())
	app.Use(gin.Recovery())

	app.Use(cors.New(cors.Config{
		AllowHeaders:     []string{"Content-Type"},
		AllowCredentials: true,
		AllowOriginFunc: func(origin string) bool {
			return true
		},
	}))

	app.GET("/healthz", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "ok",
		})
	})

	v1Router := app.Group("/api/v1")

	routers.CreateAuthRouter(v1Router, appContext)
	routers.CreateUserRouter(v1Router, appContext)
	routers.CreateLeaderboardRouter(v1Router, appContext)

	return app
}
