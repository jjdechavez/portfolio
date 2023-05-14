module Pages.Notes exposing (Model, Msg, page)

import Effect exposing (Effect)
import Html exposing (Html)
import Html.Attributes as Attr
import Html.Events as Evt
import Page exposing (Page)
import Route exposing (Route)
import Route.Path
import Shared
import Shared.Model
import View exposing (View)


page : Shared.Model -> Route () -> Page Model Msg
page shared _ =
    Page.new
        { init = init shared.noteData
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


init : Maybe Shared.Model.NotePagePayload -> () -> ( Model, Effect Msg )
init shared () =
    let
        defaultModel : Model
        defaultModel =
            { notes = []
            , currentNote = ""
            , currentIndex = 0
            }

        maybeModel : Model
        maybeModel =
            shared
                |> Maybe.withDefault defaultModel
    in
    ( maybeModel
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
                    let
                        updatedNotes : List Note
                        updatedNotes =
                            List.filter (\note -> noteId /= note.id) model.notes

                        previousIndex : Int
                        previousIndex =
                            let
                                totalLength : Int
                                totalLength =
                                    List.length updatedNotes - 1

                                defaultCurrentIndex : Int
                                defaultCurrentIndex =
                                    0
                            in
                            if totalLength < 0 then
                                defaultCurrentIndex

                            else
                                totalLength

                        previousNote : Note
                        previousNote =
                            let
                                findPreviousList : List ( Int, Note ) -> Maybe Note
                                findPreviousList list =
                                    case list of
                                        [] ->
                                            Nothing

                                        head :: [] ->
                                            if Tuple.first head == previousIndex then
                                                Just (Tuple.second head)

                                            else
                                                Nothing

                                        head :: rest ->
                                            if Tuple.first head == previousIndex then
                                                Just (Tuple.second head)

                                            else
                                                findPreviousList rest
                            in
                            findPreviousList (List.indexedMap Tuple.pair updatedNotes)
                                |> Maybe.withDefault { id = 0, content = "" }
                    in
                    { model
                        | notes = updatedNotes
                        , currentIndex = previousNote.id
                        , currentNote = previousNote.content
                    }
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
subscriptions _ =
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
                , Attr.class "note-item"
                ]
                [ Html.button
                    [ Attr.type_ "button"
                    , Evt.onClick (DeleteNote note.id)
                    , Attr.class "remove-note"
                    ]
                    [ Html.img
                        [ Attr.src "trash.svg"
                        , Attr.alt "Delete note"
                        , Attr.class "img--svg"
                        ]
                        []
                    ]
                , Html.span
                    [ Evt.onClick (SwitchNote note)
                    ]
                    [ Html.text note.content ]
                ]
        )
        notes


viewHeader : Html msg
viewHeader =
    Html.header
        [ Attr.class "note-header"
        ]
        [ Html.h1
            []
            [ Html.text "Notes" ]
        , Html.a [ Route.Path.href Route.Path.Home_ ]
            [ Html.img
                [ Attr.src "home.svg"
                , Attr.alt "Refirect to home"
                , Attr.class "img--svg"
                , Attr.style "height" "24px"
                ]
                []
            ]
        ]
