
## Blocking

### Acceptance criteria
- Users should be able to block other users
- Users should be able to unblock users they've blocked
- Users should not see profiles of blocked users in their search results
- Users who are blocked should not be able to navigate **any** profile of a user who blocked them
- Users should not see users who block them in their search results
    

### UI
- BlockModal - used to block a user
- BlocksList (in UserSettings) - used to view list of all users that user has blocked
- UnblockModal - used to unblock a user

### Database design
```ts
interface Block {
    profileId UUID
    userId    UUID
    createdAt Date
    updatedAt Date
}
```

## API Routes

`GET /blocks`
- Returns array of Blocks the currently authenticated users blocks
- Example response:
```json
[
    {
    "profileId": "kjasdfkj23h4234",
    "createdAt": "2022-01-15T12:00:00.000z",
    "avatarUrl": "https://some.url.com/foo.jpg",
    // If guest...
    "firstName": "John",
    "lastName": "Doe",
    // If show...
    "showTitle": "The John Doe Files"
    }
    // ...
]
```
- Returning the blocked user's name/title and avatar in order to display it in the BlocksList

`GET /admin/blocks?userId=ABC&isActive=XYZ&profileId=123`
- Only accessible by StreamYard Admins
- Results can be filtered by:
    - active status
    - profile id of user who was blocked
    - user id to get list of all users the user has blocked

`POST /block/:profileId`
- Creates a new block record, blocks user with `profileId` from connecting with authenticated user
- Returns 200

`DELETE /block`
- Deletes block record, unblocking user with `profileId` from connecting with authenticated user
- Returns 200

### API changes
- Modify SQL query used for GET /explore routes to do a join with the *Blocks* table. Return only profiles for whom their is no active block record.
- Modify GET `/profile/:profileId` route to return 404 Not Found if user is blocked.
    - Create a `isNotBlocked` pre-function to be used on this route.

### Notes
- Should we also add `isActive` to the `Block` table instead of deleting them in order to maintain a record? This may be a question for legal.

## Reporting

### Acceptance criteria
- Users should be able to report other users
- Users should be able to unblock users who are blocked because they've reported them
- Users should not see reported users in their search results
- Users who are reported should not be able to navigate to profile of user who reported them
- Users should not see users who reported them in their search results

### Database design
```ts
interface Report {
    profileId UUID
    userId    UUID
    reason    ENUM
    // Whether report is currently under investigation. 
    // Will be marked as false after investigation is over.
    // default: true
    isActive:  Boolean;
    createdAt Date
    updatedAt Date
}
```

### API design
`POST /report/:profileId`
- Creates a new report record
- Creates a new block record, blocking user with `profileId` from connecting with authenticated user
- Returns 200

`GET /admin/reports?userId=ABC&isActive=XYZ&profileId=123`
- Only accessible by StreamYard Admins
- Results can be filtered by:
    - active status
    - profile id of user who was reported
    - user id for user's reports
- Example response:
```json
[
    {
        "profileId": "kjasdfkj23h4234",
        "createdAt": "2022-01-15T12:00:00.000z",
        "avatarUrl": "https://some.url.com/foo.jpg",
        // If guest...
        "firstName": "John",
        "lastName": "Doe",
        // If show...
        "showTitle": "The John Doe Files"
    }
    // ...
]
```

### API changes
- *See Blocking docs*

### UI
#### **ReportModal**
Used to report a user

#### **AdminReportsModal**
Used within the StreamYard Admin UI by admins to moderate reports

***Notes:***
- Reports cannot be deleted.