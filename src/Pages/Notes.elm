module Pages.Notes exposing (Model, Msg, page)

import Effect exposing (Effect)
import Html exposing (Html)
import Html.Attributes as Attr
import Html.Events as Evt
import Page exposing (Page)
import Route exposing (Route)
import Shared
import View exposing (View)
import Shared exposing (Flags)


page : Shared.Model -> Route () -> Page Model Msg
page shared route =
    Page.new
        { init = init shared
        , update = update
        , subscriptions = subscriptions
        , view = view
        }



-- INIT


type alias Model =
    { notes : List Note
    , currentNote : String
    , currentIndex : Int
    }


type alias Note =
    { content : String
    , id : Int
    }


init : Shared.Model -> () -> ( Model, Effect Msg )
init shared () =
    ( { notes = []
      , currentNote = ""
      , currentIndex = 0
      }
    , Effect.none
    )



-- UPDATE


type Msg
    = UpdateContent String
    | DeleteNote Int
    | NewNote
    | SwitchNote Note


update : Msg -> Model -> ( Model, Effect Msg )
update msg model =
    case msg of
        UpdateContent newContent ->
            let
                updateEntry : Note -> Note
                updateEntry note =
                    if note.id == model.currentIndex then
                        { note | content = newContent }

                    else
                        note

                entries : List Note
                entries =
                    let
                        noteIds : List Int
                        noteIds =
                            List.map .id model.notes

                        existEntry : Bool
                        existEntry =
                            List.member model.currentIndex noteIds
                    in
                    if existEntry then
                        List.map updateEntry model.notes

                    else
                        model.notes ++ [ { id = model.currentIndex, content = newContent } ]

                updatedModel : Model
                updatedModel =
                    { model | currentNote = newContent, notes = entries }
            in
            ( updatedModel
            , Effect.changeNote updatedModel
            )

        DeleteNote noteId ->
            let
                updatedModel : Model
                updatedModel =
                    { model | notes = List.filter (\note -> noteId /= note.id) model.notes }
            in
            ( updatedModel
            , Effect.changeNote updatedModel
            )

        NewNote ->
            let
                newIndex : Int
                newIndex =
                    List.length model.notes + 1

                updatedModel : Model
                updatedModel =
                    { model
                        | notes = model.notes ++ [ { id = newIndex, content = "" } ]
                        , currentIndex = newIndex
                        , currentNote = ""
                    }
            in
            ( updatedModel
            , Effect.changeNote updatedModel
            )

        SwitchNote selectedNote ->
            let
                updatedModel : Model
                updatedModel =
                    { model
                        | currentIndex = selectedNote.id
                        , currentNote = selectedNote.content
                    }
            in
            ( updatedModel
            , Effect.changeNote updatedModel
            )



-- SUBSCRIPTIONS


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.none



-- VIEW


view : Model -> View Msg
view model =
    { title = "Quick Notes"
    , body =
        [ Html.div [ Attr.class "layout" ]
            [ viewSidebar model
            , Html.div [ Attr.class "page" ]
                [ viewHeader
                , Html.textarea
                    [ Attr.class "note-content"
                    , Attr.placeholder "Please write here"
                    , Attr.rows 4
                    , Attr.value model.currentNote
                    , Evt.onInput UpdateContent
                    ]
                    []
                ]
            ]
        ]
    }


viewSidebar : Model -> Html Msg
viewSidebar model =
    Html.aside [ Attr.class "sidebar" ]
        (List.concat
            [ [ Html.button
                    [ Attr.type_ "button"
                    , Evt.onClick NewNote
                    , Attr.class "add-note"
                    ]
                    [ Html.text "New note" ]
              ]
            , viewNoteCollection model.notes model.currentIndex
            ]
        )


viewNoteCollection : List Note -> Int -> List (Html Msg)
viewNoteCollection notes currentIndex =
    List.map
        (\note ->
            Html.div
                [ Attr.style "font-weight"
                    (if currentIndex == note.id then
                        "bold"

                     else
                        "normal"
                    )
                , Evt.onClick (SwitchNote note)
                ]
                [ Html.button
                    [ Attr.type_ "button"
                    , Evt.onClick (DeleteNote note.id)
                    ]
                    [ Html.text "Delete" ]
                , Html.text note.content
                ]
        )
        notes


viewHeader : Html msg
viewHeader =
    Html.header []
        [ Html.h1
            [ Attr.class "note-header" ]
            [ Html.text "Notes" ]
        ]
