
import frappe
from frappe import _

@frappe.whitelist()
def get_sidebar(module):
	if not module or module =="Home":
		return
	workspace=frappe.get_doc("Workspace",module)
	module_items=workspace.sidebar_items
	items=[]
	count=0
	total=len(module_items)
	for i in module_items:
		if i.is_menu:
			item=i.__dict__
			item["label"]=_(item["label"])
			item["childs"]=get_childs(count+1,total,module_items)
			items.append(item)
		count+=1
	color1=workspace.color or workspace.default_color_1  or "#03fcca"
	color2=workspace.color_2 or workspace.default_color_2 or "#03fc88"
	module={"items":items,"color1":color1,"color2":color2,"direction":workspace.direction}
	return (module)


def get_childs(c,total,module_items):
	childs=[]
	while(True):
		if c>=total :
			return childs
		i=module_items[c]
		if i.is_menu:
			return childs
		if i.type=="Doctype":
			url="/app/"+i.doctype_url.replace(" ","-").lower()
		else:
			url="/app/query-report/"+i.report_url
		item=i.__dict__
		item["url"]=url
		item["label"]=_(item["label"])
		childs.append(item)
		c+=1
