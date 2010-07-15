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
	get events() ["new-conversation"],
	observerService: null,

	observer: {
		// Implements Components.interfaces.nsIObserver
		observe: function(aObject, aTopic, aData) {
			dump("Observed");
			return;
			if (aTopic == "new-conversation") {
				// See http://lxr.instantbird.org/instantbird/source/purple/purplexpcom/public/purpleIConversation.idl
				/*
				8:24:50 PM - flo: aObject is an instance of purpleIConversation
				8:25:36 PM - flo: you should check that it's not a chat, and if it's not you can use aObject.buddy
				8:25:47 PM - flo: well, check that it's not null
				*/
				let buddy = aConv.buddy;
				dump(buddy);
				let buddyIconFilename = buddy.buddyIconFilename;
				dump(buddy + "\n" + buddyIconFilename);
				//conversation.account.protocol.id
				//conversation.account.name
				//conversation.name
			}
		}
	},
	load: function() {
		buddyIconTabs.observerService =  Cc["@mozilla.org/observer-service;1"]
										   .getService(Ci.nsIObserverService);
		buddyIconTabs.observerService.addObserver(buddyIconTabs.observer,
												  buddyIconTabs.events,
												  false);
		window.addEventListener("unload", buddyIconTabs.unload, false);
	},
	unload: function() {
		buddyIconTabs.observerService.removeObserver(buddyIconTabs.observer,
													 buddyIconTabs.events);
	}
};

this.addEventListener("load", buddyIconTabs.load, false);
//this.addEventListener("DOMContentLoaded", buddyIconTabs.load, false);