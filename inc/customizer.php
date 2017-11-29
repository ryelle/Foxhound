<?php
/**
 * Foxhound Theme Customizer.
 *
 * @package Foxhound
 */

/**
 * Register customizer settings.
 *
 * @param WP_Customize_Manager $wp_customize Customize manager.
 */
function foxhound_customize_register( WP_Customize_Manager $wp_customize ) {
	$wp_customize->get_setting( 'blogname' )->transport = 'postMessage';

	add_filter( 'wp_get_nav_menu_items', '_foxhound_filter_wp_api_nav_menu_items_workaround', 20 );
}
add_action( 'customize_register', 'foxhound_customize_register' );

/**
 * Workaround issue in WP API Menus plugin to force nav menu item classes to be arrays instead of strings.
 *
 * @see \WP_REST_Menus::get_menu_location()
 *
 * @param array $items Nav menu items.
 * @return array Items.
 */
function _foxhound_filter_wp_api_nav_menu_items_workaround( $items ) {
	foreach ( $items as &$item ) {
		if ( is_string( $item->classes ) ) {
			$item->classes = explode( ' ', $item->classes );
		}
	}
	return $items;
}

/**
 * Prevent Customize Posts plugin from forcing preview URLs for post links since frontend router doesn't understand them.
 *
 * Note that this means that posts and pages cannot be added in the Customizer at the moment with Foxhound.
 *
 * @todo Update React Router integration to be able to properly route URLs like /?preview=true&page_id=123.
 *
 * @see WP_Customize_Posts::post_link_draft()
 * @see WP_Customize_Posts::__construct()
 * @param WP_Customize_Manager $wp_customize Customize manager.
 */
function _foxhound_disable_customize_post_link_draft( $wp_customize ) {
	if ( isset( $wp_customize->posts ) ) {
		remove_filter( 'post_link', array( $wp_customize->posts, 'post_link_draft' ) );
		remove_filter( 'post_type_link', array( $wp_customize->posts, 'post_link_draft' ) );
		remove_filter( 'page_link', array( $wp_customize->posts, 'post_link_draft' ) );
	}
}
add_action( 'customize_register', '_foxhound_disable_customize_post_link_draft' );
