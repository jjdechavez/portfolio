module Components.ProjectCard exposing (viewProjectCard)

import Html exposing (Html)
import Html.Attributes as Attr
import Shared.Model exposing (Project)


viewProjectCard : Project -> Html msg
viewProjectCard project =
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
