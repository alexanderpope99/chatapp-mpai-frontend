export const DefaultSettings = [
    {
        'id': 1,
        'title': 'Appearance',
        'description': 'Customize the look and feel',
        'settings': [
            { id: 1, type: 'switch', value: false, title: 'Dark Mode', description: 'Apply a theme with dark colors' },
        ]
    },

    {
        'id': 2,
        'title': 'Notifications',
        'description': 'Customize notifications',
        'settings': [
            { id: 1, type: 'switch', value: true, title: 'Allow Notifications', description: 'Receive Notifications.' },
        ],
    }
];
