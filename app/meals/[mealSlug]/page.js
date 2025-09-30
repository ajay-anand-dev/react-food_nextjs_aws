import { getMeal } from '@/lib/meals';
import classes from './page.module.css';
import Image from 'next/image';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }) {
  const meal = getMeal(params.mealSlug)

  if (!meal) {
    notFound();
  }
  
  return { title: meal.title, description: meal.summary }
}

export default function MealDetailsPage({ params }) {
  // [mealSlug] folder name is a slug(params)
  const meal = getMeal(params.mealSlug);

  if (!meal) {
    // closest not-found page we are showing, we can place the notFound page and the closest to the root directory will be shown
    // notFound page of meal folder is showing if not then it will look for somewhere else
    notFound();
  }

  meal.instructions = meal.instructions.replace(/\n/g, '<br />')

  return (
    <>
      <header className={classes.header}>
        <div className={classes.image}>
          <Image src={meal.image} alt={meal.title} fill />
        </div>
        <div className={classes.headerText}>
          <h1>{meal.title}</h1>
          <p className={classes.creator}>
            by <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a>
          </p>
          <p className={classes.summary}>{meal.summary}</p>
        </div>
      </header>
      <main>
        {/* <p className={classes.instructions} dangerouslySetInnerHTML={{ __html: '...' }}> */}
        {/* this will be used to print hard coded html element to the frontend  */}
        <p className={classes.instructions} dangerouslySetInnerHTML={{ __html: meal.instructions }} />
      </main>
    </>
  )
}
