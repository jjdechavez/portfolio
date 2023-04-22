module Pages.Home_ exposing (page)

import Html exposing (Html)
import Html.Attributes as Attr
import View exposing (View)


page : View msg
page =
    { title = "John Jerald De Chavez"
    , body =
        [ viewHeader
        , viewBody
        , viewFooter
        ]
    }


viewHeader : Html msg
viewHeader =
    Html.header
        [ Attr.class "container"
        ]
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


viewBody : Html msg
viewBody =
    Html.main_ [ Attr.class "container" ]
        [ Html.div
            [ Attr.id "projects"
            , Attr.class "grid"
            ]
            []
        ]


viewFooter : Html msg
viewFooter =
    Html.footer []
        [ Html.a [ Attr.href "./project/" ]
            [ Html.text "View other projects" ]
        ]
