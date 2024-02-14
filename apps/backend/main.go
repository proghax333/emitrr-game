package main

import (
	"context"
	"fmt"

	socketio "github.com/googollee/go-socket.io"
	"github.com/redis/go-redis/v9"
)

func main2() {
	session := map[string]map[string]string{"ok": {"thing": "bad"}}
	fmt.Printf("Session: %v\n\n", session)

	client := redis.NewClient(&redis.Options{
		Addr:     "127.0.0.1:6379",
		Username: "",
		Password: "",
		DB:       0,
	})

	k := socketio.NewServer(nil)
	fmt.Printf("%v\n", k)

	ctx := context.Background()

	err := client.Set(ctx, "foo", "bar", 0).Err()

	if err != nil {
		panic(err)
	}

	value, err := client.Get(ctx, "foo").Result()

	if err != nil {
		panic("Could not get `foo`")
	}

	fmt.Printf("foo = %v\n", value)
}
