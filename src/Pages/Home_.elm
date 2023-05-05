module Pages.Home_ exposing (Model, Msg, page)

import Api
import Api.ProjectList
import Browser.Dom as Dom
import Components.LoadingPulse exposing (loadingPulse)
import Components.ProjectCard exposing (viewProjectCard)
import Effect exposing (Effect)
import Html exposing (Html)
import Html.Attributes as Attr
import Html.Events as Event
import Http
import Layouts
import List
import Page exposing (Page)
import Route exposing (Route)
import Route.Path
import Shared
import Shared.Model exposing (Project, ProjectType(..), filterProjectByType)
import Task
import View exposing (View)


page : Shared.Model -> Route () -> Page Model Msg
page shared _ =
    Page.new
        { init = init shared
        , update = update shared
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
    , projectTypes : List String
    }


init : Shared.Model -> () -> ( Model, Effect Msg )
init shared () =
    let
        showcase : ProjectType
        showcase =
            All

        projects : Api.Data (List Project)
        projects =
            case shared.projects of
                Just resultProjects ->
                    Api.Success <|
                        case showcase of
                            All ->
                                resultProjects

                            _ ->
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
      , projectTypes = [ "All", "Expercience", "Personal" ]
      }
    , Effect.batch
        [ Effect.sendCmd (Task.perform (\_ -> NoOp) (Dom.setViewport 0 0))
        , effect
        ]
    )



-- UPDATE


type Msg
    = ProjectApiResponded (Result Http.Error (List Project))
    | GotoProjects
    | NoOp
    | FilterProject ProjectType


update : Shared.Model -> Msg -> Model -> ( Model, Effect Msg )
update shared msg model =
    case msg of
        ProjectApiResponded (Ok listOfProjects) ->
            let
                projects : List Project
                projects =
                    case model.showcase of
                        All ->
                            listOfProjects

                        _ ->
                            filterProjectByType listOfProjects model.showcase
            in
            ( { model | projects = Api.Success projects }
            , Effect.fetchProjects listOfProjects
            )

        ProjectApiResponded (Err httpError) ->
            ( { model | projects = Api.Failure httpError }
            , Effect.none
            )

        GotoProjects ->
            ( model
            , Effect.jumpToProjects True
            )

        NoOp ->
            ( model
            , Effect.none
            )

        FilterProject projectType ->
            let
                listOfProjects : List Project
                listOfProjects =
                    case shared.projects of
                        Just results ->
                            results

                        Nothing ->
                            []

                projects : List Project
                projects =
                    case projectType of
                        All ->
                            listOfProjects

                        _ ->
                            filterProjectByType listOfProjects projectType
            in
            ( { model | projects = Api.Success projects, showcase = projectType }
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


viewHeader : Html Msg
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
            , Html.small
                [ Attr.class "scroll-down"
                , Event.onClick GotoProjects
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


viewBody : Model -> Html Msg
viewBody model =
    Html.main_ []
        [ Html.h2
            [ Attr.style "padding" "1.75rem 0" ]
            [ Html.text "Projects" ]
        , projectTypeFilter model.projectTypes model.showcase
        , viewProjects model.projects
        ]


projectTypeFilter : List String -> ProjectType -> Html Msg
projectTypeFilter projectTypes showcase =
    Html.fieldset
        []
        (List.concat
            [ [ Html.legend
                    [ Attr.class "sr-only"
                    ]
                    [ Html.text "Project Type" ]
              ]
            , List.map (\option -> viewProjectTypeOption option showcase) projectTypes
            ]
        )


viewProjectTypeOption : String -> ProjectType -> Html Msg
viewProjectTypeOption option currentProjectType =
    let
        stringFromProjectType : String
        stringFromProjectType =
            case currentProjectType of
                Expercience ->
                    "Expercience"

                Personal ->
                    "Personal"

                _ ->
                    "All"

        projectTypeFromString : ProjectType
        projectTypeFromString =
            case option of
                "Expercience" ->
                    Expercience

                "Personal" ->
                    Personal

                _ ->
                    All

        isChecked : Bool
        isChecked =
            option == stringFromProjectType
    in
    Html.div []
        [ Html.input
            [ Attr.type_ "radio"
            , Attr.name option
            , Attr.value option
            , Attr.id option
            , Attr.class "peer"
            , Attr.checked isChecked
            , Event.onClick (FilterProject projectTypeFromString)
            ]
            []
        , Html.label
            [ Attr.for option
            ]
            [ Html.p
                []
                [ Html.text option ]
            ]
        ]


viewProjects : Api.Data (List Project) -> Html msg
viewProjects projectData =
    case projectData of
        Api.Loading ->
            loadingPulse

        Api.Success listOfProjects ->
            Html.div
                [ Attr.id "projects"
                , Attr.class "grid"
                ]
                (List.map viewProjectCard listOfProjects)

        Api.Failure httpError ->
            Html.div [] [ Html.text (Api.toUserFriendlyMessage httpError) ]
