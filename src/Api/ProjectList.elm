module Api.ProjectList exposing (getProjectsByType)

import Effect exposing (Effect)
import Http
import Json.Decode
import Shared.Model exposing (Project, ProjectType(..))


getProjectsByType :
    -- ProjectType
    -- ->
    { onResponse : Result Http.Error (List Project) -> msg
    }
    -> Effect msg
getProjectsByType options =
    let
        -- currentProjectType : String
        -- currentProjectType =
        --     case projectType of
        --         Expercience ->
        --             "EXPERCIENCE"
        --
        --         Personal ->
        --             "PERSONAL"
        cmd : Cmd msg
        cmd =
            Http.get
                { url = "/data/projects.json"
                , expect = Http.expectJson options.onResponse decoder
                }
    in
    Effect.sendCmd cmd


decoder : Json.Decode.Decoder (List Project)
decoder =
    Json.Decode.list projectDecoder


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


projectDecoder : Json.Decode.Decoder Project
projectDecoder =
    Json.Decode.map8 Project
        (Json.Decode.field "slug" Json.Decode.string)
        (Json.Decode.field "name" Json.Decode.string)
        (Json.Decode.field "description" Json.Decode.string)
        (Json.Decode.field "technologies" (Json.Decode.list Json.Decode.string))
        (Json.Decode.field "link" Json.Decode.string)
        (Json.Decode.field "coverImage" Json.Decode.string)
        (Json.Decode.field "endedAt" Json.Decode.string)
        projectTypeDecoder
