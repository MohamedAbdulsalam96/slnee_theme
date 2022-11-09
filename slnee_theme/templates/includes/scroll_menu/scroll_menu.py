import frappe
import frappe.sessions
from frappe import _
from slnee_theme.desktop.desktop import get_workspace_sidebar_items

def get_scroll_menu():
	scroll_menu={}
	scroll_menu["modules"]=get_workspace_sidebar_items()["pages"]
	scroll_menu["only_icons"]=True
	scroll_menu["box_size"]=70
	scroll_menu["box_border"]="solid 1px var(--heading-color);";
	return scroll_menu
