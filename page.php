<?php /* Default Page Template */ ?>
<?php get_header(); ?>
<div id="primary">
  <?php if (have_posts()) : while (have_posts()) : the_post(); ?>
    <div <?php post_class(); ?> id="post-<?php the_ID(); ?>">
      <h1><?php the_title(); ?></h1>
      <?php the_content(); ?>
    </div>
  <?php endwhile; ?>
    <div class="post-pagination">
      <div class="post-pagination__next-posts"><?php next_posts_link(); ?></div>
      <div class="post-pagination__prev-posts"><?php previous_posts_link(); ?></div>
    </div>
  <?php else : ?>
    <div <?php post_class(); ?> id="post-<?php the_ID(); ?>">
      <h1>Not Found</h1>
    </div>
  <?php endif; ?>
</div>
<?php get_footer(); ?>
