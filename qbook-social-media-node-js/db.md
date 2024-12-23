# Database Design

## Users

### fields

-   `_id`: ObjectId (required)
-   `username`: String (required, unique)
-   `password`: String (required)
-   `email`: String (required, unique)
-   `avatar`: String (default: '')
-   `handle`: String (unique, require)
-   `professional`: String
-   `friendCount`: Number (default: 0)
-   `followerCount`: Number (default: 0)
-   `followingCount`: Number (default: 0)
-   `role`: String (enum: `admin`, `moderator`, `user`, default: `user`)
-   `oauthProvider`: String
-   `isTempt`: Boolean (default: true)
-   `isTwoFactorAuthEnabled`: Boolean (default: false)
-   `isBlock`: Boolean (default: false)
-   `createdAt`: Date (default: `new Date()`)
-   `updatedAt`: Date (default: `new Date()`)

### indexes

-   `username` (unique)
-   `email` (unique)

## UserProfiles

### fields

-   `_id`: ObjectId (required)
-   `userId`: String (required, ref: 'User')
-   `bio`: String
-   `phone`: String
-   `coverPage`: String
-   `socials`: [{
    `type`: {type: String, enum: 'facebook' | 'linkedin' | 'instagram' | 'github' | 'bechance', require}
    `link`: String
    }]
-   `links`: [String]
-   `skills`: [String]
-   `projects`: [{ projectName: String , link: string}]
-   `friends`: [ObjectId]
-   `followers`: [ObjectId]
-   `followings`: [ObjectId]
-   `interests`:[{type: {
    topic: String,
-   `popularity`: Number (default: 0)
    }, ref:'Tags'}]
-   `address`:[{ type: ObjectId , ref: 'Addresses'}]
-   `createdAt`: Date (default: `new Date()`)
-   `updatedAt`: Date (default: `new Date()`)

### indexes

-   `userId` (unique)

## Friends

### fields

-   `_id`: ObjectId (required)
-   `relation` : [String (required, ref: 'User')]
-   `interactionLevel`: Number (description: "The level of interaction between two users")

### indexes

-   `_id` (unique)

## Followers

### fields

-   `_id`: ObjectId (required)
-   `userFollower`: String (required, ref: 'User')
-   `userFollowing`: String (required, ref: 'User')

### indexes

-   `userFollower` (unique)
-   `userFollowing` (unique)

## FriendRequests

### fields

-   `_id`: ObjectId (required)
-   `sender`: String (required, ref: 'User')
-   `receiver`: String (required, ref: 'User')
-   `status`: String (enum: 'pending', 'accepted', 'rejected', default: 'pending')
-   `createdAt`: Date (default: `new Date()`)
-   `updatedAt`: Date (default: `new Date()`)

### indexes

-   `sender`
-   `receiver`

## Tags

### fields

-   `_id`: ObjectId (required)
-   `name`: String (required, unique)

### indexes

-   `name` (unique)

## Careers

### fields

-   `_id`: ObjectId (required)
-   `name`: String (required, unique)

### indexes

-   `name` (unique)
