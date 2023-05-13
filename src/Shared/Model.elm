module Shared.Model exposing
    ( Model
    , Note
    , Project
    , ProjectLinks
    , ProjectType(..)
    , filterProjectByType
    , noteEncoder
    , projectDecoder
    , projectEncoder
    )

{-| Normally, this value would live in "Shared.elm"
but that would lead to a circular dependency import cycle.

For that reason, both `Shared.Model` and `Shared.Msg` are in their
own file, so they can be imported by `Effect.elm`

-}

import Json.Decode
import Json.Encode


type alias Model =
    { projects : Maybe (List Project) }



-- Project


type ProjectType
    = Expercience
    | Personal
    | All


type alias ProjectLinks =
    { website : Maybe String
    , sourceCode : Maybe String
    }


type alias Project =
    { slug : String
    , name : String
    , description : String
    , technologies : List String
    , links : ProjectLinks
    , coverImage : String
    , endedAt : String
    , projectType : ProjectType
    }


filterProjectByType : List Project -> ProjectType -> List Project
filterProjectByType projects projectType =
    List.filter (\project -> project.projectType == projectType) projects



-- Port encoder : Save on localstorage


projectTypeEncoder : ProjectType -> Json.Encode.Value
projectTypeEncoder projectType =
    Json.Encode.string <|
        case projectType of
            Expercience ->
                "EXPERCIENCE"

            Personal ->
                "PERSONAL"

            _ ->
                "ALL"


projectLinkEncoder : Maybe String -> Json.Encode.Value
projectLinkEncoder maybeLink =
    case maybeLink of
        Just link ->
            Json.Encode.string link

        Nothing ->
            Json.Encode.null


projectEncoder :
    Project
    -> Json.Encode.Value
projectEncoder project =
    Json.Encode.object
        [ ( "slug", Json.Encode.string project.slug )
        , ( "name", Json.Encode.string project.name )
        , ( "description", Json.Encode.string project.description )
        , ( "technologies", Json.Encode.list Json.Encode.string project.technologies )
        , ( "links"
          , Json.Encode.object
                [ ( "website", projectLinkEncoder project.links.website )
                , ( "sourceCode", projectLinkEncoder project.links.sourceCode )
                ]
          )
        , ( "coverImage", Json.Encode.string project.coverImage )
        , ( "endedAt", Json.Encode.string project.endedAt )
        , ( "projectType", projectTypeEncoder project.projectType )
        ]



-- Flags from Javascript - Decoder


projectDecoder : Json.Decode.Decoder Project
projectDecoder =
    Json.Decode.map8 Project
        (Json.Decode.field "slug" Json.Decode.string)
        (Json.Decode.field "name" Json.Decode.string)
        (Json.Decode.field "description" Json.Decode.string)
        (Json.Decode.field "technologies" (Json.Decode.list Json.Decode.string))
        projectLinkDecoder
        (Json.Decode.field "coverImage" Json.Decode.string)
        (Json.Decode.field "endedAt" Json.Decode.string)
        projectTypeDecoder


initProjectType : String -> ProjectType
initProjectType projectType =
    case projectType of
        "EXPERCIENCE" ->
            Expercience

        "PERSONAL" ->
            Personal

        _ ->
            All


projectTypeDecoder : Json.Decode.Decoder ProjectType
projectTypeDecoder =
    Json.Decode.map initProjectType
        (Json.Decode.field "type" Json.Decode.string)


projectLinkDecoder : Json.Decode.Decoder ProjectLinks
projectLinkDecoder =
    Json.Decode.map2 ProjectLinks
        (Json.Decode.maybe (Json.Decode.at [ "links", "website" ] Json.Decode.string))
        (Json.Decode.maybe (Json.Decode.at [ "links", "sourceCode" ] Json.Decode.string))



-- Notes


type alias Note =
    { id : Int
    , content : String
    }


noteEncoder :
    { notes : List Note
    , currentNote : String
    , currentIndex : Int
    }
    -> Json.Encode.Value
noteEncoder noteData =
    Json.Encode.object
        [ ( "notes", Json.Encode.list encodeNote noteData.notes )
        , ( "currentNote", Json.Encode.string noteData.currentNote )
        , ( "currentIndex", Json.Encode.int noteData.currentIndex )
        ]


encodeNote :
    Note
    -> Json.Encode.Value
encodeNote note =
    Json.Encode.object
        [ ( "id", Json.Encode.int note.id )
        , ( "content", Json.Encode.string note.content )
        ]
