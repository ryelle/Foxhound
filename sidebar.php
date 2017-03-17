<?php
/**
 * The sidebar containing the main widget area.
 *
 * @package Foxhound
 */

if ( ! is_active_sidebar( 'sidebar-1' ) ) {
	return;
}
?>

<div id="secondary" class="widget-area sidebar-widgets" role="complementary">
	<h2 class="screen-reader-text"><?php _e( 'Sidebar', 'foxhound' ); ?></h2>
	<?php dynamic_sidebar( 'sidebar-1' ); ?>
</div><!-- #secondary -->
