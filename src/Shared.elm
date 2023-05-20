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
import Shared.Model exposing (ProjectType(..), noteDecoder, projectDecoder)
import Shared.Msg



-- FLAGS


type alias Flags =
    { projects : Maybe (List Shared.Model.Project)
    , noteData : Maybe Shared.Model.NotePagePayload
    }


decoder : Json.Decode.Decoder Flags
decoder =
    Json.Decode.map2 Flags
        (Json.Decode.field "projects" (Json.Decode.maybe (Json.Decode.list projectDecoder)))
        (Json.Decode.field "noteData" (Json.Decode.maybe noteDecoder))



-- INIT


type alias Model =
    Shared.Model.Model


init : Result Json.Decode.Error Flags -> Route () -> ( Model, Effect Msg )
init flagsResult route =
    let
        flags : Flags
        flags =
            flagsResult
                |> Result.withDefault { projects = Nothing, noteData = Nothing }
    in
    ( { projects = flags.projects, noteData = flags.noteData }
    , Effect.none
    )



-- UPDATE


type alias Msg =
    Shared.Msg.Msg


update : Route () -> Msg -> Model -> ( Model, Effect Msg )
update route msg model =
    case msg of
        Shared.Msg.FetchProjects projects ->
            ( { model | projects = Just projects }
            , Effect.saveProjects projects
            )

        Shared.Msg.ChangeNote updatedNote ->
            ( { model | noteData = Just updatedNote }
            , Effect.saveNote updatedNote
            )



-- SUBSCRIPTIONS


subscriptions : Route () -> Model -> Sub Msg
subscriptions route model =
    Sub.none
