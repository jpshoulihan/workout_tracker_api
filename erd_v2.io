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

Table exercises {
  id uuid [primary key]
  user_id uuid
  body_split enum
  action enum
  equipment varchar
  exercise_name varchar
  instruction varchar
  category varchar 
}

Table workouts {
  id uuid [primary key]
  user_id uuid
  workout_name varchar
  created_at timestamp
}

Table workout_exercises {
  id uuid [primary key]
  workout_id uuid
  exercise_id uuid
}

Table calendar_entries {
  id uuid [primary key]
  workout_id uuid
  user_id uuid
  date datetime
}

Table exercise_statistics {
    id uuid [primary key]
    calendar_id uuid
    exercise_id uuid
    sets integer
    reps integer
    wieght real
}

Ref: workout_exercises.exercise_id < exercises.id

Ref: workout_exercises.workout_id < workouts.id

Ref: exercises.user_id > users.id

Ref: workouts.user_id > users.id

Ref: calendar_entries.workout_id > workout_exercises.id

Ref: calendar_entries.user_id > users.id

Ref: exercise_statistics.calendar_id > calendar_entries.id

Ref: exercise_statistics.exercise_id > exercises.id