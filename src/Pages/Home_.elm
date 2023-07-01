module Pages.Home_ exposing (Model, Msg, page)

import Api
import Api.ProjectList
import Browser.Dom as Dom
import Components.LoadingPulse exposing (loadingPulse)
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
        { init = init shared.projects
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


init : Maybe (List Shared.Model.Project) -> () -> ( Model, Effect Msg )
init shared () =
    let
        showcase : ProjectType
        showcase =
            Expercience

        projects : Api.Data (List Project)
        projects =
            case shared of
                Just maybeProjects ->
                    Api.Success <|
                        case showcase of
                            All ->
                                maybeProjects

                            _ ->
                                filterProjectByType maybeProjects showcase

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
        [ viewHeading
        , viewWorks model.projects
        , viewOffers
        , viewExperciences
        , viewContact
        ]
    }


viewHeading : Html msg
viewHeading =
    Html.header []
        [ Html.h1 []
            [ Html.text "John Jerald De Chavez / Software Developer" ]
        , Html.p []
            [ Html.text "As a software developer, my mission has been clear: to make websites easy to use for people. "
            , Html.text "So, join me on this exciting journey as we work together to simplify technology for people."
            ]
        ]


viewWork : Project -> Html msg
viewWork project =
    let
        yearFromString : String -> String
        yearFromString string =
            let
                result : Maybe String
                result =
                    String.split "-" string
                        |> List.head
            in
            case result of
                Just value ->
                    value

                Nothing ->
                    "Current"

        getProjectName : Html msg
        getProjectName =
            case project.links.website of
                Just urlLink ->
                    Html.a
                        [ Attr.href urlLink
                        , Attr.target "_blank"
                        ]
                        [ Html.text project.name ]

                Nothing ->
                    Html.text project.name
    in
    Html.li []
        [ Html.div []
            [ getProjectName
            , Html.text " - "
            , Html.text (yearFromString project.endedAt)
            , Html.p [] [ Html.text project.description ]
            ]
        ]


listWorks : List Project -> Html msg
listWorks projects =
    Html.section []
        [ Html.h2 [ Attr.id "works" ]
            [ Html.text "Works" ]
        , Html.p []
            [ Html.text "Browse through my portfolio to see how I create websites. I prioritize simplicity and intuitive interactions to empower users."
            ]
        , Html.ol []
            (List.map viewWork projects)
        ]


viewWorks : Api.Data (List Project) -> Html msg
viewWorks projectData =
    case projectData of
        Api.Loading ->
            Html.p [ Attr.class "center" ] [ Html.text "Fetching works..." ]

        Api.Failure httpError ->
            Html.div [] [ Html.text (Api.toUserFriendlyMessage httpError) ]

        Api.Success projects ->
            listWorks projects


viewOffers : Html msg
viewOffers =
    Html.section []
        [ Html.h2 [ Attr.id "start" ]
            [ Html.text "Here's what I can help you with:" ]
        , Html.ul []
            [ Html.li []
                [ Html.div []
                    [ Html.p [] [ Html.text "Website Development" ]
                    , Html.p [] [ Html.text "From user-friendly interfaces to efficient functionality, I bring a passion for simplicity to every project." ]
                    ]
                ]
            , Html.li []
                [ Html.div []
                    [ Html.p [] [ Html.text "Expert React Development" ]
                    , Html.p [] [ Html.text "Component development, Application architecture, Styles and design" ]
                    ]
                ]
            , Html.li []
                [ Html.div []
                    [ Html.p [] [ Html.text "Expert Node.js Development" ]
                    , Html.p [] [ Html.text "Web services, APIs, Testing solutions." ]
                    ]
                ]
            ]
        ]


viewExperciences : Html msg
viewExperciences =
    Html.section []
        [ Html.h2 [ Attr.id "start" ]
            [ Html.text "Experciences" ]
        , Html.ul [ Attr.class "ul-nested" ]
            [ Html.li []
                [ Html.div []
                    [ Html.a
                        [ Attr.href "https://www.digiteer.digital/"
                        , Attr.target "_blank"
                        ]
                        [ Html.text "Digiteer" ]
                    , Html.text " - Software Developer (June 2021 - August 2022)"
                    ]
                , Html.ul []
                    [ Html.li []
                        [ Html.text "Developed, maintained, and enchanced Digiteer’s Full Stack Applications."
                        ]
                    , Html.li []
                        [ Html.text "Supported production issues and escaled concerns as needed."
                        ]
                    , Html.li []
                        [ Html.text "Managed and monitored AWS cloud services."
                        ]
                    ]
                ]
            , Html.li []
                [ Html.div []
                    [ Html.a
                        [ Attr.href "https://www.techmaker.ph/"
                        , Attr.target "_blank"
                        ]
                        [ Html.text "Techmaker" ]
                    , Html.text " - Software Developer (November 2019 – June 2021)"
                    ]
                , Html.ul []
                    [ Html.li []
                        [ Html.text "Delivered improvements on Techmaker’s Full Stack Applications."
                        ]
                    , Html.li []
                        [ Html.text "Turned design prototypes into single page apps."
                        ]
                    , Html.li []
                        [ Html.text "Documented all supported systems to effectively train the new and existing team members."
                        ]
                    ]
                ]
            ]
        ]


viewContact : Html msg
viewContact =
    Html.footer []
        [ Html.h2 []
            [ Html.text "Contact"
            ]
        , Html.p []
            [ Html.text "Mail: "
            , Html.a
                [ Attr.href "mailto:dechavezjohnjerald029@gmail.com"
                ]
                [ Html.text "dechavezjohnjerald029@gmail.com"
                ]
            ]
        , Html.p []
            [ Html.text "Github: "
            , Html.a
                [ Attr.href "https://github.com/jjdechavez"
                , Attr.target "_blank"
                ]
                [ Html.text "jjdechavez"
                ]
            ]
        ]
