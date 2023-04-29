module Pages.Projects exposing (Model, Msg, page)

import Api
import Api.ProjectList
import Browser.Dom as Dom
import Components.LoadingPulse exposing (loadingPulse)
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
import Task
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
            { footerLink = Route.Path.Home_
            , footerName = "Back to home"
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
            Personal

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
    , Effect.batch
        [ Effect.sendCmd (Task.perform (\_ -> NoOp) (Dom.setViewport 0 0))
        , effect
        ]
    )



-- UPDATE


type Msg
    = ProjectApiResponded (Result Http.Error (List Project))
    | NoOp


update : Msg -> Model -> ( Model, Effect Msg )
update msg model =
    case msg of
        ProjectApiResponded (Ok listOfProjects) ->
            let
                personalProject : Project -> Bool
                personalProject project =
                    project.projectType == model.showcase

                projects : List Project
                projects =
                    List.filter personalProject listOfProjects
            in
            ( { model | projects = Api.Success projects }
            , Effect.none
            )

        ProjectApiResponded (Err httpError) ->
            ( { model | projects = Api.Failure httpError }
            , Effect.none
            )

        NoOp ->
            ( model
            , Effect.none
            )



-- SUBSCRIPTIONS


subscriptions : Model -> Sub Msg
subscriptions _ =
    Sub.none



-- VIEW


view : Model -> View Msg
view model =
    { title = "Projects"
    , body =
        [ viewBody model
        ]
    }


viewProjects : List Project -> List (Html msg)
viewProjects listOfProjects =
    List.map viewProjectCard listOfProjects


viewBody : Model -> Html msg
viewBody model =
    Html.main_ []
        [ Html.header [ Attr.class "section-header" ]
            [ Html.h1 [] [ Html.text "Other Projects" ]
            ]
        , case model.projects of
            Api.Loading ->
                loadingPulse

            Api.Success listOfProjects ->
                Html.div
                    [ Attr.id "projects"
                    , Attr.class "grid"
                    ]
                    (viewProjects listOfProjects)

            Api.Failure httpError ->
                Html.div [] [ Html.text (Api.toUserFriendlyMessage httpError) ]
        ]
