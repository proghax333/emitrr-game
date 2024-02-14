package controllers

import (
	"fmt"
	"net/http"
	"strconv"

	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
	appcontext "github.com/proghax333/emitrr-game/apps/backend/modules/appcontext"
	"github.com/proghax333/emitrr-game/apps/backend/modules/models"
	"github.com/proghax333/emitrr-game/apps/backend/modules/services"
)

type UserController struct {
	ctx          *appcontext.AppContext
	scoreService *services.ScoreService
}

func (this *UserController) GetUserHandler(c *gin.Context) {
	id, ok := c.Params.Get("id")

	if !ok {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Invalid ID."})
		return
	}

	var userId uint

	if id == "me" {
		// Retrieve session
		session := sessions.Default(c)

		// Check if userID exists in session
		userID := session.Get("userID")
		if userID == nil {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
			return
		}

		i, ok := userID.(uint)
		if !ok {
			c.JSON(http.StatusBadRequest, gin.H{"message": "Invalid session's user ID."})
			return
		}

		userId = i
	} else {
		i, err := strconv.ParseUint(id, 10, 32)

		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"message": "Invalid ID."})
			return
		}

		userId = uint(i)
	}

	var user models.User
	result := this.ctx.Db.Select("id", "name", "username").First(&user, "id = ?", userId)

	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Could not get the user."})
		return
	}

	c.JSON(http.StatusAccepted, gin.H{"data": map[string]interface{}{
		"id":       user.ID,
		"name":     user.Name,
		"username": user.Username,
	}})
}

func (this *UserController) UpdateScoreHandler(c *gin.Context) {
	id, ok := c.Params.Get("id")

	if !ok {
		c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"message": "Invalid ID"})
		return
	}

	i, error := strconv.ParseUint(id, 10, 32)
	if error != nil {
		c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"message": "Invalid ID"})
		return
	}

	type UpdateScoreDTO struct {
		Result string `json:"result"`
	}

	userId := uint(i)
	var body UpdateScoreDTO

	if err := c.BindJSON(&body); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": "Invalid result value."})
		return
	}
	this.ctx.Logger.Println("Body: ", body)

	if err := this.scoreService.UpdateScore(fmt.Sprint(userId), body.Result); err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"message": "Could not update the score."})
		return
	}

	c.JSON(http.StatusAccepted, gin.H{"message": "Updated the score."})

	// // Retrieve session
	// session := sessions.Default(c)

	// // Check if userID exists in session
	// userID := session.Get("userID")
	// if userID == nil {
	// 	c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
	// 	return
	// }

	// i, ok := userID.(uint)
	// if !ok {
	// 	c.JSON(http.StatusBadRequest, gin.H{"message": "Invalid session's user ID."})
	// 	return
	// }
}

// AuthController factory
func CreateUserController(appContext *appcontext.AppContext, scoreService *services.ScoreService) *UserController {
	return &UserController{
		ctx:          appContext,
		scoreService: scoreService,
	}
}
