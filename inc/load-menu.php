<?php 
/**
 * Pre-load the navigation menu as a JSON object
 */

class Foxhound_LoadMenu {

	public function __construct() {
		add_action( 'wp_enqueue_scripts', array( $this, 'add_json_data' ), 25 );
	}

	/**
	 * Dumps the global posts as JSON for first load render
	 */
	public function add_json_data() {
		wp_localize_script( FOXHOUND_APP, 'FoxhoundMenu', array(
			'data' => $this->get_menu_data()
		) );
	}

	/**
	 * Gets global posts data from the JSON API server
	 *
	 * @param null $posts
	 *
	 * @return array
	 */
	public function get_menu_data( $posts = null ) {
		$menu = array();
		
		$request = new \WP_REST_Request();
		$request['context'] = 'view';
		$request['location'] = 'primary';

		if ( class_exists( 'WP_REST_Menus' ) ) {
			$menu_api = new WP_REST_Menus();
			$menu = $menu_api->get_menu_location( $request );
		}

		return $menu;
	}
}
new Foxhound_LoadMenu();
