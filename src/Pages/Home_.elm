module Pages.Home_ exposing (Model, Msg, page)

import Api
import Api.ProjectList
import Components.ProjectCard exposing (viewProjectCard)
import Effect exposing (Effect)
import Html exposing (Html)
import Html.Attributes as Attr
import Http
import Layouts
import List
import Page exposing (Page)
import Route exposing (Route)
import Route.Path
import Shared
import Shared.Model exposing (Project, ProjectType(..), filterProjectByType)
import View exposing (View)


page : Shared.Model -> Route () -> Page Model Msg
page shared _ =
    Page.new
        { init = init shared
        , update = update
        , subscriptions = subscriptions
        , view = view
        }
        |> Page.withLayout layout


layout : Model -> Layouts.Layout
layout _ =
    Layouts.App
        { app =
            { footerLink = Route.Path.Projects
            , footerName = "View other projects"
            }
        }



-- INIT


type alias Model =
    { projects : Api.Data (List Project)
    , showcase : ProjectType
    }


init : Shared.Model -> () -> ( Model, Effect Msg )
init shared () =
    let
        showcase : ProjectType
        showcase =
            Expercience

        projects : Api.Data (List Project)
        projects =
            case shared.projects of
                Just resultProjects ->
                    Api.Success <|
                        filterProjectByType resultProjects showcase

                Nothing ->
                    Api.Loading

        effect : Effect Msg
        effect =
            case projects of
                Api.Success _ ->
                    Effect.none

                Api.Loading ->
                    Api.ProjectList.getProjects
                        { onResponse = ProjectApiResponded }

                Api.Failure _ ->
                    Effect.none
    in
    ( { projects = projects
      , showcase = showcase
      }
    , effect
    )



-- UPDATE


type Msg
    = ProjectApiResponded (Result Http.Error (List Project))


update : Msg -> Model -> ( Model, Effect Msg )
update msg model =
    case msg of
        ProjectApiResponded (Ok listOfProjects) ->
            let
                projects : List Project
                projects =
                    filterProjectByType listOfProjects model.showcase
            in
            ( { model | projects = Api.Success projects }
            , Effect.fetchProjects listOfProjects
            )

        ProjectApiResponded (Err httpError) ->
            ( { model | projects = Api.Failure httpError }
            , Effect.none
            )



-- SUBSCRIPTIONS


subscriptions : Model -> Sub Msg
subscriptions _ =
    Sub.none



-- VIEW


view : Model -> View Msg
view model =
    { title = "John Jerald De Chavez"
    , body =
        [ viewHeader
        , viewBody model
        ]
    }


viewHeader : Html msg
viewHeader =
    Html.header
        []
        [ Html.div
            [ Attr.class "landing headline"
            ]
            [ Html.node "hgroup"
                []
                [ Html.h1 []
                    [ Html.text "John Jerald De Chavez" ]
                , Html.h2 []
                    [ Html.text "Build & Design Websites" ]
                ]
            , Html.nav []
                [ viewCTA
                ]
            , Html.span
                [ Attr.class "scroll-down"
                ]
                [ Html.text "↓ Scroll Down" ]
            ]
        ]


viewLink : String -> String -> Html msg
viewLink text link =
    Html.li []
        [ Html.a
            [ Attr.href link
            , Attr.target "_blank"
            ]
            [ Html.text text ]
        ]


viewCTA : Html msg
viewCTA =
    Html.ul []
        [ viewLink "Resume" "./John-Jerald-De-Chavez-Resume.pdf"
        , viewLink "Gmail" "mailto:dechavezjohnjerald029@gmail.com"
        , viewLink "Github" "https://github.com/jjdechavez"
        ]


viewProjects : List Project -> List (Html msg)
viewProjects listOfProjects =
    List.map viewProjectCard listOfProjects


viewBody : Model -> Html msg
viewBody model =
    Html.main_ []
        [ case model.projects of
            Api.Loading ->
                Html.div [] [ Html.text "Loading..." ]

            Api.Success listOfProjects ->
                Html.div
                    [ Attr.id "projects"
                    , Attr.class "grid"
                    ]
                    (viewProjects listOfProjects)

            Api.Failure httpError ->
                Html.div [] [ Html.text (Api.toUserFriendlyMessage httpError) ]
        ]
