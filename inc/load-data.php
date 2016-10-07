<?php
/**
 * Pre-load the first page's query response as a JSON object
 * Skips the need for an API query on the initial load of a page
 */

class Foxhound_LoadData {

	public function __construct() {
		add_action( 'wp_enqueue_scripts', array( $this, 'dump_query' ), 25 );
		add_action( 'pre_get_posts', array( $this, 'unstick_stickies' ) );
	}

	/**
	 * Unstick sticky posts to mirror the behavior of the REST API
	 */
	public function unstick_stickies( $query ) {
		$query->set( 'ignore_sticky_posts', true );
		$query->set( 'posts_per_page', 10 );
	}

	/**
	 * Dumps the current query response as a JSON Object on the react script
	 */
	public function dump_query() {
		wp_localize_script( FOXHOUND_APP, 'FoxhoundData', array(
			'data' => $this->get_post_data(),
			'paging' => $this->get_total_pages(),
		) );
	}

	/**
	 * Gets current posts data from the JSON API server
	 *
	 * @param null $posts
	 *
	 * @return array
	 */
	public function get_post_data( $posts = null ) {
		if ( ! is_home() ) {
			return array();
		}

		if ( $posts === null ) {
			$posts = $GLOBALS['wp_query']->posts;
		}

		global $wp_rest_server;

		if ( empty( $wp_rest_server ) ) {
			$wp_rest_server_class = apply_filters( 'wp_rest_server_class', 'WP_REST_Server' );
			$wp_rest_server       = new $wp_rest_server_class;
			do_action( 'rest_api_init' );
		}

		$data               = array();
		$request            = new \WP_REST_Request();
		$request['context'] = 'view';

		foreach ( (array) $posts as $post ) {
			$controller = new \WP_REST_Posts_Controller( $post->post_type );
			$data[]     = $wp_rest_server->response_to_data( $controller->prepare_item_for_response( $post, $request ), true );
		}

		return $data;
	}

	/**
	 * Gets current posts data from the JSON API server
	 *
	 * @param null $posts
	 *
	 * @return array
	 */
	public function get_total_pages() {
		if ( is_404() ) {
			return 0;
		}

		return intval( $GLOBALS['wp_query']->max_num_pages );
	}
}
new Foxhound_LoadData();
