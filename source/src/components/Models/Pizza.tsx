import Modifier from "./Modifier";

export default interface Pizza {
    name: string;
    ingredients: string[];
    modifiers?: Modifier[];
};
