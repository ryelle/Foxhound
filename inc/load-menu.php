<?php
/**
 * Pre-load the navigation menu as a JSON object
 *
 * @package Foxhound
 */

/**
 * Class wrapper for menu loading
 */
class Foxhound_LoadMenu {
	/**
	 * Set up actions
	 */
	public function __construct() {
		add_filter( 'script_loader_tag', array( $this, 'print_data' ), 10, 2 );
	}

	/**
	 * Adds the json-string data to the react app script
	 */
	public function print_data( $tag, $handle ) {
		if ( FOXHOUND_APP === $handle ) {
			printf(
				'<script type="text/javascript">var FoxhoundMenu = %s;</script>',
				$this->add_json_data()
			);
			return $tag;
		}
		return $tag;
	}

	/**
	 * Dumps the current query response as a JSON-encoded string
	 */
	public function add_json_data() {
		return wp_json_encode( array(
			'enabled' => class_exists( 'WP_REST_Menus' ),
			'data' => $this->get_menu_data(),
		) );
	}

	/**
	 * Gets menu data from the JSON API server
	 *
	 * @return array
	 */
	public function get_menu_data() {
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
