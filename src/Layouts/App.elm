module Layouts.App exposing (Model, Msg, Settings, layout)

import Effect exposing (Effect)
import Html exposing (Html)
import Html.Attributes exposing (class)
import Layout exposing (Layout)
import Route exposing (Route)
import Route.Path
import Shared
import View exposing (View)


type alias Settings =
    { footerLink : Route.Path.Path
    , footerName : String
    }


layout : Settings -> Shared.Model -> Route () -> Layout Model Msg mainMsg
layout settings shared route =
    Layout.new
        { init = init
        , update = update
        , view = view
        , subscriptions = subscriptions
        }



-- MODEL


type alias Model =
    {}


init : () -> ( Model, Effect Msg )
init _ =
    ( {}
    , Effect.none
    )



-- UPDATE


type Msg
    = ReplaceMe


update : Msg -> Model -> ( Model, Effect Msg )
update msg model =
    case msg of
        ReplaceMe ->
            ( model
            , Effect.none
            )


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.none



-- VIEW


viewFooter : Html msg
viewFooter =
    let
        projectsRoute : Route.Path.Path
        projectsRoute =
            Route.Path.Projects
    in
    Html.footer []
        [ Html.a [ Route.Path.href projectsRoute ]
            [ Html.text "View other projects" ]
        ]


view : { fromMsg : Msg -> mainMsg, content : View mainMsg, model : Model } -> View mainMsg
view { fromMsg, model, content } =
    { title = content.title
    , body =
        [ Html.div [ class "container" ] content.body
        , viewFooter
        ]
    }
