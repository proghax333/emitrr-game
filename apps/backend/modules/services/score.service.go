package services

import (
	"context"
	"fmt"

	"github.com/proghax333/emitrr-game/apps/backend/modules/appcontext"
)

var ctx = context.Background()

type ScoreService struct {
	ctx appcontext.AppContext
}

// MemberScore represents a member and its score
type MemberScore struct {
	Member string
	Score  float64
}

// UpdateScore updates the score of a particular user ID in Redis
func (this *ScoreService) UpdateScore(userID string, result string) error {
	this.ctx.Logger.Println("Test: ", result)

	// Update user score
	if result == "win" {
		err := this.ctx.Redis.ZIncrBy(ctx, "scores", 1, userID).Err()
		if err != nil {
			this.ctx.Logger.Println("ERROR: ", err)
			return err
		}

		return nil
	} else if result == "lose" {
		return nil
	}

	return fmt.Errorf("invalid result")
}

// GetScores returns scores of all users in sorted order
func (this *ScoreService) GetScores() ([]MemberScore, error) {
	// Retrieve scores
	scores, err := this.ctx.Redis.ZRevRangeWithScores(ctx, "scores", 0, 9).Result()

	if err != nil {
		this.ctx.Logger.Println("[Error] GetScores(): ", err)
		return nil, fmt.Errorf("could not get scores")
	}

	// Convert Redis result to list of MemberScore objects
	memberScores := make([]MemberScore, len(scores))
	for i, z := range scores {
		memberScores[i] = MemberScore{
			Member: z.Member.(string),
			Score:  z.Score,
		}
	}

	return memberScores, nil
}

func CreateScoreService(appContext *appcontext.AppContext) *ScoreService {
	return &ScoreService{ctx: *appContext}
}
