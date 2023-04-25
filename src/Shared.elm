module Shared exposing
    ( Flags, decoder
    , Model, Msg
    , init, update, subscriptions
    )

{-|

@docs Flags, decoder
@docs Model, Msg
@docs init, update, subscriptions

-}

import Effect exposing (Effect)
import Json.Decode
import Route exposing (Route)
import Route.Path
import Shared.Model exposing (Project, ProjectType(..))
import Shared.Msg



-- FLAGS


type alias Flags =
    { projects : Maybe (List Shared.Model.Project)
    }


decoder : Json.Decode.Decoder Flags
decoder =
    Json.Decode.map Flags
        (Json.Decode.field "projects" (Json.Decode.maybe (Json.Decode.list projectDecoder)))


initProjectType : String -> Shared.Model.ProjectType
initProjectType projectType =
    case projectType of
        "EXPERCIENCE" ->
            Shared.Model.Expercience

        "PERSONAL" ->
            Shared.Model.Personal

        _ ->
            Shared.Model.All


projectTypeDecoder : Json.Decode.Decoder Shared.Model.ProjectType
projectTypeDecoder =
    Json.Decode.map initProjectType
        (Json.Decode.field "type" Json.Decode.string)


projectDecoder : Json.Decode.Decoder Shared.Model.Project
projectDecoder =
    Json.Decode.map8 Shared.Model.Project
        (Json.Decode.field "slug" Json.Decode.string)
        (Json.Decode.field "name" Json.Decode.string)
        (Json.Decode.field "description" Json.Decode.string)
        (Json.Decode.field "technologies" (Json.Decode.list Json.Decode.string))
        (Json.Decode.field "link" Json.Decode.string)
        (Json.Decode.field "coverImage" Json.Decode.string)
        (Json.Decode.field "endedAt" Json.Decode.string)
        projectTypeDecoder



-- INIT


type alias Model =
    Shared.Model.Model


init : Result Json.Decode.Error Flags -> Route () -> ( Model, Effect Msg )
init flagsResult route =
    let
        flags : Flags
        flags =
            flagsResult
                |> Result.withDefault { projects = Nothing }
    in
    ( { projects = flags.projects }
    , Effect.none
    )



-- UPDATE


type alias Msg =
    Shared.Msg.Msg


update : Route () -> Msg -> Model -> ( Model, Effect Msg )
update route msg model =
    case msg of
        Shared.Msg.ExampleMsgReplaceMe ->
            ( model
            , Effect.none
            )

        Shared.Msg.FetchProjects projects ->
            ( { model | projects = Just projects }
            , Effect.saveProjects projects
            )



-- SUBSCRIPTIONS


subscriptions : Route () -> Model -> Sub Msg
subscriptions route model =
    Sub.none
