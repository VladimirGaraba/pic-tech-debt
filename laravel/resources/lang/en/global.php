<?php
/**
 * global.php
 *
 * @package default
 */


return [

     'user-management' => [
          'title' => 'User Management',
          'created_at' => 'Time',
          'fields' => [
          ],
     ],

     'abilities' => [
          'title' => 'Abilities',
          'created_at' => 'Time',
          'fields' => [
               'name' => 'Name',
          ],
     ],

     'roles' => [
          'title' => 'Roles',
          'created_at' => 'Time',
          'fields' => [
               'name' => 'Name',
               'abilities' => 'Abilities',
          ],
     ],

     'users' => [
          'title' => 'Users',
          'profile' => 'Profile',
          'created_at' => 'Time',
          'fields' => [
               'name' => [
                   'title' => 'Name',
               ],
               'email' => [
                   'title' => 'Email',
               ],
               'phone' => [
                   'title' => 'Phone',
               ],
               'job' => [
                   'title' => 'Job Title',
                   'options' => [
                       'spi' => 'SPI',
                       'specialist' => 'Specialist',
                       'admin' => 'Admin',
                   ],
                   'help' => 'This title is for presentation purposes only.'
               ],
               'password' => [
                   'title' => 'Password',
               ],
               'site' => [
                   'title' => 'Site',
               ],
               'roles' => [
                   'title' => 'Roles',
               ],
               'remember-token' => [
                   'title' => 'Remember token',
               ],
          ],
          'organisation' => [
               'title' => 'Organisation',
               'name' => 'Name'
          ],
          'settings' => [
               'title' => 'Settings',
               'print-format' => [
                    'name' => 'Print Format',
                    'options' => [
                         'standard' => 'Standard',
                         'medical' => 'Medical'
                    ]
               ],
               'theme' => [
                   'name' => 'Theme',
                   'options' => [
                       'bootstrap' => 'Default',
                       'ocean' => 'Ocean',
                       'magenta' => 'Magenta',
                       'oreo' => 'Oreo',
                   ]
               ],
          ]
     ],

     'sites' => [
          'title' => 'Sites',
          'site-name' => [
               'name' => 'Site Name'
          ],
          'logo' => [
               'name' => 'Logo',
               'helper' => 'Images will be resized to a maximum width of 300px'
          ],
          'settings' => [
               'title' => 'Settings',
               'tree_title' => 'Site Management',
               'print-format' => [
                    'name' => 'Print Format',
                    'options' => [
                         'standard' => 'Standard',
                         'medical' => 'Medical',
                         'user-selectable' => 'User Selectable'
                    ]
               ]
          ],
          'fields' => [
               'idtblSite' => [
                    'title' => 'ID',
                    'helper' => '',
               ],
               'SiteName' => [
                    'title' => 'Site Name',
                    'helper' => '',
               ],
               'Shortcode' => [
                    'title' => 'Shortcode',
                    'helper' => '',
               ],
               'tblOrganisation_idtblOrganisation' => [
                    'title' => 'Location (State, Country)',
                    'helper' => '',
               ],
               'tblOrganisation_OrganisationState' => [
                   'title' => 'State',
                   'helper' => '',
               ],
               'tblISOtoCountry_ISOAlpha2' => [
                    'title' => 'Country',
                    'helper' => '',
               ],
               'SiteDefaultTimeZone' => [
                    'title' => 'Default Timezone',
                    'helper' => '',
               ],
          ],
          'actions' => [
               'index' => [
                    'title' => 'Sites'
               ],
               'create' => [
                    'title' => 'Add New Site'
               ],
               'store' => [
                    'title' => 'Create Site'
               ],
               'show' => [
                    'title' => 'View Site'
               ],
               'edit' => [
                    'title' => 'Edit Site'
               ],
               'update' => [
                    'title' => 'Update Site'
               ],
               'destroy' => [
                    'title' => 'Delete Site'
               ],
          ]
     ],

     'organisation' => [
          'fields' => [
               'idtblOrganisation' => [
                    'title' => 'ID',
                    'helper' => '',
               ],
               'tblISOtoCountry_ISOAlpha2' => [
                    'title' => 'Country',
                    'helper' => '',
               ],
               'OrganisationName' => [
                    'title' => 'Organisation Name',
                    'helper' => '',
               ],
               'OrganisationState' => [
                    'title' => 'State',
                    'helper' => '',
               ],
               'OrganisationStreet' => [
                    'title' => 'Street Line 1',
                    'helper' => '',
               ],
               'OrganisationStreet2' => [
                    'title' => 'Street Line 2',
                    'helper' => '',
               ],
               'OrganisationSuburb' => [
                    'title' => 'Suburb',
                    'helper' => '',
               ],
               'OrganisationPostcode' => [
                    'title' => 'Postcode',
                    'helper' => '',
               ],
               'OrganisationLatitude' => [
                    'title' => 'Latitude',
                    'helper' => '',
               ],
               'OrganisationLongitude' => [
                    'title' => 'Longitude',
                    'helper' => '',
               ],
          ],
     ],

     'addresses' => [
          'street' => 'Street',
          'suburb' => 'Suburb',
          'postcode' => 'Postcode',
          'state' => 'State',
          'country' => 'Country'
     ],

     'app_spa' => 'Application',
     'app_create' => 'Create',
     'app_save' => 'Save',
     'app_edit' => 'Edit',
     'app_edit_profile' => 'Edit Profile',
     'app_edit_site' => 'Edit My Site',
     'app_view' => 'View',
     'app_update' => 'Update',
     'app_list' => 'List',
     'app_no_entries_in_table' => 'No entries in table',
     'custom_controller_index' => 'Custom controller index.',
     'app_logout' => 'Logout',
     'app_add_new' => 'Add new',
     'app_are_you_sure' => 'Are you sure?',
     'app_back_to_list' => 'Back to list',
     'app_dashboard' => 'Dashboard',
     'app_analytics' => 'Analytics',
     'app_reports' => 'Reports',
     'app_delete' => 'Delete',
     'global_title' => 'Poisons Information Centre',
     'app_back_to_app' => 'Back to app',
     'app_toggle_navigation' => 'Toggle Navigation',
     'app_actions' => 'Actions',

     'messages' => [
          'none' => '&lt;none&gt;',
          'unspecified' => '&lt;unspecified&gt;',
          'unknown' => '&lt;unknown&gt;',
          'blank' => '&lt;blank&gt;'
     ]
];
