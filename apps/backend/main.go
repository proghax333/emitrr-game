package main

import (
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"
	app "github.com/proghax333/emitrr-game/apps/backend/modules/app"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Println("Error loading .env file")
	}

	PORT := os.Getenv("PORT")
	if PORT == "" {
		PORT = "3000"
	}

	router := app.CreateApp()
	err = router.Run(fmt.Sprintf(":%v", PORT))

	if err != nil {
		panic("[Error] failed to start gin server due to: " + err.Error())
	}

	// session := map[string]map[string]string{"ok": {"thing": "bad"}}
	// fmt.Printf("Session: %v\n\n", session)

	// client := redis.NewClient(&redis.Options{
	// 	Addr:     "127.0.0.1:6379",
	// 	Username: "",
	// 	Password: "",
	// 	DB:       0,
	// })

	// k := socketio.NewServer(nil)
	// fmt.Printf("%v\n", k)

	// ctx := context.Background()

	// err := client.Set(ctx, "foo", "bar", 0).Err()

	// if err != nil {
	// 	panic(err)
	// }

	// value, err := client.Get(ctx, "foo").Result()

	// if err != nil {
	// 	panic("Could not get `foo`")
	// }

	// fmt.Printf("foo = %v\n", value)
}
