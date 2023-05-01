module Components.ProjectCard exposing (viewProjectCard)

import Html exposing (Html)
import Html.Attributes as Attr
import Shared.Model exposing (Project)
import Simple.Animation as Animation exposing (Animation)
import Simple.Animation.Animated as Animated
import Simple.Animation.Property as P
import Simple.Transition as Transition


viewProjectCard : Project -> Html msg
viewProjectCard project =
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
    in
    Animated.div
        slideUp
        [ Attr.class "project-card project-grid-item"
        , Transition.properties
            [ Transition.opacity 500 [ Transition.delay 300 ] ]
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
                , Html.text " "
                , Html.small [] [ Html.text (yearFromString project.endedAt) ]
                ]
            , Html.div [ Attr.class "headings" ]
                [ Html.p [ Attr.class "description" ]
                    [ Html.text project.description ]
                , Html.p [ Attr.class "technology" ]
                    [ Html.text "Website"
                    , Html.text " "
                    , Html.text "Code"
                    ]
                ]
            ]
        ]


slideUp : Animation
slideUp =
    Animation.steps
        { startAt = [ P.property "transform" "none", P.opacity 0 ]
        , options = [ Animation.easeIn, Animation.delay 300 ]
        }
        [ Animation.step 800 [ P.opacity 1, P.y 20 ]
        ]
