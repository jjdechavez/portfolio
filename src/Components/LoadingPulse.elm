module Components.LoadingPulse exposing (loadingPulse)

import Html exposing (Html)
import Html.Attributes as Attr
import Simple.Animation as Animation exposing (Animation)
import Simple.Animation.Animated as Animated
import Simple.Animation.Property as P


loadingPulse : Html msg
loadingPulse =
    Html.div
        [ Attr.style "display" "flex"
        , Attr.style "justify-content" "center"
        , Attr.style "align-items" "center"
        ]
        [ Animated.div expandFade [ Attr.class "dot" ] []
        ]


expandFade : Animation
expandFade =
    Animation.fromTo
        { duration = 2000
        , options = [ Animation.loop ]
        }
        [ P.opacity 1, P.scale 1 ]
        [ P.opacity 0, P.scale 2 ]
