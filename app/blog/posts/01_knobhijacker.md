---
title: "Knob Hijacker"
date: "10 August, 2024"
thumbnail: "/images/posts/knobhijacker/title.gif"
github: "https://github.com/filsus/KnobHijacker"
nukepedia: "https://www.nukepedia.com/python/nodegraph/knobhijacker"
---

KnobHijacker is a **Nuke (Foundry) plugin** that enables the user to "**hijack**" chosen **knobs** and their **QWidget container** on a selected node, by either pressing a **keyboard shortcut** or a **mouse button right-click**. The behaviour of the QWidget container can be **modified**, thus automating the value input from the user. For example, the size knob on the Blur node can be hijacked, instantly prompting the user to enter the size value and **confirm** by pressing the **Return key**.
<!-- end -->

## WHY?

Blur and Erode are my most frequently used nodes in the Node Graph and I kept getting tired of constantly going to the Properties panel and entering the values manually. So I thought creating a slider widget that would pop up at my cursor location would speed things up. After quickly giving up that idea due to too much fiddling needed, I just thought to myself why not to actually grab the existing knob. This is how all the fun started.

## RETRIEVING PROPERTIES PANEL WIDGET

To simplify things, first thing we need to do is **acces** the **Properties panel** widget that holds the node knobs. Not sure why I innitialy thought that the best way to this is is sample the screen in grid like manner and use the [`QApplication.widgetAt`](https://doc.qt.io/qt-6/qapplication.html#widgetAt-1) and a bit of recursive parent traversing to return the Properties panel widget, when later I realized you can just start with [`QtWidgets.QApplication.instance`](https://doc.qt.io/qt-5/qcoreapplication.html#instance) and iterate through [`QWidget.allWidgets`](https://doc.qt.io/qt-5/qapplication.html#allWidgets) to retrieve the Properties panel. I provide both methods here for reference.

> Note: All the code is available on [Github](https://github.com/filsus/KnobHijacker). Feel free to follow along and reference what I am saying.
#
```python
### New method using a generator to iterate through all widgets

properties_panel = next((widget for widget in QtWidgets.QApplication.instance().allWidgets() if isinstance(widget, QtWidgets.QWidget) and 'Properties' in widget.objectName()), None)
```
#

```python

### Old method using the widgetAt function
#####################################################################################

def find_properties_widget_recursive(self, screen_points):
    properties_panels = []

    def resursive(widget):
        # Check if the current widget's name contains "Properties"
        if widget.objectName() and "Properties" in widget.objectName():
            return widget

        # Recursively search in the parent widget
        parent_widget = widget.parentWidget()
        if parent_widget:
            return resursive(parent_widget)

    for p in screen_points:
        widget = QtWidgets.QApplication.instance().widgetAt(p)
        if widget != None:
            panel = resursive(widget)
            properties_panels.append(panel)

    return properties_panels


def get_open_properties_panels(self):
    # Get information about all screens
    screens = QtWidgets.QApplication.screens()
    # Create a list to store the screen points
    screen_points = []

    for screen in screens:
        screen_geometry = screen.geometry()

        screen_width, screen_height = screen_geometry.width(), screen_geometry.height()

        # Set up the 16x16 grid
        rows, cols = 16, 16

        # Calculate the grid points for the current screen
        for row in range(rows):
            for col in range(cols):
                # Calculate the corresponding points based on simple math
                x = col * (screen_width // cols) + 20 + screen_geometry.left()
                y = row * (screen_height // rows) + screen_geometry.top()

                # Append QPoint to the list
                screen_points.append(QtCore.QPoint(x, y))

    # Pass the screen_points list to your function
    return nuke.executeInMainThreadWithResult(self.find_properties_widget_recursive, (screen_points))
```
## RETREIVING KNOB WIDGET

The only link I cold find between the knob and the widget is the tooltip. `QWidget.toolTip()` is matching `nuke.knob().tooltip()` the only problem is that the `QWidget.toolTip()` returns an HTML string with additional header at the top containtng the name of the knob like so `<b>{knob_name}</b>`. Thus we need to convert it.

#
Now we have all the building blocks of the puzzle. All that needs to be done is spawn an instance of custom widget, show the widget at cursor location and add the QWidget with matching tooltip from the Properties panel widget to the layout.

## RUNNING KNOB HIJACKER
After downloading and installing the plugin to your `NUKE_PLUGIN_PATH` you can set a custom keyshortcut to execute the `Hijack.run` function. Running it for the first time will spawn a QDialog that lets you select the knob that will be consequently used.

![Selection Dialog](/images/posts/knobhijacker/selection_dialog.png)
> Note: This is saved to  `/.nuke/Hijacker_settings.json`. After savinig the knob there is currently no way to change it and must be modified in the file directly. Only one knob can be hijacked.

Since we have now a full control of the knobs QWidget we can do some interesting stuff with it using the PyQt/PySide API. I have automated button/checkbox pressing via a custom `Hijack.keyPressEvent` and also applied some rules using `Hijack.apply_knob_rules` to automated some clicks here and there. These can be extended to your liking.

## RIGHT CLICK EVENT FILTER
Having too many shortcuts assigned I thought using right click instead would be a better idea. After a quick googling session I found [this](https://community.foundry.com/discuss/topic/145197/contextual-right-click-menu-in-dag) Nuke forum article by Erwan Leroy with [solution](https://community.foundry.com/discuss/post/1157973) by Mitchell Woodin.
#

I changed it up to keep a reference to the Node Graph widget during the `__init__` so that garbage collection does not discard it like so:
```python
# /EventFilters.py
    self.dag_parent = next((widget for widget in QtWidgets.QApplication.instance().allWidgets() if isinstance(widget, QtWidgets.QWidget)))
```
#

Next, the events must be run as following order to propagate correctly. `Hijacker.run` must be postponed until the end of event queu otherwise the mouse will right click on the widget triggering a context menu.

 - right mouse button press
 - trigger left button press to select the node
 - propagate rest of the events
 - run the hijacker

If you are not a fan of overriding your right click in NodeGraph you can disable this by removing these lines from `menu.py`

```python
import EventFilters
FILTER = EventFilters.CustomEventFilter()
```
#
___
#
And that is it! Feel free to fork the repository and play around if interested. I am open to suggestions on how to make it better. Just reach out on social media.