/*
	iJot vs 3.0
	created by Marc Barrot
	(c) 2005-2011 Network Composers LLC

	User Interface Functions
	Last modified 9/19/2011 by MB

	This code relies on Sensa Touch vs 1.1.0
*/

	new Ext.Application ({
	name: 'ijot',


	// Determine device/orientation
	profiles: {

		portraitPhone: function () {
			return Ext.is.Phone && Ext.orientation == 'portrait';
		},

		landscapePhone: function () {
			return Ext.is.Phone && Ext.orientation == 'landscape';
		},

		portraitTablet: function () {
			return !Ext.is.Phone && Ext.orientation == 'portrait';
		},

		landscapeTablet: function () {
			return !Ext.is.Phone && Ext.orientation == 'landscape';
		}
	},

	// Execute at launch
	launch: function () {
		var app = this;

		// Define UI display
		var viewport = this.viewport = new Ext.Panel ({
			fullscreen: true,
			layout: 'card',
			showingPage: false,
			showingSplash: true,
			showingDocs: true,
			showingFeeds: false
		});

		// Update UI display according to device/orientation
		viewport.setProfile = function (profile) {

			switch (profile) {

				case 'portraitPhone':

					if (this.showingDocs) {
						this.setActiveItem (this.docsMenu);
					} else {
						this.setActiveItem (this.feedsMenu);
					}

			        if (! this.showingSplash) {
          				this.setActiveItem (this.page);
					}

			        break;

				case 'landscapePhone':
					this.remove (this.docsMenu, false);
					this.remove (this.feedsMenu, false);
					this.setActiveItem (this.page);
					break;

				case 'portraitTablet':
					this.removeDocked (this.docsMenu, false);
					break;

				case 'landscapeTablet':
					this.addDocked (this.docsMenu);
					break;
			}
		};

		// Define work page
		var page = viewport.page = new Ext.Panel ({
			cls: 'page',
			styleHtmlContent: true,
			tpl: '<h2>{title}</h2>{content}',
			scroll: 'vertical'
		});

		// Define outline documents list
		var docsList = viewport.docsList = new Ext.List ({
			store: this.stores.docs,
			itemTpl: '{title}',
			allowDeselect: false,
			singleSelect: true
		});

		// Define action on document selection
		docsList.addListener ('selectionchange', function (model, records) {

			if (records[0]) {
        		viewport.setActiveItem (page, {type: 'slide', direction: 'left'});
				viewport.showingPage = true;
				viewport.showingSplash = false;
				page.update (records[0].data);
				var profile = app.getProfile ();

				if (profile == 'portraitPhone') {
					backButton.show ();
				}

				if (profile == "landscapePhone" || profile == "portraitTablet") {
					docsMenu.hide ();
				}
			}
		});

		// Define outline documents menu
		var docsMenu = viewport.docsMenu = new Ext.Panel ({
			items: [docsList],
			layout: 'fit',
			width: 180,
			dock: 'left'
		});

		// Update documents menu according to device/orientation
		docsMenu.setProfile = function (profile) {

			if (profile == 'landscapePhone' || profile == 'portraitTablet' || (profile == 'portraitPhone' && viewport.showingPage)) {
				this.hide ();

				if (this.rendered) {
					this.el.appendTo (document.body);
				}

				this.setFloating (true);
				this.setSize (180, 220);
			} else {
				this.setFloating (false);

				if (this.rendered) {
					viewport.el.appendChild (this.el);
				}

				if (viewport.showingDocs) {
					this.show ();
				}
			}
		};

		// Define news feeds list
		var feedsList = viewport.feedsList = new Ext.List ({
			store: this.stores.feeds,
			itemTpl: '{title}',
			allowDeselect: false,
			singleSelect: true
		});

		// Define action on feed selection
		feedsList.addListener ('selectionchange', function (model, records) {

			if (records[0]) {
        		viewport.setActiveItem (page, {type: 'slide', direction: 'right'});
				viewport.showingPage = true;
				viewport.showingSplash = false;
				page.update (records[0].data);
				var profile = app.getProfile ();

				switch (profile) {
					case 'portraitPhone':
						backButton.show ();
						break;

					case 'landscapePhone':
					case 'portraitTablet':
						feedsMenu.hide ();
						break;

					case 'landscapeTablet':
alert ('foo');
						docsList.deselect (0);
						break;
				}
			}
		});

		// Define feeds menu
		var feedsMenu = viewport.feedsMenu = new Ext.Panel ({
			items: [feedsList],
			layout: 'fit',
			width: 280,
			dock: 'right'
		});

		// Update feeds menu according to device/orientation
		feedsMenu.setProfile = function (profile) {

			if (profile == 'landscapePhone' || profile == 'portraitTablet' || (profile == 'portraitPhone' && viewport.showingPage)) {
				this.hide ();

				if (this.rendered) {
					this.el.appendTo (document.body);
				}

				this.setFloating (true);
				this.setSize (180, 220);
			} else {
				this.setFloating (false);

				if (this.rendered) {
					viewport.el.appendChild (this.el);
				}

				if (viewport.showingFeeds) {
					this.show ();
				}
			}
		};

		// Define documents list display button
		var docsMenuButton = viewport.docsMenuButton = new Ext.Button ({
			text: 'Docs',
			ui: 'back'
		});

		// Update documents list display button according to device/orientation
		docsMenuButton.setProfile = function (profile) {

			switch (profile) {

				case 'portraitPhone':
					this.removeCls("x-button-normal");
					this.addCls("x-button-back");

					if (viewport.showingDocs) {
						this.hide ();
					} else {
						this.show ();
					}

					break;
				case 'landscapePhone':
				case 'portraitTablet':
					this.removeCls("x-button-back");
					this.addCls("x-button-normal");
					this.show ();
					break;

				case 'landscapeTablet':
					this.hide ();
					break;
			}
		};

		// Define documents button action
		docsMenuButton.addListener ('tap', function () {

			if (Ext.is.Phone && Ext.orientation == 'portrait') {
				viewport.setActiveItem (docsMenu, {type: 'slide', direction: 'right'});
				viewport.showingPage = false;
				viewport.showingDocs = true;
				viewport.showingFeeds = false;
				this.hide ();
				viewport.feedsMenuButton.show ();
			} else {
				docsMenu.showBy (this);
			}
		});

		// Define feeds list display button
		var feedsMenuButton = viewport.feedsMenuButton = new Ext.Button ({
			text: 'Feeds',
			ui: 'forward'
		});

		// Update feeds list display button according to device/orientation
		feedsMenuButton.setProfile = function (profile) {

			switch (profile) {

				case 'portraitPhone':
					this.removeCls("x-button-normal");
					this.addCls("x-button-forward");

					if (viewport.showingFeeds) {
						this.hide ();
					} else {
						this.show ();
					}

					break;

				case 'landscapePhone':
				case 'portraitTablet':
					this.removeCls("x-button-forward");
					this.addCls("x-button-normal");
					this.show ();
					break;

				case 'landscapeTablet':
					this.hide ();
					break;
			}
		};

		// Define feeds button action
		feedsMenuButton.addListener ('tap', function () {

			if (Ext.is.Phone && Ext.orientation == 'portrait') {
				viewport.setActiveItem (feedsMenu, {type: 'slide', direction: 'left'});
				viewport.showingPage = false;
				viewport.showingFeeds = true;
				viewport.showingDocs = false;
				this.hide ();
				viewport.docsMenuButton.show ();
			} else {
				feedsMenu.showBy (this);
			}
		});

		// Define back button
		var backButton = viewport.backButton = new Ext.Button ({
			ui: 'back',
			text: 'Back'
		});

		// Update back button according to device/orientation
		backButton.setProfile = function (profile) {

			switch (profile) {
				case 'portraitPhone':

					if (viewport.showingPage) {
						this.show ();
					} else {
						this.hide ();
					}

					break;

				case 'landscapePhone':
				case 'portraitTablet':
				case 'landscapeTablet':
					this.hide ();
					break;
			}
		};

		// Define back button action
		backButton.addListener ('tap', function () {
			viewport.setActiveItem (docsMenu, {type: 'slide', direction: 'right'});
			viewport.showingPage = false;
			this.hide ();
		});

		// Define main toolbar
		var toolbar = this.toolbar = new Ext.Toolbar ({
			ui: 'light',
			title: 'iJot/touch',
			items: [backButton, docsMenuButton, {xtype: 'spacer'}, feedsMenuButton]
		});

		// Ready UI
		viewport.addDocked (toolbar);
		viewport.setActiveItem (page);
		page.update ('<h2>Splash Screen</h2>');
	}
});