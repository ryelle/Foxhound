export const data = {
	posts: {
		items: {
			1: {
				id: 1,
				type: 'post',
				title: {
					rendered: 'WordPress Query Component Tests'
				},
				excerpt: {
					rendered: 'excerpt',
					protected: false
				},
				link: 'https://wpapi.local/2016/10/wordpress-query-component-tests',
			},
			2: {
				id: 2,
				type: 'post',
				title: {
					rendered: 'Another Test Post'
				},
				excerpt: {
					rendered: 'excerpt',
					protected: false
				},
				link: 'https://wpapi.local/2016/11/another-test-post',
			}
		},
		totalPages: {
			'{"sticky":false,"page":1}': '2',
		},
		queryRequests: {
			'{"sticky":false,"page":1}': false,
		},
		queries: {
			'{"sticky":false,"page":1}': [ 1, 2 ],
		}
	}
}
