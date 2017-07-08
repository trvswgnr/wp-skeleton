<?php /* Functions and Definitions */

if ( ! function_exists( 'setup' ) ) :
// Set up theme defaults and registers support for various WordPress features.
  function setup() {

    add_theme_support( 'title-tag' );

    add_theme_support( 'post-thumbnails' );

    // Navigation Menu
    register_nav_menus( array(
      'menu' => esc_html__( 'Primary', 'main' ),
    ) );

    // Switch default core markup for search form, comment form, and comments to output valid HTML5.
    add_theme_support( 'html5', array(
      'search-form',
      'comment-form',
      'comment-list',
      'gallery',
      'caption',
    ) );

  }
endif;

  add_action( 'after_setup_theme', 'setup' );

// Enqueue scripts and styles.
function styles_scripts() {
  wp_enqueue_style( 'main_style', get_template_directory_uri().'/dist/css/main.min.css' );

  if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
      wp_enqueue_script( 'comment-reply' );
  }
}
add_action( 'wp_enqueue_scripts', 'styles_scripts' );

flush_rewrite_rules();

