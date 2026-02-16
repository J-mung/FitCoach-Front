import { create } from "tailwind-rn";

const styles = require("../../../styles.json");

const { tailwind, getColor } = create(styles);

export { tailwind, getColor };
