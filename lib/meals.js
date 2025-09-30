import fs from 'node:fs';
import sql from 'better-sqlite3';
import slugify from 'slugify';
import xss from 'xss';

const db = sql('meals.db');

// better-sqlite3 not uses async, await we are doing by ourself

export async function getMeals() {
    await new Promise((resolve) => setTimeout(resolve, 5000));
    // throw new Error('db meals issue')
    return db.prepare('SELECT * FROM meals').all();

    // all for fetching
    // run for inserting
    // get for single row 
}

export function getMeal(slug) {
    return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug);
    // add dynamic values like this it will protect you from SQL injection
}

export async function saveMeal(meal) {
    meal.slug = slugify(meal.title, { lower: true });
    meal.instructions = xss(meal.instructions);

    const extension = meal.image.name.split('.').pop();
    const fileName = `${meal.slug}-${Math.floor(Math.random() * 10) + 1}.${extension}`

    const stream = fs.createWriteStream(`public/images/${fileName}`)
    const bufferedImage = await meal.image.arrayBuffer();

    stream.write(Buffer.from(bufferedImage), (error) => {
        if (error) {
            throw new Error('Saving image failed!')
        }
    });

    meal.image = `/images/${fileName}`

    // look for initdb file for INSERT query 
    db.prepare(`
        INSERT INTO meals
            (title, summary, instructions, creator, creator_email, image, slug)
        VALUES (
            @title,
            @summary,
            @instructions,
            @creator,
            @creator_email,
            @image,
            @slug
        )
    `).run(meal)
}