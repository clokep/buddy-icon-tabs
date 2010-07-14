/* ***** BEGIN LICENSE BLOCK *****
 * Version: MPL 1.1/GPL 2.0/LGPL 2.1
 *
 * The contents of this file are subject to the Mozilla Public License Version
 * 1.1 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 * http://www.mozilla.org/MPL/
 *
 * Software distributed under the License is distributed on an "AS IS" basis,
 * WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 * for the specific language governing rights and limitations under the
 * License.
 *
 * The Original Code is Buddy Icon Tabs code.
 *
 * The Initial Developer of the Original Code is
 * Patrick Cloke <clokep@gmail.com>.
 * Portions created by the Initial Developer are Copyright (C) 1998
 * the Initial Developer. All Rights Reserved.
 *
 * Contributor(s):
 *
 * Alternatively, the contents of this file may be used under the terms of
 * either of the GNU General Public License Version 2 or later (the "GPL"),
 * or the GNU Lesser General Public License Version 2.1 or later (the "LGPL"),
 * in which case the provisions of the GPL or the LGPL are applicable instead
 * of those above. If you wish to allow use of your version of this file only
 * under the terms of either the GPL or the LGPL, and not to allow others to
 * use your version of this file under the terms of the MPL, indicate your
 * decision by deleting the provisions above and replace them with the notice
 * and other provisions required by the GPL or the LGPL. If you do not delete
 * the provisions above, a recipient may use your version of this file under
 * the terms of any one of the MPL, the GPL or the LGPL.
 *
 * ***** END LICENSE BLOCK ***** */
 
function dump(aMessage) {
	var consoleService = Components.classes["@mozilla.org/consoleservice;1"]
									 .getService(Components.interfaces.nsIConsoleService);
	consoleService.logStringMessage("Buddy Icon Tabs: " + aMessage);
}
var buddyIconTabs = {
	// See https://developer.mozilla.org/en/Core_JavaScript_1.5_Guide/Working_with_Objects#Defining_Getters_and_Setters
	get events() { return ["new-conversation"]; },

	observer: {
		// Implements Components.interfaces.nsIObserver
		observe: function(aObject, aTopic, aData) {
			dump("Observed");
			if (aTopic == "new-conversation") {
				// See http://lxr.instantbird.org/instantbird/source/purple/purplexpcom/public/purpleIConversation.idl
				let conversation = aObject._conv;
				let buddy = conversation.buddy;
				let buddyIconFilename = buddy.buddyIconFilename;
				dump(buddy + "\n" + buddyIconFilename);
				//conversation.account.protocol.id
				//conversation.account.name
				//conversation.name
			}
		},
		load: function() {
			addObservers(buddyIconTabs.observer, buddyIconTabs.events);
			window.addEventListener("unload", buddyIconTabs.observer.unload, false);
		},
		unload: function() {
			removeObservers(buddyIconTabs.observer, buddyIconTabs.events);
		}
	}
};

this.addEventListener("load", buddyIconTabs.observer.load, false);