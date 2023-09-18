import { ChildEntity } from "typeorm";
import { BaseExercise } from "./BaseExercise";

@ChildEntity('stock_exercise')
export class Exercise extends BaseExercise {
}