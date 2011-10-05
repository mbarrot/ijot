/*
	iJot vs 3.0
	created by Marc Barrot
	(c) 2005-2011 Network Composers LLC

	Data model
	Last modified 9/19/2011 by MB

	This code relies on Sensa Touch vs 1.1.0
*/

ijot.stores.docs = new Ext.data.Store ({

    model: Ext.regModel ('', {
        fields: [
            {name:'id', type:'int'},
            {name:'title', type:'string'},
            {name:'content', type:'string'}
        ]
    }),

    data: [
        {id: 1, title: 'Create New', content: "<p>New Outline</p>"},
        {id: 2, title: 'Document 1', content: "<p>Lorem ipsum</p>"},
        {id: 3, title: 'Document 2', content: "<p>Lorem ipsum</p>"},
        {id: 4, title: 'Document 3', content: "<p>Lorem ipsum</p>"}
    ]

});

ijot.stores.feeds = new Ext.data.Store ({

    model: Ext.regModel ('', {
        fields: [
            {name:'id', type:'int'},
            {name:'title', type:'string'},
            {name:'url', type:'string'},
            {name:'content', type:'string'}
        ]
    }),

    data: [
        {id: 1, title: 'feed 1', url: 'http://scripting.com/rss.xml', content: "<p>Scripting News</p>"},
        {id: 2, title: 'feed 2', url: 'http://scripting.com/rss.xml', content: "<p>Scripting News</p>"},
        {id: 3, title: 'feed 3', url: 'http://scripting.com/rss.xml', content: "<p>Scripting News</p>"},
        {id: 4, title: 'feed 4', url: 'http://scripting.com/rss.xml', content: "<p>Scripting News</p>"}
    ]

});
