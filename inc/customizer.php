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
}
add_action( 'customize_register', 'foxhound_customize_register' );
