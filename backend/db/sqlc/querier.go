// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.28.0

package sqlc

import (
	"context"

	"github.com/google/uuid"
)

type Querier interface {
	CheckUserExistsByEmail(ctx context.Context, email string) (bool, error)
	CreateComment(ctx context.Context, arg CreateCommentParams) (*Comment, error)
	CreateCommentLike(ctx context.Context, arg CreateCommentLikeParams) (*CommentLike, error)
	CreateFollower(ctx context.Context, arg CreateFollowerParams) (*Follower, error)
	CreateImages(ctx context.Context, arg []CreateImagesParams) (int64, error)
	CreatePost(ctx context.Context, arg CreatePostParams) (*Post, error)
	CreatePostLike(ctx context.Context, arg CreatePostLikeParams) (*PostLike, error)
	CreateProfile(ctx context.Context, arg CreateProfileParams) (*Profile, error)
	CreateUser(ctx context.Context, arg CreateUserParams) (*User, error)
	DeleteComment(ctx context.Context, commentUid uuid.UUID) error
	DeletePostByPostUid(ctx context.Context, postUid uuid.UUID) error
	DeleteUser(ctx context.Context, id int32) error
	DropCommentLike(ctx context.Context, arg DropCommentLikeParams) error
	DropFollow(ctx context.Context, arg DropFollowParams) error
	DropPostLike(ctx context.Context, arg DropPostLikeParams) error
	GetAuthProfile(ctx context.Context, myUserID int32) (*GetAuthProfileRow, error)
	GetImagesByPostIds(ctx context.Context, postIds []int32) ([]*GetImagesByPostIdsRow, error)
	GetPaginatedCommentsByPostUID(ctx context.Context, arg GetPaginatedCommentsByPostUIDParams) ([]*GetPaginatedCommentsByPostUIDRow, error)
	GetPaginatedFolloweesByUserUID(ctx context.Context, arg GetPaginatedFolloweesByUserUIDParams) ([]int32, error)
	GetPaginatedFollowersByUserUID(ctx context.Context, arg GetPaginatedFollowersByUserUIDParams) ([]int32, error)
	GetPaginatedPostsByUserUid(ctx context.Context, arg GetPaginatedPostsByUserUidParams) ([]*GetPaginatedPostsByUserUidRow, error)
	GetPaginatedPostsByUsername(ctx context.Context, arg GetPaginatedPostsByUsernameParams) ([]*GetPaginatedPostsByUsernameRow, error)
	GetPostByPostUID(ctx context.Context, arg GetPostByPostUIDParams) (*GetPostByPostUIDRow, error)
	GetProfileByUsernameOrID(ctx context.Context, arg GetProfileByUsernameOrIDParams) (*GetProfileByUsernameOrIDRow, error)
	GetUserByEmail(ctx context.Context, email string) (*GetUserByEmailRow, error)
	SearchPaginatedFollowees(ctx context.Context, arg SearchPaginatedFolloweesParams) ([]*SearchPaginatedFolloweesRow, error)
	SearchPaginatedFollowers(ctx context.Context, arg SearchPaginatedFollowersParams) ([]*SearchPaginatedFollowersRow, error)
	SearchPaginatedUsers(ctx context.Context, arg SearchPaginatedUsersParams) ([]*SearchPaginatedUsersRow, error)
	UploadProfileImage(ctx context.Context, arg UploadProfileImageParams) (uuid.UUID, error)
}

var _ Querier = (*Queries)(nil)
