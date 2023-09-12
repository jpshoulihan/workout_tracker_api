// Use DBML to define your database structure
// Docs: https://dbml.dbdiagram.io/docs

Table users {
  id uuid [primary key]
  username varchar
  email varchar
  first_name varchar
  last_name varchar
  password varchar
  dob datetime
  age integer
  height integer
  weight integer
  avatar varchar
  created_at timestamp
}

Table base_excercise {
  id uuid [primary key]
  body_split enum
  action enum
  equipment varchar
  exercise_name varchar
  instruction varchar
  category varchar 
}

Table workouts {
  id uuid [primary key]
  work_name varchar
  user_id uuid
  created_at timestamp
}

Table workout_exercises {
  id uuid [primary key]
  workout_id uuid
  exercise_id uuid
  order integer
}

Ref: base_exercise.user_id > users.id // many-to-one

Ref: workout_exercises.exercise_id < exercises.id

Ref: Ref: workout_exercises.workout_id < workouts.id
