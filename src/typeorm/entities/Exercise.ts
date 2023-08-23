import { ChildEntity } from "typeorm";
import { BaseExercise } from "./BaseExercise";

@ChildEntity()
export class Exercise extends BaseExercise {
}