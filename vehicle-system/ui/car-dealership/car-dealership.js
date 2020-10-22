const NativeUI = require("nativeui");
const Menu = NativeUI.Menu;
const UIMenuItem = NativeUI.UIMenuItem;
const UIMenuListItem = NativeUI.UIMenuListItem;
const UIMenuCheckboxItem = NativeUI.UIMenuCheckboxItem;
const UIMenuSliderItem = NativeUI.UIMenuSliderItem;
const BadgeStyle = NativeUI.BadgeStyle;
const Point = NativeUI.Point;
const ItemsCollection = NativeUI.ItemsCollection;
const Color = NativeUI.Color;
const ListItem = NativeUI.ListItem;

mp.gui.chat.activate(false);
mp.gui.chat.show(false);
mp.gui.cursor.show(false, false);
mp.gui.chat.show(false);

mp.keys.bind(0x45, true, function() {
    mp.gui.cursor.show(true, true);
    mp.gui.chat.show(true);
})

const ui = new Menu("Test UI", "Test UI Subtitle", new Point(50, 50));
ui.AddItem(new UIMenuListItem(
	"List Item",
	"Fugiat pariatur consectetur ex duis magna nostrud et dolor laboris est do pariatur amet sint.",
	new ItemsCollection(["Item 1", "Item 2", "Item 3"])
));
ui.AddItem(new UIMenuSliderItem(
	"Slider Item",
	["Fugiat", "pariatur", "consectetur", "ex", "duis", "magna", "nostrud", "et", "dolor", "laboris"],
	5,
	"Fugiat pariatur consectetur ex duis magna nostrud et dolor laboris est do pariatur amet sint.",
	true
));
ui.AddItem(new UIMenuCheckboxItem(
	"Checkbox Item",
	false,
	"Fugiat pariatur consectetur ex duis magna nostrud et dolor laboris est do pariatur amet sint."
));

ui.ItemSelect.on(item => {
	if (item instanceof UIMenuListItem) {
		console.log(item.SelectedItem.DisplayText, item.SelectedItem.Data);
	} else if (item instanceof UIMenuSliderItem) {
		console.log(item.Text, item.Index, item.IndexToItem(item.Index));
	} else {
		console.log(item.Text);
	}
});

 ui.SliderChange.on((item, index, value) => {
 	console.log(item.Text, index, value);
});

mp.keys.bind(0x71, false, () => {
	if (ui.Visible) ui.Close();
	else ui.Open();
});
