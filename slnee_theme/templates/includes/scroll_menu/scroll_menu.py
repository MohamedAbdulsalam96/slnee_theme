import frappe
import frappe.sessions
from frappe import _
from slnee_theme.desktop.desktop import get_workspace_sidebar_items

def get_scroll_menu():
	theme=frappe.get_doc("Theme Settings")
	scroll_menu={}
	scroll_menu["modules"]=get_workspace_sidebar_items()["pages"]
	scroll_menu["only_icons"]=theme.hide_labels
	scroll_menu["box_size"]=theme.box_size
	scroll_menu["box_border"]="solid 1px var(--heading-color);";
	scroll_menu["sidebar_font"]=theme.font
	scroll_menu["sidebar_font_css"]=theme.font_css
	return scroll_menu
