<?php 
/**
 * Set our custom prefixes for date archives
 */

class Foxhound_SetPermalinks {
	public function __construct() {
		add_action( 'admin_notices', array( $this, 'admin_permalinks_warning' ) );
		add_action( 'init', array( $this, 'change_date' ) );
		add_action( 'init', array( $this, 'change_paged' ) );
		add_action( 'init', array( $this, 'change_page' ) );
	}

	public function admin_permalinks_warning() {
		global $current_screen;
		if ( 'options-permalink' !== $current_screen->id ) {
			return;
		}
		?>
		<div class="notice notice-warning">
			<p><?php _e( '<b>Warning:</b> The theme you\'re using does not support customized permalinks.', 'foxhound' ); ?></p>
		</div>
		<?php
	}

	public function change_date() {
		global $wp_rewrite;
		$wp_rewrite->date_structure = '/date/%year%/%monthnum%/%day%';
	}

	public function change_paged() {
		global $wp_rewrite;
		$wp_rewrite->pagination_base = 'p';
	}

	public function change_page() {
		global $wp_rewrite;
		$wp_rewrite->page_structure = '/page/%pagename%';
	}
}
new Foxhound_SetPermalinks();
