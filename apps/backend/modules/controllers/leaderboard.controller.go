package controllers

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	appcontext "github.com/proghax333/emitrr-game/apps/backend/modules/appcontext"
	"github.com/proghax333/emitrr-game/apps/backend/modules/models"
	"github.com/proghax333/emitrr-game/apps/backend/modules/services"

	lo "github.com/samber/lo"
)

type LeaderboardController struct {
	ctx          *appcontext.AppContext
	scoreService *services.ScoreService
}

func (this *LeaderboardController) GetLeaderboardHandler(c *gin.Context) {
	// var user models.User

	// c.JSON(http.StatusAccepted, gin.H{"data": gin.H{
	// 	"id":       user.ID,
	// 	"name":     user.Name,
	// 	"username": user.Username,
	// }})

	scores, err := this.scoreService.GetScores()
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{
			"message": "Could not get scores.",
		})
	}

	userIDs := make([]string, 0, 10)
	scoresMap := make(map[string]uint)
	lo.ForEach(scores, func(x services.MemberScore, index int) {
		userIDs = append(userIDs, x.Member)
		scoresMap[x.Member] = uint(x.Score)
	})

	users := []models.User{}
	result := this.ctx.Db.Find(&users, "id IN ?", userIDs)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Could not retrieve scores."})
	}

	resultUsers := lo.Map(users, func(user models.User, index int) gin.H {
		return gin.H{
			"id":       user.ID,
			"name":     user.Name,
			"username": user.Username,
			"score":    scoresMap[fmt.Sprint(user.ID)],
		}
	})

	c.JSON(http.StatusAccepted, gin.H{"data": resultUsers})
}

// AuthController factory
func CreateLeaderboardController(appContext *appcontext.AppContext, scoreService *services.ScoreService) *LeaderboardController {
	return &LeaderboardController{
		ctx:          appContext,
		scoreService: scoreService,
	}
}
