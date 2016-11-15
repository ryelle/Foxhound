<?php
/**
 * Pre-load the first page's query response as a JSON object
 * Skips the need for an API query on the initial load of a page
 *
 * @package Foxhound
 */

/**
 * Class wrapper for data loading
 */
class Foxhound_LoadData {
	/**
	 * Set up actions
	 */
	public function __construct() {
		add_action( 'pre_get_posts', array( $this, 'unstick_stickies' ) );
		add_filter( 'script_loader_tag', array( $this, 'print_data' ), 10, 2 );
	}

	/**
	 * Unstick sticky posts to mirror the behavior of the REST API
	 *
	 * @param WP_Query $query The WP_Query object.
	 */
	public function unstick_stickies( $query ) {
		$query->set( 'ignore_sticky_posts', true );
		$query->set( 'posts_per_page', 10 );
	}

	/**
	 * Adds the json-string data to the react app script
	 */
	public function print_data( $tag, $handle ) {
		if ( FOXHOUND_APP === $handle ) {
			printf(
				'<script type="text/javascript">var FoxhoundData = %s;</script>',
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
			'data' => $this->get_post_data(),
			'paging' => $this->get_total_pages(),
		) );
	}

	/**
	 * Gets current posts data from the JSON API server
	 *
	 * @return array
	 */
	public function get_post_data() {
		if ( ! ( ( is_home() && ! is_paged() ) || is_page() || is_singular() ) ) {
			return array();
		}

		$posts = $GLOBALS['wp_query']->posts;

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
	 * @return int
	 */
	public function get_total_pages() {
		if ( is_404() ) {
			return 0;
		}

		return intval( $GLOBALS['wp_query']->max_num_pages );
	}
}
new Foxhound_LoadData();
