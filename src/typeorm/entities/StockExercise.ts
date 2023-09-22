import { ChildEntity } from "typeorm";
import { Exercise } from "./Exercise";

@ChildEntity('stock_exercise')
export class StockExercise extends Exercise {
}