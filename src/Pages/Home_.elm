module Pages.Home_ exposing (Model, Msg, page)

import Api
import Api.ProjectList exposing (Project, ProjectType)
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
import View exposing (View)


page : Shared.Model -> Route () -> Page Model Msg
page _ _ =
    Page.new
        { init = init
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


init : () -> ( Model, Effect Msg )
init () =
    ( { projects = Api.Loading
      , showcase = Api.ProjectList.Expercience
      }
    , Api.ProjectList.getProjectsByType
        { onResponse = ProjectApiResponded }
    )



-- UPDATE


type Msg
    = ProjectApiResponded (Result Http.Error (List Project))


update : Msg -> Model -> ( Model, Effect Msg )
update msg model =
    case msg of
        ProjectApiResponded (Ok listOfProjects) ->
            let
                expercienceProject : Project -> Bool
                expercienceProject project =
                    project.projectType == model.showcase

                projects : List Project
                projects =
                    List.filter expercienceProject listOfProjects
            in
            ( { model | projects = Api.Success projects }
            , Effect.none
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


viewProject : Project -> Html msg
viewProject project =
    Html.article
        [ Attr.class "project-grid-item"

        -- , Attr.attribute "data-sal" "slide-up"
        -- , Attr.attribute "data-sal-duration" "1200"
        -- , Attr.attribute "data-sal-delay" "300"
        -- , Attr.attribute "data-sal-easing" "ease-out-bounce"
        ]
        [ Html.header []
            [ Html.a
                [ Attr.href project.link
                , Attr.target "_blank"
                , Attr.rel "noopener"
                ]
                [ Html.img
                    [ Attr.class "detail-img"
                    , Attr.src project.coverImage
                    , Attr.alt project.name
                    ]
                    []
                ]
            ]
        , Html.div [ Attr.class "content" ]
            [ Html.h3 []
                [ Html.text project.name
                , Html.small [] [ Html.text project.endedAt ]
                ]
            , Html.p [ Attr.class "description" ]
                [ Html.text project.description ]
            , Html.p [ Attr.class "technology" ]
                [ Html.text <| String.join ", " project.technologies ]
            ]
        ]


viewProjects : List Project -> List (Html msg)
viewProjects listOfProjects =
    List.map viewProject listOfProjects


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
