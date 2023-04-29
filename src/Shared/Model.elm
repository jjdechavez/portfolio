module Shared.Model exposing (Model, Project, ProjectType(..), filterProjectByType)

{-| Normally, this value would live in "Shared.elm"
but that would lead to a circular dependency import cycle.

For that reason, both `Shared.Model` and `Shared.Msg` are in their
own file, so they can be imported by `Effect.elm`

-}


type alias Model =
    { projects : Maybe (List Project) }


type ProjectType
    = Expercience
    | Personal
    | All


type alias Project =
    { slug : String
    , name : String
    , description : String
    , technologies : List String
    , link : String
    , coverImage : String
    , endedAt : String
    , projectType : ProjectType
    }


filterProjectByType : List Project -> ProjectType -> List Project
filterProjectByType projects projectType =
    List.filter (\project -> project.projectType == projectType) projects
