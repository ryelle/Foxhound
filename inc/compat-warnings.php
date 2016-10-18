<?php
/**
 * Foxhound compatbility warnings
 *
 * Prevents Foxhound from running on WordPress versions without the REST API,
 * since this theme requires API functionality. If this file is loaded,
 * we know we have an incompatible WordPress.
 *
 * @package Foxhound
 */

/**
 * Prevent switching to Foxhound on old versions of WordPress.
 *
 * Switches to the default theme.
 */
function foxhound_switch_theme() {
	switch_theme( WP_DEFAULT_THEME );
	unset( $_GET['activated'] );
	add_action( 'admin_notices', 'foxhound_upgrade_notice' );
}
add_action( 'after_switch_theme', 'foxhound_switch_theme' );

/**
 * Adds a message for unsuccessful theme switch.
 *
 * Prints an update nag after an unsuccessful attempt to switch to
 * Foxhound on WordPress versions prior to 4.7.
 *
 * @global string $wp_version WordPress version.
 */
function foxhound_upgrade_notice() {
	$message = __( 'Foxhound requires the REST API plugin. Please install the plugin and try again.', 'foxhound' );
	printf( '<div class="error"><p>%s</p></div>', $message ); /* WPCS: xss ok. */
}

/**
 * Prevents the Customizer from being loaded on WordPress versions prior to 4.7.
 *
 * @since Foxhound 1.0
 *
 * @global string $wp_version WordPress version.
 */
function foxhound_customize() {
	wp_die( __( 'Foxhound requires the REST API plugin. Please install the plugin and try again.', 'foxhound' ), '', array(
		'back_link' => true,
	) );
}
add_action( 'load-customize.php', 'foxhound_customize' );

/**
 * Prevents the Theme Preview from being loaded on WordPress versions prior to 4.7.
 *
 * @since Foxhound 1.0
 *
 * @global string $wp_version WordPress version.
 */
function foxhound_preview() {
	if ( isset( $_GET['preview'] ) ) {
		wp_die( __( 'Foxhound requires the REST API plugin. Please install the plugin and try again.', 'foxhound' ) );
	}
}
add_action( 'template_redirect', 'foxhound_preview' );
