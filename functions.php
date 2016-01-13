<?php
/**
 * Foxhound functions and definitions.
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package Foxhound
 */

if ( ! defined( 'FOXHOUND_VERSION' ) ) {
	define( 'FOXHOUND_VERSION', time() );
}

if ( ! function_exists( 'foxhound_setup' ) ) :
/**
 * Sets up theme defaults and registers support for various WordPress features.
 *
 * Note that this function is hooked into the after_setup_theme hook, which
 * runs before the init hook. The init hook is too late for some features, such
 * as indicating support for post thumbnails.
 */
function foxhound_setup() {
	/*
	 * Make theme available for translation.
	 * Translations can be filed in the /languages/ directory.
	 * If you're building a theme based on Foxhound, use a find and replace
	 * to change 'foxhound' to the name of your theme in all the template files.
	 */
	load_theme_textdomain( 'foxhound', get_template_directory() . '/languages' );

	// Add default posts and comments RSS feed links to head.
	add_theme_support( 'automatic-feed-links' );

	/*
	 * Let WordPress manage the document title.
	 * By adding theme support, we declare that this theme does not use a
	 * hard-coded <title> tag in the document head, and expect WordPress to
	 * provide it for us.
	 */
	add_theme_support( 'title-tag' );

	/*
	 * Enable support for Post Thumbnails on posts and pages.
	 *
	 * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
	 */
	add_theme_support( 'post-thumbnails' );

	// This theme uses wp_nav_menu() in one location.
	register_nav_menus( array(
		'primary' => esc_html__( 'Primary Menu', 'foxhound' ),
	) );

	/*
	 * Switch default core markup for search form, comment form, and comments
	 * to output valid HTML5.
	 */
	add_theme_support( 'html5', array(
		'search-form',
		'comment-form',
		'comment-list',
		'gallery',
		'caption',
	) );

	add_post_type_support( 'post', 'comments' );
	add_post_type_support( 'page', 'comments' );
}
endif; // foxhound_setup
add_action( 'after_setup_theme', 'foxhound_setup' );

/**
 * Register widget area.
 *
 * @link http://codex.wordpress.org/Function_Reference/register_sidebar
 */
function foxhound_widgets_init() {
	register_sidebar( array(
		'name'          => __( 'Sidebar', 'foxhound' ),
		'id'            => 'sidebar-1',
		'description'   => '',
		'before_widget' => '<aside id="%1$s" class="widget %2$s">',
		'after_widget'  => '</aside>',
		'before_title'  => '<h3 class="widget-title">',
		'after_title'   => '</h3>',
	) );
}
add_action( 'widgets_init', 'foxhound_widgets_init' );

/**
 * Set the content width in pixels, based on the theme's design and stylesheet.
 *
 * Priority 0 to make it available to lower priority callbacks.
 *
 * @global int $content_width
 */
function foxhound_content_width() {
	$GLOBALS['content_width'] = apply_filters( 'foxhound_content_width', 730 );
}
add_action( 'after_setup_theme', 'foxhound_content_width', 0 );

/**
 * Enqueue scripts and styles.
 */
function foxhound_scripts() {
	wp_enqueue_style( 'foxhound-style', get_stylesheet_uri() );
	wp_enqueue_script( 'foxhound-react', get_template_directory_uri() . '/js/app.js', array( 'jquery' ), FOXHOUND_VERSION, true );

	$url = home_url();
	$path = trailingslashit( parse_url( $url, PHP_URL_PATH ) );

	wp_localize_script( 'foxhound-react', 'FoxhoundSettings', array(
		'nonce' => wp_create_nonce( 'wp_rest' ),
		'user' => get_current_user_id(),
		'title' => get_bloginfo( 'name', 'display' ),
		'URL' => array(
			'root' => esc_url_raw( get_rest_url( null, '/wp/v2' ) ),
			'menuRoot' => esc_url_raw( get_rest_url( null, '/wp-api-menus/v2' ) ),
			'base' => esc_url_raw( home_url() ),
			'basePath' => $path,
		),
	) );
}
add_action( 'wp_enqueue_scripts', 'foxhound_scripts' );

/**
 * Returns the Google font stylesheet URL, if available.
 *
 * The use of Source Serif Pro and Source Code Pro by default is
 * localized. For languages that use characters not supported by
 * either font, the font can be disabled.
 *
 * @return string Font stylesheet or empty string if disabled.
 */
function foxhound_fonts_url() {
	$fonts_url = '';

	/* Translators: If there are characters in your language that are not
	 * supported by Alegreya, translate this to 'off'. Do not translate
	 * into your own language.
	 */
	$alegreya = _x( 'on', 'Alegreya font: on or off', 'foxhound' );

	/* Translators: If there are characters in your language that are not
	 * supported by Alegreya Sans, translate this to 'off'. Do not translate into
	 * your own language.
	 */
	$alegreya_sans = _x( 'on', 'Alegreya Sans font: on or off', 'foxhound' );

	/* Translators: If there are characters in your language that are not
	 * supported by Alegreya SC, translate this to 'off'. Do not translate into
	 * your own language.
	 */
	$alegreya_sc = _x( 'on', 'Alegreya SC (smallcaps) font: on or off', 'foxhound' );

	if ( 'off' !== $alegreya || 'off' !== $alegreya_sans || 'off' !== $alegreya_sc ) {
		$font_families = array();

		if ( 'off' !== $alegreya )
			$font_families[] = urlencode( 'Alegreya:400,400italic,700,700italic,900italic' );

		if ( 'off' !== $alegreya_sans )
			$font_families[] = urlencode( 'Alegreya Sans:700' );

		if ( 'off' !== $alegreya_sc )
			$font_families[] = urlencode( 'Alegreya SC:700' );

		$protocol = is_ssl() ? 'https' : 'http';
		$query_args = array(
			'family' => implode( '|', $font_families ),
			'subset' => urlencode( 'latin,latin-ext' ),
		);
		$fonts_url = add_query_arg( $query_args, "$protocol://fonts.googleapis.com/css" );
	}

	return $fonts_url;
}

/**
 * Loads our special font CSS file.
 *
 * To disable in a child theme, use wp_dequeue_style()
 * function mytheme_dequeue_fonts() {
 *     wp_dequeue_style( 'foxhound-fonts' );
 * }
 * add_action( 'wp_enqueue_scripts', 'mytheme_dequeue_fonts', 11 );
 *
 * @return void
 */
function foxhound_fonts() {
	$fonts_url = foxhound_fonts_url();
	if ( ! empty( $fonts_url ) ){
		wp_enqueue_style( 'foxhound-fonts', esc_url_raw( $fonts_url ), array(), null );
	}
}
add_action( 'wp_enqueue_scripts', 'foxhound_fonts' );
