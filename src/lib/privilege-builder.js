import _ from "underscore";

let PRIVILEGE_LIST = [];

export const setPrivilegeMenu = (privileges) => {
	PRIVILEGE_LIST = privileges;
	let allowedMenuLists = [];

	privileges.forEach((privilege) => {
		if (privilege.parent_id == null) {
			allowedMenuLists.push(privilege);
			setPrivilegeSubMenu(allowedMenuLists[allowedMenuLists.length - 1], privilege.menu_id);
		}
	});

	return allowedMenuLists;
};

export const setPrivilegeSubMenu = (row, menuId) => {
	let menuData = _.findWhere(PRIVILEGE_LIST, {
		menu_id: menuId,
	});

	let subMenues = _.where(PRIVILEGE_LIST, {
		parent_id: menuId,
	});

	if (subMenues.length == 0) return null;

	let newSubMenu = [];
	for (let x = 0; x < subMenues.length; x++) {
		setPrivilegeSubMenu(undefined, subMenues[x].menu_id);
		newSubMenu.push(subMenues[x]);
	}

	menuData.child = newSubMenu;
	if (row != undefined) row = menuData;
};
