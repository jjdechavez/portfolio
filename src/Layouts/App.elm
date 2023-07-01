module Layouts.App exposing (Model, Msg, Settings, layout)

import Effect exposing (Effect)
import Html exposing (Html)
import Html.Attributes as Attr
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
layout settings _ _ =
    Layout.new
        { init = init
        , update = update
        , view = view settings
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
    = NoOp


update : Msg -> Model -> ( Model, Effect Msg )
update msg model =
    case msg of
        NoOp ->
            ( model
            , Effect.none
            )


subscriptions : Model -> Sub Msg
subscriptions _ =
    Sub.none



-- VIEW


view : Settings -> { fromMsg : Msg -> mainMsg, content : View mainMsg, model : Model } -> View mainMsg
view settings { content } =
    { title = content.title
    , body =
        [ Html.nav []
            [ Html.a
                [ Attr.class "home"
                , Route.Path.href Route.Path.Home_
                ]
                [ Html.text "↖" ]
            , Html.ul
                []
                [ Html.li []
                    [ Html.a
                        [ Attr.href "./John-Jerald-De-Chavez-Resume.pdf"
                        , Attr.target "_blank"
                        ]
                        [ Html.text "Resume" ]
                    ]
                , Html.li []
                    [ Html.a
                        [ Route.Path.href Route.Path.Notes
                        , Attr.class "nav-link"
                        ]
                        [ Html.text "Notes" ]
                    ]
                ]
            ]
        , Html.div [ Attr.class "container" ] content.body
        ]
    }


viewFooter : Settings -> Html mainMsg
viewFooter settings =
    let
        route : Route.Path.Path
        route =
            settings.footerLink
    in
    Html.footer []
        [ Html.a [ Route.Path.href route ]
            [ Html.text settings.footerName ]
        ]
