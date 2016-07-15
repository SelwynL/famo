    if ($event->getViewerIsInvited()) {
        $icon_icon = $event->getIcon();
        $icon_color = $event->getIconColor();
    } else {
        $icon_color = null;
    }